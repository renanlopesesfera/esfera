// shared between the /etica form and the /api/etica route, so both accept the same values

export const ETHICS_EMAIL = 'etica@agenciaesfera.com.br'

export const RETORNOS = ['sem-retorno', 'email-anonimo', 'identificado'] as const
export type Retorno = typeof RETORNOS[number]

export const RELACOES = [
	'Colaborador',
	'Prestador ou freelancer',
	'Fornecedor ou subcontratado',
	'Cliente',
	'Comunidade'
]

export const TEMAS = [
	'Assédio moral',
	'Assédio sexual',
	'Discriminação',
	'Retaliação',
	'Fraude, corrupção ou suborno',
	'Conflito de interesses não declarado',
	'Falsificação de registro ou documento',
	'Jornada de trabalho ou remuneração',
	'Trabalho infantil, forçado ou condições degradantes',
	'Saúde e segurança',
	'Vazamento de informação ou de dados pessoais',
	'Outro'
]

export const MAX_ATTACHMENT_MB = 10
export const ATTACHMENT_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'docx', 'xlsx']
