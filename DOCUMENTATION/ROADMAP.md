# Roadmap do desafio

## Visão

Minha visão sobre o desafio foi a construção de uma aplicação web urgente para usuários que trabalham na empresa com o intuito de marcar o ponto de entrada e o ponto de saida, acumulando a quantidade de horas feitas no dia. Isso permite um melhor controle de horas trabalhadas ao dia.

## Escolhas

Tecnologias escolhidas para aplicação e motivos da escolha

- React Router DOM
  - Por já ter uma experiência com a biblioteca
  - Facilidade de fazer uma aplicação SPA
- Prisma
  - Por ser bem intuitivo e fácil a integração do ORM.
  - Criação de Schema
  - ORM Gerado com tipagens

## Dificuldades

1.  Durante o desafio tive um problema na hora de fazer o docker-compose da aplicação, no momento da execução do docker-compose era necessário primeiro realizar o build da imagem do backend para posteriormente ser feito o deploy das instancias do compose, durante o desenvolvimento foi eu indentifiquei que como o backend no momento do build acessava a base de dados, o mesmo não conseguia realizar as migrates necessárias, impedindo o compose de subir, atraves desse problema foi criado um novo serviço no docker-compose responsável somente por realizar as migrations e se encerrar, dessa forma configurando as bases necessárias para o acesso da aplicação e deixando funcional.
2.  Dificuldades na hora de configurar o ambiente tanto de backend como frontend para receberem testes.
3.  De início fiquei um pouco indeciso de qual nome colocar e como que eu devia seguir os padrões para um melhor nome de uma table do banco de dados.
4.  Tive conflitos de classes onde estava usando o mesmo nome nos dois componentes.

## Melhorias

1. No caso eu estou usando a biblioteca do moment.js, o que hoje já é deprecated e tem um bundle muito alto, poderia ter usado uma outra biblioteca de testes.
2. Poderia ter mais animações no sistema, acho as transições de tela e registros muito "secos".
3. Poderia ter implementado uma validação caso o usuário desse F5, no caso, se o usuário clicar no botão de Hora de entrada, sair da aplicação, poderia reestabelecer o tempo dele.
4. Poderia ter usado css.modules, pois no meio do desenvolvimento, tive conflitos de classes onde estava usando o mesmo nome nos dois componentes.

## Timeline

_O processo de desenvolvimento da aplicação_

### Início

1.  Definição de tecnologia e ferramentas
2.  Criação dos componentes do front-end
3.  Criação das páginas do front-end

### Meio

1.  Criação do banco de dados
2.  Criação das rotas do backend
3.  Comunicando as rotas do backend no front end
4.  Criação de testes

### Final

1.  "Dockerizando" a aplicação
2.  Melhorias no front-end

## Conclusão

Tests: Creio que não criei testes o suficiente para a rota de backend, mas o suficiente para o objetivo dele, o front eu acredito que fiz todas as rotas para os componentes.

Desenvolvimento: Gostei do resultado final, apesar de ter algumas melhorias que queria adotar, mas fiquei super satisfeito.

Desafio: Gostei do desafio, só as horas de teste e de subir a aplicação com docker-compose que me levaram bons tempos do desenvolvimento da aplicação, mas foi o suficiente para encaixar no prazo estipulado.
