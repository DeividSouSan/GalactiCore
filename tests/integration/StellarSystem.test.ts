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

test('GET_stellar_system_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: 'Listando todos os stellar systems.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        count_stellar_systems: 0,
        stellar_systems: []
    });

    expect(responseBody.data.stellar_systems.length).toEqual(0);
    expect(responseBody.data.stellar_systems.length).toEqual(responseBody.data.count_stellar_systems);
});


test('POST_stellar_system_should_return_201', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "name": "Terra",
            "description": "Quente.",
        })
    })

    expect(response.status).toEqual(201);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: 'Stellar system criado com sucesso.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        id: 1,
        name: "Terra",
        description: "Quente.",
    });
});

test('GET_stellar_systems_with_id_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })


    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: 'Mostrando o stellar system com ID fornecido.',
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        id: 1,
        name: "Terra",
        description: "Quente.",
    });
});

test('GET_invalid_stellar_system_should_return_404', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/99", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: 'Stellar system com ID fornecido não foi encontrado.',
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});


test('POST_repeated_stellar_system_should_return_406', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "name": "Terra",
            "description": "Quente.",
        })
    })

    expect(response.status).toEqual(406);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: 'Stellar system com o nome fornecido já existe no banco de dados.',
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test('POST_body_invalid_values_should_return_400', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "name": "Solar",
            "description": "Agua",
            "planets": ["Marte"]
        })
    })

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Corpo da requisição inválido. Stellar system deve conter somente 'name' e 'description'.",
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test('POST_body_with_missing_values_should_return_400', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "name": "Terra",
            // missing description
        })
    })

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Corpo da requisição inválido. Stellar system deve conter somente 'name' e 'description'.",
        data: {}
    });

    expect(responseBody.data).toMatchObject({});
});

test('PUT_invalid_stellar_system_should_return_404', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/99", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "PUT",
        body: JSON.stringify({
            "name": "Andromeda"
        })
    })

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Stellar system com ID fornecido não foi encontrado.",
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test('PUT_stellar_system_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "PUT",
        body: JSON.stringify({
            "name": "Andromeda",
            description: "Distante",
        })
    })

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: "Stellar system específicado alterado com sucesso.",
        data: {}
    });

    expect(responseBody.data).toMatchObject({
        name: "Andromeda",
        description: "Distante",
    });
});

test('PUT_invalid_body_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "PUT",
        body: JSON.stringify({
            "teste": 50,
        })
    })

    expect(response.status).toEqual(400);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Corpo da requisição inválido. Stellar system deve conter somente 'name' e 'description'.",
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});


test('DELETE_stellar_system_with_id_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/1", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "DELETE",
    })

    expect(response.status).toEqual(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'success',
        message: "Stellar system especificado deletado com sucesso.",
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});

test('DELETE_invalid_stellar_system_should_return_404', async () => {
    const response = await fetch("http://localhost:3000/api/v1/stellar-systems/99", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "DELETE",
    })

    expect(response.status).toEqual(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        status: 'error',
        message: "Stellar system com ID fornecido não existe.",
        data: {}
    });

    expect(Object.keys(responseBody.data).length).toEqual(0);
});
