import { DataSource } from "typeorm";
import { Spaceship } from "../../src/infra/entities/Spaceships";
import { StellarSystem } from "../../src/infra/entities/StellarSystems";
import { Character } from "../../src/infra/entities/Characters";
import { Planet } from "../../src/infra/entities/Planets";
import { User } from "../../src/infra/entities/User";
import dotenv from "dotenv";

dotenv.config();
const database = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [StellarSystem, Character, Planet, Spaceship, User],
    migrations: ["src/infra/migrations/*"],
});

beforeAll(async () => {
    await database.initialize();
    await database.dropDatabase();
    await database.runMigrations();

    await database
        .createQueryBuilder()
        .insert()
        .into(StellarSystem)
        .values([
            {
                name: "Sistema Solar",
                description:
                    "Sistema no qual planetas orbitam uma estrela média.",
            },
        ])
        .execute();
    await database.destroy();
});

test("GET_planets_should_return_200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "success",
        message: "Listando todos os planetas.",
        data: {},
    });

    expect(responseBody.data).toMatchObject({
        count_planets: 0,
        planets: [],
    });

    expect(responseBody.data.planets.length).toEqual(
        responseBody.data.count_planets,
    );
    expect(responseBody.data.planets.length).toEqual(0);
});

test("POST_planet_should_return_201", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            name: "Terra",
            weather: "Variado",
            terrain: "Variado",
            population: 800000,
            stellarSystemId: 1,
        }),
    });

    expect(response.status).toEqual(201);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "success",
        message: "Planeta criado com sucesso.",
        data: {},
    });

    expect(responseBody.data.planet).toMatchObject({
        id: 1,
        name: "Terra",
        weather: "Variado",
        terrain: "Variado",
        population: 800000,
        stellarSystemId: 1,
    });

    expect(Object.keys(responseBody.data.planet).length).toEqual(6);
});

test("POST_planet_without_stellar_system_should_return_404", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            name: "Marte",
            weather: "Seco",
            terrain: "Montanhoso",
            population: 800000,
            stellarSystemId: 9, // 9 não existe
        }),
    });

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message: "Sistema de Estrelas como ID fornecido não existe.",
        data: {},
    });
});

test("GET_planet_with_id_should_return_200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/1", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "success",
        message: "Mostrando o planeta com ID fornecido.",
        data: {},
    });

    expect(responseBody.data).toMatchObject({
        id: 1,
        name: "Terra",
        weather: "Variado",
        terrain: "Variado",
        population: 800000,
        stellarSystemId: 1,
    });
});

test("GET_invalid_stellar_system_should_return_404", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/99", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message: "Planeta com ID fornecido não foi encontrado.",
        data: {},
    });

    expect(Object.keys(responseBody.data.planet).length).toEqual(0);
});

test("POST_repeated_stellar_system_should_return_406", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            name: "Terra",
            weather: "Variado",
            terrain: "Variado",
            population: 800000,
            stellarSystemId: 1,
        }),
    });

    expect(response.status).toEqual(406);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message: "Planeta com o nome fornecido já existe no banco de dados.",
        data: {},
    });

    expect(Object.keys(responseBody.data.planet).length).toEqual(0);
});

test("POST_invalid_body_should_return_400", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            name: "Venus",
            weather: "Frio",
            terrain: "Plano",
            population: 120,
            stellarSystemId: 1,
            size: 1000, // this property doesn't exist
        }),
    });

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message:
            "Corpo da requisição inválido. O planeta deve conter somente 'name', 'weather', 'terrain', 'population' e 'stellarSystemId'.",
        data: {},
    });

    expect(Object.keys(responseBody.data.planet).length).toEqual(0);
});

test("POST_body_with_missing_values_should_return_400", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            name: "Terra",
            // missing all other properties
        }),
    });

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message:
            "Corpo da requisição inválido. O planeta deve conter somente 'name', 'weather', 'terrain', 'population' e 'stellarSystemId'.",
        data: {},
    });

    expect(Object.keys(responseBody.data.planet).length).toEqual(0);
});

test("PUT_stellar_system_should_return_200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/1", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            name: "Marte",
            weather: "Frio",
            terrain: "Montanhoso",
        }),
    });

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "success",
        message: "Planet específicado alterado com sucesso.",
        data: {},
    });

    // altered
    expect(responseBody.data.planet.name).toEqual("Marte");
    expect(responseBody.data.planet.weather).toEqual("Frio");
    expect(responseBody.data.planet.terrain).toEqual("Montanhoso");
    // not altered
    expect(responseBody.data.planet.population).toEqual(800000);
    expect(responseBody.data.planet.stellarSystemId).toEqual(1);
});

test("PUT_invalid_stellar_system_should_return_404", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/99", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            name: "Plutão",
        }),
    });

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message: "Planet com ID fornecido não foi encontrado.",
        data: {},
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test("PUT_invalid_body_should_return_400", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/1", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            size: 50,
        }),
    });

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message:
            "Corpo da requisição inválido. planet deve conter somente 'name', 'weather', 'terrain', 'population' e 'stellarSystemId'.",
        data: {},
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test("DELETE_stellar_system_with_id_should_return_200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/1", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "success",
        message: "Planet especificado deletado com sucesso.",
        data: {},
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test("DELETE_invalid_stellar_system_should_return_404", async () => {
    const response = await fetch("http://localhost:3000/api/v1/planets/99", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: "error",
        message: "Planet com ID fornecido não existe.",
        data: {},
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});
