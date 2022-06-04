<div align="center">

  <h1>IcecreamAPI</h1>
  
  <p>
    API that serves ice cream information from popular brands
  </p>

  <br>
</div>

<!-- TechStack -->

### Tech Stack and libraries

  <ul>
    <li>Typescript</li>
    <li>MongoDB</li>
    <li>Jest</li>
    <li>Supertest</li>
    <li>swagger</li>
    <li>pino</li>
    <li>zod</li>
    <li>Typescript</li>
    <li>GitHub Actions CI</li>
  </ul>

<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`HOST`

`PORT`

`MONGO_URI`

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

- [Node.js](https://nodejs.org/en)

<!-- Run Locally -->

### Run Locally

Clone the project

```bash
  git clone https://github.com/zahid47/IceCreamApi.git
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

Run Tests

```bash
  npm run test
```

### API Docs
- API Docs available at "/docs"

<!-- Roadmap -->

### TO-DO

- [x] search using name
- [x] limit
- [x] query params: ?brand, ?rating, ?ingredients ?name
- [x] create index from all the search types
- [x] refactor
- [x] testing
- [x] write docs w swagger (incomplete but im done coz boring)
- [ ] use pagination, include prev attribute
- [ ] add regex to ingredients search (when searching for "milk", entries with "soy milk" should resolve as well)???
- [ ] create compound index for $or: [name, subhead, desc] (mongodb)
- [ ] rate limit
- [ ] graphql

<!-- Contact -->

## Contact

- [email](mailto:epiczahid@gmail.com)
- scarecow#2857 on discord
