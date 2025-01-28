import { DataSource } from 'typeorm';
import { Spaceship } from '../../src/infra/entities/Spaceships';
import { StellarSystem } from '../../src/infra/entities/StellarSystems';
import { Character } from '../../src/infra/entities/Characters';
import { Planet } from '../../src/infra/entities/Planets';
import { User } from '../../src/infra/entities/User';
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
    migrations: ["src/infra/migrations/*"],
})

beforeAll(async () => {
    await database.initialize();
    await database.dropDatabase();
    await database.runMigrations();
    await database.destroy();
});

test('GET_spaceships_should_return_200', async () => {
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
        message: 'Listando todas as spaceships.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        countSpaceships: 0,
        spaceships: []
    });

    expect(responseBody.data.spaceships.length).toEqual(0);
    expect(responseBody.data.spaceships.length).toEqual(responseBody.data.countSpaceships);
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
        message: 'Spaceship criada com sucesso.',
        data: {}
    });

    expect(responseBody.data.spaceship).toMatchObject({
        model: 'AAAA',
        manufacturer: 'BBBB',
        capacity: 10,
    });
});

test('GET_spaceships_with_id_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/spaceships/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })


    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: 'Mostrando a spaceship com ID fornecido.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        spaceship: {
            id: 1,
            model: "AAAA",
            manufacturer: "BBBB",
            capacity: 10,
        }
    });
});

test('GET_spaceships_that_doesnt_exist_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/spaceships/99", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: 'Spaceship com ID fornecido não foi encontrada.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({});
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
        message: 'Spaceship do modelo fornecido já existe no banco de dados.',
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
        message: "Corpo da requisição inválido. Spaceship deve conter: 'model', 'manufacturer' e 'capacity'.",
        data: {}
    });

    expect(responseBody.data).toMatchObject({});
});

test('PUT_spaceship_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/spaceships/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "PUT",
        body: JSON.stringify({
            "capacity": 1000
        })
    })

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toMatchObject({
        status: 'success',
        message: "Spaceship específicada alterada com sucesso.",
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        capacity: 1000
    });
});

test('DELETE_spaceships_with_id_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/spaceships/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "DELETE",
    })

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: "Spaceship deletada com sucesso.",
        data: {}
    });

});

test('DELETE_spaceships_with_wrong_id_should_return_404', async () => {
    const response = await fetch("http://localhost:3000/spaceships/99", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "DELETE",
    })

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Spaceship com ID fornecido não existe.",
        data: {}
    });

    expect(responseBody.data).toMatchObject({});
});
