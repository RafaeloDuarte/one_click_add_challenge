Aqui está um modelo de README para o seu projeto:

---

# **YouTube Video Voting App**

Este é um projeto simples desenvolvido com **Node.js** no backend e **React** com **Vite** no frontend. Ele permite que os usuários façam login (autenticação JWT) e participem de uma votação entre dois vídeos do YouTube.

## **Índice**
- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação e Configuração](#instalação-e-configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autenticação JWT](#autenticação-jwt)
- [API Endpoints](#api-endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## **Visão Geral**

Este projeto é um teste para avaliar habilidades de desenvolvimento front-end e back-end. O usuário pode:
1. Fazer login.
2. Escolher entre dois vídeos do YouTube em uma votação.
3. Alternar o idioma das telas entre português e inglês.

O backend fornece as APIs necessárias e gerencia a autenticação JWT. O frontend consome essas APIs para exibir as funcionalidades ao usuário.

---

## **Tecnologias Utilizadas**

### **Backend**
- Node.js
- TypeScript
- Express
- JWT (Json Web Token)
- Postgres
- ESLint e Prettier

### **Frontend**
- React
- TypeScript
- Vite
- Bootstrap
- Axios
- ESLint e Prettier

---

## **Funcionalidades**
- **Login com autenticação JWT**: O usuário faz login com credenciais e recebe um token para acessar rotas protegidas.
- **Votação entre vídeos do YouTube**: Os vídeos são apresentados, e o usuário seleciona o preferido.
- **Persistência de votos** (caso haja integração com banco de dados).

---

## **Instalação e Configuração**

### Pré-requisitos
Certifique-se de ter instalado:
- Node.js (v16+)
- npm ou yarn
- Banco de dados PostgreSQL

### **Clonando o Repositório**
```bash
git clone https://github.com/RafaeloDuarte/one_click_add_challenge
cd one_click_add_challenge
```

### **Configurando o Backend**
1. Vá para a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz:
   ```env
   PORT=3000
   JWT_SECRET=sua-chave-secreta
   DATABASE_URL=seu-banco-de-dados
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
   ```

### **Configurando o Frontend**
1. Vá para a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## **Scripts Disponíveis**

### **Backend**
- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm test`: Roda os testes.

### **Frontend**
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção.
- `npm run lint`: Executa o linter.
- `npm run test`: Roda os testes.

---

## **Estrutura do Projeto**

### **Backend**
```
backend/
├── src/
│   ├── locales/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── tests/
│   ├── utils/
│   └── index.ts
└── package.json
```

### **Frontend**
```
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── hoc/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── test/
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

---

## **Autenticação JWT**
1. O usuário envia suas credenciais para `/login`.
2. O backend valida as credenciais e retorna um token JWT.
3. O token é usado para acessar endpoints protegidos.

---

## **API Endpoints**

### **Auth**
- `POST /login`: Faz login e retorna um JWT.
- `POST /register` (opcional): Registra um novo usuário.

### **Votação**
- `GET /videos`: Retorna os vídeos disponíveis para votação.
- `PUT /videos/:id`: Envia o voto do usuário.

