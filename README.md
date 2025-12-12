# Agência Esfera

Website oficial da Agência Esfera - Transformamos ideias em experiências extraordinárias. Eventos corporativos 360º que conectam pessoas e resultados.

## 🚀 Sobre o Projeto

Site institucional desenvolvido para a Agência Esfera, uma agência especializada em eventos corporativos. O projeto apresenta um portfólio de trabalhos, informações sobre a empresa, formulário de contato e integração com WordPress para gerenciamento de conteúdo.

## ✨ Funcionalidades

- **Portfolio Dinâmico**: Integração com WordPress via GraphQL para exibição de projetos
- **Animações Fluidas**: Animações suaves utilizando GSAP e Motion
- **Formulário de Contato**: Integração com SendGrid para envio de emails
- **Navegação Suave**: Smooth scrolling e transições de página
- **Design Responsivo**: Interface adaptável para todos os dispositivos
- **SEO Otimizado**: Meta tags, Open Graph, Schema.org e sitemap automático
- **Performance**: Otimizações de imagens e lazy loading

## 🛠️ Stack Tecnológica

### Core
- **Next.js 15.5.9** - Framework React com App Router
- **React 18.3.1** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4.1.17** - Framework CSS utility-first
- **PostCSS 8.5.6** - Processamento de CSS

### Animações
- **GSAP 3.13.0** - Biblioteca de animações
- **Motion 12.23.26** - Animações declarativas
- **@gsap/react 2.1.1** - Hooks React para GSAP

### Integrações
- **WordPress GraphQL** - CMS headless via `graphql-request`
- **SendGrid 8.1.6** - Serviço de email transacional
- **Google Analytics** - Analytics via `@next/third-parties`

### Componentes e Bibliotecas
- **Fancybox 5.0.36** - Galeria de mídia
- **Swiper 11.2.1** - Sliders e carrosséis
- **React Hook Form 7.54.2** - Gerenciamento de formulários
- **next-transition-router 0.2.11** - Transições de página

### Ferramentas de Desenvolvimento
- **ESLint** - Linter de código
- **Sass** - Pré-processador CSS
- **@svgr/webpack** - Importação de SVGs como componentes React
- **next-sitemap 4.2.3** - Geração automática de sitemap

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd esfera
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Preencha as variáveis necessárias no arquivo `.env.local`:
```env
WP_GRAPHQL=wordpress_url_address/graphql
SENDGRID_API_KEY=your_sendgrid_api_key
```

## 🚦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

O script `postbuild` é executado automaticamente após o build para gerar o sitemap.

## 📁 Estrutura do Projeto

```
esfera/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── home/              # Página inicial
│   │   ├── sobre/             # Página sobre
│   │   ├── contato/           # Página de contato
│   │   ├── portfolio/         # Páginas de portfolio
│   │   └── api/               # API routes
│   ├── components/            # Componentes React
│   │   ├── Utils/             # Utilitários e animações
│   │   └── PortfolioBlocks/   # Componentes de portfolio
│   ├── lib/                   # Bibliotecas e helpers
│   │   └── wordpress/         # Integração WordPress
│   ├── assets/                # Assets estáticos
│   │   ├── css/               # Estilos globais
│   │   └── svg/               # Ícones SVG
│   └── utils/                 # Funções utilitárias
├── public/                    # Arquivos públicos
│   ├── img/                   # Imagens
│   └── videos/                # Vídeos
└── package.json
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

- `WP_GRAPHQL` - URL do endpoint GraphQL do WordPress
- `SENDGRID_API_KEY` - Chave da API do SendGrid (para formulário de contato)

### WordPress

O projeto utiliza WordPress como CMS headless. Certifique-se de que:
- O WordPress possui o plugin GraphQL configurado
- O endpoint GraphQL está acessível
- As imagens estão configuradas para serem servidas do domínio do WordPress

## 🎨 Componentes Principais

- **Menu** - Navegação principal
- **Preloader** - Tela de carregamento inicial
- **SmoothScroller** - Scroll suave personalizado
- **PageTransition** - Transições entre páginas
- **Portfolio** - Exibição de projetos
- **Form** - Formulário de contato com validação
- **Footer** - Rodapé do site

## 📝 Licença

Este projeto é privado e proprietário da Agência Esfera.

## 📧 Contato

**Agência Esfera**
- Email: agenciaesfera@agenciaesfera.com.br
- Endereço: Av. Rep. Argentina, 1228 - Vila Izabel, Curitiba - PR, 80610-260
- Website: https://agenciaesfera.com.br