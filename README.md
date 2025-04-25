#🎬 Filmes FullStack
 [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/felipperaia)
 ---
##📌 Descrição
O Filmes FullStack é uma aplicação web desenvolvida para gerenciar e exibir informações sobre filmes. A aplicação permite que os usuários visualizem detalhes dos filmes, como título, sinopse, avaliação e gênero. A interface é intuitiva e responsiva, proporcionando uma experiência agradável tanto em dispositivos móveis quanto em desktops.​

---

##🛠️ Funcionalidades
Visualização de Filmes: Exibe uma lista de filmes com informações detalhadas.

Busca de Filmes: Permite pesquisar filmes por título.

Detalhes do Filme: Ao clicar em um filme, exibe informações adicionais, como sinopse e avaliação.

Interface Responsiva: Design adaptável para diferentes tamanhos de tela.​

---

##💻 Tecnologias Utilizadas
### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

### Others
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Vscode](https://img.shields.io/badge/Vscode-007ACC?style=flatfor-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=flat&logo=Postman&logoColor=white)

🚀 Como Rodar o Projeto
🧰 Pré-requisitos
Node.js (versão 14 ou superior)

---

## 🚀 Instalação Local

Siga estes passos para configurar o projeto localmente:

1. **Clonar Repositório**

   Acesse o terminal

   git clone https://github.com/MLaura963/filmes.fullstack.git

   cd Filmes
   cd backend

1. **Instalar Dependências**

    npm install
   
2. **Configure variaveis de ambiente**

    adicione o .env e configure o caminho do
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/filmes
   JWT_SECRET=sua_chave_secreta_jwt

3. **Iniciar Serviços**

    npm run start

4. **Abra o Navegador**

    http://localhost:3000

5. **Abra o Postman no Desktop**

Para criar um novo usuário, siga os passos:

Endpoint: POST http://localhost:3000/api/auth/register

Headers:
Key           |   Key
Authorization | SEU_TOKEN_JWT

Body:
raw
JSON


{
  "nome": "Seu nome",
  "email": "email@email.com",
  "usuario": "user",
  "senha": "senha"
}

6. **Volte ao Navegador**

    Entre no Login e faça Login!
    
---

##📄 Licença
Este projeto está licenciado sob a Licença MIT.
