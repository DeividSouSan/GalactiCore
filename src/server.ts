import express, { Request, Response } from 'express';
import spaceshipRouter from './routes/Spaceship';
import stellarSystemRouter from './routes/StellarSystem';
import planetRouter from './routes/Planets';
import characterRouter from './routes/Characters';
import database from './infra/data-source'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/spaceships', spaceshipRouter);
app.use('/stellar-systems', stellarSystemRouter);
app.use('/planets', planetRouter);
app.use('/characters', characterRouter);

app.get("/", (req: Request, res: Response) => {

    const databaseDriverVersion = database.driver.version;

    res.json({
        database_driver_version: databaseDriverVersion,
    });
})

app.listen(PORT, () => {
    console.log(`Server listing on port ${PORT}`);
})
