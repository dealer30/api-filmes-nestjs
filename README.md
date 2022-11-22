<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="images/logogetfilmes.png" width="700" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Utilizando a plataforma NestJS para criar uma <a href="http://nodejs.org" target="_blank">Aplicação</a> para controle de filmes.</p>

## Descrição

Esse software se trata de uma API em NestJS que realiza um CRUD de Filmes, além de operações adicionais como cadastro, autenticação de usuários, busca de filmes por título, categoria, etc. [Clique aqui para acessar em produção.](https://movies-api-nestjs.herokuapp.com/docs#/)

## Instalação

```bash
$ npm install
```
## .env(obrigatório)

```bash
DATABASE_URL="url do postgres"
PORT="porta da aplicação"
MODE="DEV"
REDIS_HOST="ip redis"
REDIS_PORT="porta redis"
REDIS_PASSWORD="senha redis"
CACHE_TTL="ttl do cache"
CACHE_MAX="máximo de itens gravados no cache"
JWT_SECRET="segredo dos jsonwebtokens"
JWT_EXPIRES_IN="tempo de expiração do jwt"
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Do Autor

Essa foi a primeira vez que utilizei NestJS, PostgreSQL e Redis para criação de API, já havia utilizado TypeScript junto ao NodeJS e MySQL e havia tido bons resultados. [Também já havia criado um site, por isso não tive problemas com deploy.](https://colet.tech) 

Aprendi bastante e fiquei satisfeito com os resultados. Tive alguns problemas em relação a conteinerização que ainda estou estudando e em relação ao Cache também, tive alguns problemas para me familiarizar e como o tempo foi pouco, não pude fazer coisas muito complexas com o cache, visto que o DB já tem um certo grau de complexidade devido aos relacionamentos. Gostei muito do NestJS e da TypeORM que é uma poderosa ferramenta para criação de queries.

Além disso, gostei muito da forma de documentar do Swagger junto ao NestJS, pode ver que as documentações estão funcionando 100%. =)

## Siga-me nas redes!

- Linkedin - [Lucas Reis](https://www.linkedin.com/in/lucasreis30/)
