import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source'
import { Repository } from 'typeorm';
import { StellarSystem } from '../entity/StellarSystem';
import HTTPStatus from 'http-status-codes';

const router = express.Router()

router.post("/", (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

    console.log(req.body);

    const newStellarSystem: StellarSystem[] = repository.create(req.body);

    repository.save(newStellarSystem);

    res.status(HTTPStatus.CREATED).send({
        newStellarSystem,
    })
})

router.get("/", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

    const stellarSystems: StellarSystem[] = await repository.find();

    res.status(HTTPStatus.OK).send(stellarSystems);
})

export default router;
