# 🎮 Lobby Frontend

Uma interface de usuário interativa para uma rede social, onde jogadores podem compartilhar fotos de seus personagens de jogos favoritos, incluindo skins, nomes de personagens, nomes dos jogos e épocas em que os jogos se passam.

---

## 📖 Descrição

Este **frontend** foi desenvolvido como uma interface de usuário interativa para jogadores compartilharem fotos de seus personagens de jogos favoritos.  
O **backend** foi criado com o auxílio de inteligência artificial, mas o foco principal do projeto é o **Frontend**.

O projeto foi construído para suportar todas as funcionalidades visuais e de interação, garantindo a integração entre frontend e backend e proporcionando aos usuários uma experiência **imersiva e funcional**.

---

## 🎯 Para Que Serve

O **Lobby Frontend** funciona como a camada de interação de uma rede social dedicada a jogadores, oferecendo as seguintes funcionalidades:

- **📸 Postagem de Fotos**: usuários podem enviar imagens de seus personagens, destacando skins e personalizações.
- **📑 Detalhamento de Conteúdo**: cada postagem pode conter nome do personagem, nome do jogo e época em que o jogo se passa.
- **💬 Interação Social**: os jogadores podem visualizar posts de outros, adicionar comentários e acompanhar número de acessos.
- **👤 Gerenciamento de Perfil**: usuários podem gerenciar suas postagens, incluindo a opção de deletá-las.

Essa interface foi pensada para ser **intuitiva e envolvente**, permitindo que os jogadores exibam suas skins e histórias de jogo enquanto se conectam com outros players.

---

## 🛠️ Tecnologias Utilizadas

- **React** → biblioteca JavaScript para construção da interface de usuário.
- **React Router** → navegação entre páginas e rotas dinâmicas.
- **CSS Modules** → estilização específica para cada componente.
- **Fetch API** → consumo do backend (via hook customizado `useFetch`).
- **Context API** → gerenciamento de estado global (ex.: dados do usuário).
- **JavaScript (ES6+)** → lógica e manipulação de dados.
- **HTML5** → estrutura semântica das páginas.
- **Vite** → ferramenta de build e desenvolvimento rápido.

---

## ✨ Funcionalidades Implementadas

- **Formulário de Postagem** → envio de fotos com nome, personagem, época do jogo e pré-visualização.  
- **Exibição de Fotos** → mostra detalhes de cada postagem (autor, título, personagem, época, acessos e comentários).  
- **Gerenciamento de Usuário** → integração com autenticação e opções de deletar posts.  
- **Comentários** → componente para visualizar e interagir com comentários em fotos.  
- **Navegação** → links para perfis de usuários e detalhes de fotos específicas.  

---

## 📌 Notas

- O frontend foi projetado para ser **visual e funcional**, com foco na **experiência do usuário**.  
- Futuras melhorias podem incluir:  
  - Integração com **TailwindCSS** para animações e responsividade avançada.  
  - Novas interações sociais (curtidas, compartilhamentos, etc).  
- A integração com o backend assume que os **endpoints estão disponíveis** e retornam os dados esperados (nome, personagem, época, etc).  

---

👾 **Desenvolvido com foco no frontend e integração com o backend.**  
**Seja bem-vindo ao seu próprio Lobby!**
