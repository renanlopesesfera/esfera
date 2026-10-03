import { randomInt } from 'node:crypto'

// utils
import { MAX_ATTACHMENT_MB, RELACOES, RETORNOS, TEMAS, type Retorno } from '@/utils/ethics'

// Canal de Denúncia
// Receives a report from /etica and forwards it, server to server, to the endpoint
// that stores it for the Comitê de Ética (ETICA_ENDPOINT). Forwarding from here means
// the reporter's browser never talks to the storage provider, so their IP stays out of it.
//
// Anonymity rules for this route (see the spec in the original etica-e-conduta.html):
// - never log the request body, headers or IP
// - only the whitelisted fields below are forwarded; anything else is dropped
// - name and contact are dropped unless the chosen "retorno" needs them

const ENDPOINT = process.env.ETICA_ENDPOINT

const MAX_ATTACHMENT_BYTES = MAX_ATTACHMENT_MB * 1024 * 1024

// extension -> mime type and the magic bytes the decoded file must start with
const ATTACHMENT_TYPES: Record<string, { mime: string, magic: number[] }> = {
	pdf: { mime: 'application/pdf', magic: [0x25, 0x50, 0x44, 0x46] },
	jpg: { mime: 'image/jpeg', magic: [0xff, 0xd8, 0xff] },
	jpeg: { mime: 'image/jpeg', magic: [0xff, 0xd8, 0xff] },
	png: { mime: 'image/png', magic: [0x89, 0x50, 0x4e, 0x47] },
	docx: { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', magic: [0x50, 0x4b] },
	xlsx: { mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', magic: [0x50, 0x4b] }
}

const json = (body: object, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-store'
	}
})

const text = (value: unknown, max = 500): string => {
	if (typeof value !== 'string') return ''
	return value.trim().slice(0, max)
}

const oneOf = (value: unknown, list: string[]): string => {
	return typeof value === 'string' && list.includes(value) ? value : ''
}

// tracking code, unrelated to whoever sent the report (no I, O, 0 or 1 to avoid confusion)
const generateCode = (): string => {
	const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
	let suffix = ''
	for (let i = 0; i < 6; i++) suffix += alphabet[randomInt(alphabet.length)]
	return `ESF-${new Date().getFullYear()}-${suffix}`
}

// drops EXIF/XMP (APP1), IPTC (APP13) and comment segments, where cameras and phones
// store GPS position, device serial numbers and author names
const stripJpegMetadata = (input: Buffer): Buffer => {
	const parts: Buffer[] = [input.subarray(0, 2)]
	let offset = 2

	while (offset + 4 <= input.length) {
		if (input[offset] !== 0xff) return input

		const marker = input[offset + 1]

		// start of scan: the image data follows, copy everything from here
		if (marker === 0xda) {
			parts.push(input.subarray(offset))
			return Buffer.concat(parts)
		}

		const length = input.readUInt16BE(offset + 2)
		const end = offset + 2 + length
		if (end > input.length) return input

		if (marker !== 0xe1 && marker !== 0xed && marker !== 0xfe) {
			parts.push(input.subarray(offset, end))
		}

		offset = end
	}

	return input
}

// drops text, EXIF and timestamp chunks from a PNG
const stripPngMetadata = (input: Buffer): Buffer => {
	const dropped = ['tEXt', 'iTXt', 'zTXt', 'eXIf', 'tIME']
	const parts: Buffer[] = [input.subarray(0, 8)]
	let offset = 8

	while (offset + 12 <= input.length) {
		const length = input.readUInt32BE(offset)
		const type = input.toString('latin1', offset + 4, offset + 8)
		const end = offset + 12 + length
		if (end > input.length) return input

		if (!dropped.includes(type)) parts.push(input.subarray(offset, end))

		offset = end
		if (type === 'IEND') break
	}

	return Buffer.concat(parts)
}

type Attachment = { nome: string, tipo: string, dados: string }

const parseAttachment = (value: unknown): Attachment | null | 'invalid' => {
	if (value === null || value === undefined) return null
	if (typeof value !== 'object') return 'invalid'

	const { nome, dados } = value as Record<string, unknown>
	if (typeof nome !== 'string' || typeof dados !== 'string') return 'invalid'

	const extension = nome.split('.').pop()?.toLowerCase() ?? ''
	const type = ATTACHMENT_TYPES[extension]
	if (!type) return 'invalid'

	let file: Buffer = Buffer.from(dados, 'base64')
	if (file.length === 0 || file.length > MAX_ATTACHMENT_BYTES) return 'invalid'
	if (!type.magic.every((byte, i) => file[i] === byte)) return 'invalid'

	if (type.mime === 'image/jpeg') file = stripJpegMetadata(file)
	if (type.mime === 'image/png') file = stripPngMetadata(file)

	// the original file name can identify the sender, so it is replaced
	return {
		nome: `evidencia.${extension === 'jpeg' ? 'jpg' : extension}`,
		tipo: type.mime,
		dados: file.toString('base64')
	}
}

export async function POST(req: Request) {
	if (!ENDPOINT) {
		console.error('[etica] ETICA_ENDPOINT is not configured')
		return json({ ok: false, erro: 'indisponivel' }, 503)
	}

	let body: Record<string, unknown>

	try {
		body = await req.json()
	} catch {
		return json({ ok: false, erro: 'invalido' }, 400)
	}

	// honeypot: real people never see or fill this field
	if (text(body.website)) {
		return json({ ok: true, codigo: generateCode() })
	}

	const retorno = oneOf(body.retorno, [...RETORNOS]) as Retorno | ''
	const descricao = text(body.descricao, 20000)
	const contato = retorno === 'sem-retorno' ? '' : text(body.contato, 200)

	if (!retorno || !descricao) {
		return json({ ok: false, erro: 'invalido' }, 400)
	}

	if (retorno !== 'sem-retorno' && !contato) {
		return json({ ok: false, erro: 'invalido' }, 400)
	}

	const anexo = parseAttachment(body.anexo)

	if (anexo === 'invalid') {
		return json({ ok: false, erro: 'anexo' }, 400)
	}

	const codigo = generateCode()

	const relato = {
		codigo,
		retorno,
		nome: retorno === 'identificado' ? text(body.nome, 200) : '',
		contato,
		relacao: oneOf(body.relacao, RELACOES),
		tema: oneOf(body.tema, TEMAS),
		descricao,
		quando: text(body.quando),
		envolvidos: text(body.envolvidos),
		testemunhas: text(body.testemunhas),
		jaRelatou: text(body.jaRelatou),
		enviadoEm: new Date().toISOString(),
		anexo
	}

	try {
		// text/plain because the Apps Script endpoint does not answer CORS preflights
		const response = await fetch(ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain;charset=utf-8' },
			body: JSON.stringify(relato),
			signal: AbortSignal.timeout(60000)
		})

		if (!response.ok) throw new Error(`status ${response.status}`)

		const result = await response.json().catch(() => ({ ok: true }))
		if (result.ok === false) throw new Error('rejected')

		return json({ ok: true, codigo })
	} catch (error) {
		// log only the failure reason, never the report
		console.error('[etica] forwarding failed:', error instanceof Error ? error.message : 'unknown')
		return json({ ok: false, erro: 'envio' }, 502)
	}
}
