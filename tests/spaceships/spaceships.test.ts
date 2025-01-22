import { DataSource } from 'typeorm';
import { Spaceship } from '../../src/entity/Spaceships';
import { StellarSystem } from '../../src/entity/StellarSystems';
import { Character } from '../../src/entity/Characters';
import { Planet } from '../../src/entity/Planets';
import { User } from '../../src/entity/User';
import dotenv from 'dotenv';

dotenv.config();
const database = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [StellarSystem, Character, Planet, Spaceship, User],
    migrations: ["src/migrations/*"],
})

beforeAll(async () => {
    await database.initialize();
    await database.createQueryBuilder().delete().from(Spaceship).execute();
    await database.destroy();
});

test('GET_all_spaceships_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/spaceships/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })


    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: 'Requisição processada com sucesso',
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        countSpaceships: 0,
        spaceships: []
    });

    expect(responseBody.data.spaceships.length).toEqual(0);
});


test('POST_spaceship_should_return_201', async () => {
    const response = await fetch("http://localhost:3000/spaceships/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "model": "AAAA",
            "manufacturer": "BBBB",
            "capacity": 10
        })
    })

    expect(response.status).toEqual(201);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: 'Requisição processada com sucesso',
        data: {}
    });

    expect(responseBody.data.spaceship).toMatchObject({
        model: 'AAAA',
        manufacturer: 'BBBB',
        capacity: 10,
    });
});

test('POST_repeated_model_should_return_406', async () => {
    const response = await fetch("http://localhost:3000/spaceships/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "model": "AAAA",
            "manufacturer": "BBBB",
            "capacity": 10
        })
    })

    expect(response.status).toEqual(406);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: 'Nave do modelo fornecido já existe no banco de dados.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({});
});

test('POST_invalid_body_should_return_400', async () => {
    const response = await fetch("http://localhost:3000/spaceships/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "model": "Kiara",
            "capacity": 100
        })
    })

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Corpo da requisição inválido. Nave deve conter: 'model', 'manufacturer' e 'capacity'.",
        data: {}
    });

    expect(responseBody.data).toMatchObject({});
});
