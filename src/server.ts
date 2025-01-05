import express, { Request, Response } from 'express';
import spaceshipRouter from './routes/Spaceship';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/spaceships', spaceshipRouter);

app.get("/", (req: Request, res: Response) => {
    res.json({
        test: "Ok!"
    });
})

app.listen(3000, () => {
    console.log(`Server listing on port ${PORT}`);
})
