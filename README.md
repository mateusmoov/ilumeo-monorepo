<div align="center">
  <h1 align="center">Ponto Ilumeo</h1>

![enter image description here](https://i.imgur.com/ZPNmAUZ.png)

  <p align="center">
    <a href="/DOCUMENTATION/CHALLENGE.md">Challenge</a>
    ·
    <a href="/DOCUMENTATION/ROADMAP.md">Roadmap</a>
  </p>
</div>

## Sobre o projeto

O projeto tem como objetivo de realizar o controle de ponto dos colaboradores da Ilumeo e permitir que eles tenham visibilidade das suas horas trabalhadas.

Você pode testar a aplicação em produção clicando [aqui](https://illumeo-monorepo-web-rho.vercel.app/) e colocar o code `4SXXFMf`.

### Desenvolvido com

- [ReactJS](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [PostgresSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router Dom](https://reactrouter.com/en/main)

## Documentações

- [Desafio](./DOCUMENTATION/CHALLENGE.md) - Challenge
- [Roadmap](./DOCUMENTATION/ROADMAP.md) - Roadmap

#### Production

Prerequisites

- Docker
- docker-compose

1. Rode `docker-compose up -d --build` na pasta root do projeto.
2. Frontend rodando no `localhost:3001`, backend rodando no `localhost:3000`

### Testes
Depois de ter rodado o comando sudo `docker-compose up --build`: 

#### Front
- Vá para a pasta do front-end `/packages/web` e rode o comando `yarn && yarn test`
#### Back
- Adicione o code `4SXXFMf` na tabela de User no banco de dados, você pode usar o Beekeeper Studio, clicar em `Import from URL` e colar o .env localizado em `/packages/server`.
- Vá para a pasta do back-end `/packages/server` e rode o comando `npx prisma generate && yarn && yarn test`

## Contact

Mateus Vasconcelos - [@moovhe4rt](https://twitter.com/moovhe4rt) - mateusvasconcelos4210@gmail.com
