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

test('get_all_spaceships_should_return_200', async () => {
    const response = await fetch("http://localhost:3000/spaceships/", {
        headers: {
            "Content-Type": 'application/json',
        },
        method: "GET",
    })


    const body = await response.json();
    expect(body.status).toBe("success");
    expect(response.status).toEqual(200);
});


test('post_spaceship_should_return_201', async () => {
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

    expect(response.status).toEqual(201)
});

test('post_spaceship_should_return_201', async () => {
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

    expect(response.status).toEqual(201)
});
