# 🎮 Lobby Frontend

Uma interface de usuário interativa para uma rede social, onde players podem compartilhar fotos de seus personagens de jogos favoritos, incluindo skins, nomes de personagens, nomes dos jogos e épocas em que os jogos se passam.

---

## 📖 Descrição

O **backend** foi criado com o auxílio de inteligência artificial, mas o foco principal do projeto é o **Frontend**.

O projeto foi **migrado para Next.js** e construído para suportar todas as funcionalidades visuais e de interação, garantindo a integração entre frontend e backend e proporcionando aos usuários uma experiência **imersiva e funcional**.

---

## 🎯 Para Que Serve

O **Lobby Frontend** funciona como a camada de interação de uma rede social dedicada a jogadores, oferecendo as seguintes funcionalidades:

- **📸 Postagem de Fotos**: usuários podem enviar imagens de seus personagens, destacando skins e personalizações.
- **📑 Detalhamento de Conteúdo**: cada postagem pode conter nome do personagem, nome do jogo e época em que o jogo se passa.
- **💬 Interação Social**: os jogadores podem visualizar posts de outros, adicionar comentários e acompanhar número de acessos.
- **👤 Gerenciamento de Perfil**: usuários podem gerenciar suas postagens, incluindo a opção de deletá-las.
- **📊 Estatísticas**: dashboard com métricas de desempenho, fotos mais acessadas e tendências.
- **🔐 Autenticação Segura**: sistema com JWT e middleware de validação.

Essa interface foi pensada para ser **intuitiva e envolvente**, permitindo que os jogadores exibam suas skins e histórias de jogo enquanto se conectam com outros players.

---

## 🛠️ Tecnologias Utilizadas

### **Framework e Linguagem**

- **Next.js 15** → framework React com SSR, SSG e App Router
- **TypeScript** → tipagem estática para maior segurança e produtividade
- **React 19** → biblioteca JavaScript para construção da interface

### **Autenticação e Segurança**

- **JWT (JSON Web Tokens)** → autenticação segura via tokens
- **Jose** → biblioteca para validação e verificação de JWT
- **Middleware** → proteção de rotas e validação automática

### **Gerenciamento de Estado**

- **Context API** → gerenciamento de estado global com TypeScript
- **Server Actions** → ações do lado servidor para operações seguras
- **Custom Hooks** → hooks personalizados para lógica reutilizável

### **Performance e SEO**

- **Lazy Loading** → carregamento otimizado de componentes e imagens
- **Server-Side Rendering (SSR)** → renderização no servidor
- **Static Site Generation (SSG)** → geração estática quando apropriado
- **Revalidação de Cache** → estratégias de cache inteligentes

### **Estilização e Interface**

- **CSS Modules** → estilização específica e isolada para cada componente
- **Fontes Customizadas** → tipografia otimizada e personalizada
- **Ícones SVG Customizados** → ícones em TSX para melhor performance

### **Monitoramento e Analytics**

- **Vercel Analytics** → análise de performance e uso da aplicação
- **Recharts** → visualização de dados e estatísticas

---

## ✨ Funcionalidades Implementadas

### **Autenticação e Usuário**

- **🔐 Sistema de Login/Logout** → autenticação JWT com validação automática
- **👤 Gerenciamento de Perfil** → dados do usuário via Context API
- **🛡️ Middleware de Proteção** → rotas protegidas automaticamente

### **Gerenciamento de Fotos**

- **📤 Upload de Fotos** → formulário com pré-visualização e validação
- **📋 Listagem Otimizada** → lazy loading e paginação server-side
- **🔍 Detalhes da Foto** → visualização completa com comentários
- **🗑️ Exclusão de Posts** → gerenciamento seguro via server actions

### **Interações Sociais**

- **💬 Sistema de Comentários** → adição e visualização em tempo real
- **📊 Contador de Acessos** → métricas de visualização
- **👥 Perfis de Usuários** → navegação entre perfis

### **Dashboard e Estatísticas**

- **📈 Métricas de Performance** → total de acessos, fotos postadas, média
- **🏆 Ranking de Fotos** → fotos mais acessadas com visualização
- **📊 Tendências** → análise de performance via gráficos (Recharts)
- **🎯 Foto Mais Acessada** → destaque da foto com melhor performance

### **Performance e UX**

- **⚡ Lazy Loading** → carregamento otimizado de componentes
- **🔄 Cache Inteligente** → revalidação automática (60s)
- **🚀 SSR/SSG** → renderização otimizada para SEO
- **📱 Responsividade** → interface adaptável a diferentes dispositivos

---

## 🔧 Principais Server Actions Implementadas

- **`userGet()`** → busca dados do usuário autenticado
- **`photosGet()`** → listagem paginada de fotos
- **`photoGet()`** → detalhes específicos de uma foto
- **`photoPost()`** → upload de novas fotos
- **`photoDelete()`** → exclusão segura de posts
- **`commentPost()`** → adição de comentários
- **`statsGet()`** → métricas e estatísticas do usuário

---

## 📌 Próximas Futuras Melhorias

- **Real-time Comments** → comentários em tempo real com WebSocket
- **Advanced Filters** → filtros por época, personagem, etc.
- **Social Features** → sistema de curtidas e compartilhamentos
- **PWA Support** → transformar em Progressive Web App
- **Advanced Analytics** → métricas mais detalhadas
- **Image Optimization** → compressão e redimensionamento automático
- **TailwindCSS** → possivel implementação do framework

---

## 🎯 Performance e SEO

- **Core Web Vitals** → otimizado para métricas do Google
- **Server-Side Rendering** → melhor SEO e tempo de carregamento
- **Static Generation** → páginas estáticas quando possível
- **Vercel Analytics** → monitoramento contínuo de performance
- **TypeScript** → maior confiabilidade e menos bugs em produção

---

👾 **Migrado para Next.js com foco em performance, segurança e experiência do usuário.**  
**Seja bem-vindo de volta ao Lobby!** 🚀
