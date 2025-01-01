import { DataSource } from "typeorm"
import { StellarSystem } from "../entity/StellarSystem"
import { Character } from "../entity/Characters"
import { Planet } from "../entity/Planets"
import { Spaceship } from "../entity/Spaceships"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "local_user",
    password: "local_password",
    database: "galaxy",
    entities: [StellarSystem, Character, Planet, Spaceship],
    synchronize: true
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


export default AppDataSource;
