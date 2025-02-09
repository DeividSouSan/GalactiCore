<img width="100%" src="https://github.com/user-attachments/assets/77128de3-b31f-4f86-afb1-bad1b8448884"/>

<section align="center">
	<img src='https://img.shields.io/github/languages/top/deividsousan/galacticore?style=for-the-badge' alt='Linguagem mais utilizada' /> <img src='https://img.shields.io/github/last-commit/deividsousan/galacticore?style=for-the-badge' alt='Último commit' />
</section>

<section align="center">
GalactiCore é uma API backend projetada para os entusiastas do universo sci-fi e desenvolvedores que buscam explorar a criação de galáxias inspiradas em Star Wars. Este projeto permite a criação, gerenciamento e visualização de planetas, sistemas estelares, personagens icônicos e naves espaciais, sendo um projeto que objetiva ser divertido e demonstrar minhas habilidades no desenvolvimento de APIs. 
</section>

<h2>Objetivo</h2>
<p>
O <code>GalactiCore</code> foi desenvolvido como um projeto para colocar em prática minhas habilidades de desenvolvimento backend, abordando a maior parte das etapas e tecnologias envolvidas no desenvolvimento de uma API. 
</p>

<details>
<summary><h2>Rotas da API</h2></summary>

- **Planets**

  - **POST 📤 /planets:** Criar um novo planeta.
  - **GET 📥 /planets:** Listar todos os planetas.
  - **GET 📥 /planets/:id:** Obter detalhes de um planeta específico.
  - **PUT 🔄 /planets/:id:** Atualizar informações de um planeta.
  - **DELETE 🗑 /planets/:id:** Deletar um planeta.

- **Stellar Systems**

  - **POST 📤 /star-systems:** Criar um novo sistema estelar.
  - **GET 📥 /star-systems:** Listar todos os sistemas estelares.
  - **GET 📥 /star-systems/:id:** Obter detalhes de um sistema estelar específico.
  - **PUT 🔄 /star-systems/:id:** Atualizar informações de um sistema estelar
  - **DELETE 🗑 /star-systems/:id**: Deletar um sistema estelar.

- **Characters**

  - **POST 📤 /characters:** Criar um novo personagem.
  - **GET 📥 /characters:** Listar todos os personagens.
  - **GET 📥 /characters/:id:** Obter detalhes de um personagem específico.
  - **PUT 🔄 /characters/:id:** Atualizar informações de um personagem.
  - **DELETE 🗑 /characters/:id:** Deletar um personagem.

- **Spaceships**
  - **POST 📤 /spaceships:** Criar uma nova nave espacial.
  - **GET 📥 /spaceships:** Listar todas as naves espaciais.
  - **GET 📥 /spaceships/:id:** Obter detalhes de uma nave espacial específica.
  - **PUT 🔄 /spaceships/:id:** Atualizar informações de uma nave espacial.
  - **DELETE 🗑 /spaceships/:id:** Deletar uma nave espacial.

</details>
<h2>
Ferramentas e Tecnologias
</h2>

> **TypeScript**: Linguagem utilizada para realização do projeto.
>
> **ExpressJS**: Framework minimalista e prático para criar APIs RESTful.
>
> **TypeORM**: Para manipular o banco de dados através do código.
>
> **Jest**: Para testes de integração e garantir que alterações não quebrem os endpoints.
>
> **Docker Compose**: Para subir o serviço do banco de dados _MySQL_.

<section align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/TypeORM-FE0803?logo=typeorm&logoColor=fff&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/Render-000?logo=render&logoColor=fff&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/Beekeeper%20Studio-FAD83B?logo=beekeeperstudio&logoColor=000&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=for-the-badge" alt='Linguagem mais utilizada' />
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt='Linguagem mais utilizada' />
</section>

<h2>
Arquitetura do Projeto
</h2>

```plaintext
src/
├── infra/
│   ├── entities/
│   │   └── ...
│   ├── migrations/
│   │   └── ...
│   ├── database.ts
│   └── error.ts
└── routes/
    └── ...
test/
└── integration/
    ├── Spaceships.test.ts
    └── StellarSystems.test.ts
...
```

<h2>
  Como rodar
</h2>
  ...
