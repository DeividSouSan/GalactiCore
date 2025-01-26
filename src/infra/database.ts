import { DataSource } from "typeorm"
import "reflect-metadata";
import { StellarSystem } from "../entity/StellarSystems"
import { Character } from "../entity/Characters"
import { Planet } from "../entity/Planets"
import { Spaceship } from "../entity/Spaceships"
import dotenv from 'dotenv';
import { User } from "../entity/User";

dotenv.config()

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

database.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default database;

