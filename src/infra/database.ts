import { DataSource } from "typeorm";
import "reflect-metadata";
import { StellarSystem } from "./entities/StellarSystems";
import { Character } from "./entities/Characters";
import { Planet } from "./entities/Planets";
import { Spaceship } from "./entities/Spaceships";
import dotenv from "dotenv";
import { User } from "./entities/User";

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

database
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default database;
