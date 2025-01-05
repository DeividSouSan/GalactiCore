import express, { Request, Response } from 'express';
import spaceshipRouter from './routes/Spaceship';
import database from './infra/data-source'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/spaceships', spaceshipRouter);

app.get("/", (req: Request, res: Response) => {

    const databaseDriverVersion = database.driver.version;

    res.json({
        database_driver_version: databaseDriverVersion,
    });
})

app.listen(3000, () => {
    console.log(`Server listing on port ${PORT}`);
})
