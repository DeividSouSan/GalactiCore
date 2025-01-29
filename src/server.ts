import express, { Request, Response } from 'express';
import spaceshipRouter from './routes/Spaceship';
import stellarSystemRouter from './routes/StellarSystem';
import planetRouter from './routes/Planets';
import characterRouter from './routes/Characters';
import registerRouter from './routes/Register';
import database from './infra/database'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1', spaceshipRouter);
app.use('/api/v1', stellarSystemRouter);
app.use('/api/v1', planetRouter);
app.use('/api/v1', characterRouter);
app.use(registerRouter);

app.get("/", (req: Request, res: Response) => {

    const databaseDriverVersion = database.driver.version;

    res.json({
        database_driver_version: databaseDriverVersion,
    });
})

app.listen(PORT, () => {
    console.log(`Server listing on port ${PORT}`);
})
