## Description

Desafio Técnico: Desenvolvimento de API RESTful em Node.js com NestJS

Contexto:
Você recebeu uma demanda(front-end) para desenvolver uma API RESTful para
gerenciar uma lista de tarefas utilizando o framework NestJS. Além disso, você precisa
garantir que o método de criação de uma nova tarefa valide se o usuário tem
permissão para criar tarefas e verifique se uma tarefa com o mesmo nome já existe no
banco de dados.

Documentacao da api com Swagger presente no endpoint /api

Todas os endpoints (com exceção de POST /user e POST /singin) exigem o header Authorization. Para ter acesso a todos endpoints é necessario cadastrar o token JWT no botao verde com cadeado escrito "Authorize" ( token é obtido no endpoint POST /signin).

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i --legacy-peer-deps
```

3. Create a PostgreSQL database

```bash
docker-compose up
```

4. Configure the `.env.development` file using the `.env.example` file
5. Run all migrations

```bash
npx prisma migrate dev
```

6. Generate TypeScript types

```bash
npx prisma generate
```

6. Seed db

```bash
npx prisma db seed
```

6. Run the api:

```bash
npm run start
```
