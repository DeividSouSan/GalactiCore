import express from 'express';
import { Router, Request, Response } from 'express';
import "reflect-metadata"
import AppDataSource from "../src/infra/data-source"
const app = express();
const PORT = 3000;
const route = Router();

app.use(express.json());


route.get("/status", (req: Request, res: Response) => {
    const version = AppDataSource.driver.version

    res.json({
        message: version,
    })
})

route.get("/databases", async (req: Request, res: Response) => {
    const queryRunner = AppDataSource.createQueryRunner();
    const tables = await queryRunner.getTables();

    res.json({
        result: tables.map((table) => table.name),
    })
})

app.use(route);

app.listen(3000, () => {
    console.log(`Server listing on port ${PORT}`);
})
