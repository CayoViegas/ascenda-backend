# ascenda-backend

Este é o backend do **Ascenda**, um aplicativo gamificado para gerenciamento de progresso pessoal. Ele é construído com **Node.js**, **TypeScript** e utiliza **Drizzle ORM** para interagir com um banco de dados **PostgreSQL**.

## Como Rodar o Projeto

### 1. Pré-requisitos

Certifique-se de que os seguintes programas estão instalados no seu sistema:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v12 ou superior)

### 2. Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL:
```bash
createdb ascenda-db
```

2. Crie o arquivo `.env` com as seguintes configurações:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=<seu_usuario_postgres>
DB_PASSWORD=<sua_senha_postgres>
DB_NAME=ascenda-db
JWT_SECRET=<seu_segredo_jwt>
PORT=3000
```

### 3. Instalar Dependências

No diretório do projeto, execute o comando:
```bash
npm install
```
Isso instalará todas as dependências listadas no `package.json`.

### 4. Criar as Tabelas no Banco de Dados

Execute o script de criação de tabelas:
```bash
npm run create-tables
```
Isso criará todas as tabelas necessárias no banco de dados PostgreSQL.

### 5. Rodar o Servidor

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O servidor estará disponível em `https://localhost:3000`.