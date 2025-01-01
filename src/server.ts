import express from 'express';
import spaceshipRouter from './routes/Spaceship';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/spaceships', spaceshipRouter);

app.listen(3000, () => {
    console.log(`Server listing on port ${PORT}`);
})
