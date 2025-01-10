import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source'
import { Repository } from 'typeorm';
import { StellarSystem } from '../entity/StellarSystem';
import HTTPStatus from 'http-status-codes';

const router = express.Router()

router.post("/", (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);
    const newStellarSystem: StellarSystem[] = repository.create(req.body);

    repository.save(newStellarSystem);

    res.status(HTTPStatus.CREATED).send({
        newStellarSystem,
    })
})

router.get("/", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);
    const allStellarSystems: StellarSystem[] = await repository.find();

    res.status(HTTPStatus.OK).send(allStellarSystems);
})

router.get("/:id", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);
    const requestedId: number = parseInt(req.params.id);

    try {
        const stellarSystem: StellarSystem = await repository.findOneBy({
            id: requestedId
        });

        if (stellarSystem === null) { throw Error(); };

        res.status(HTTPStatus.OK).send(stellarSystem);
    } catch (error) {
        res.status(HTTPStatus.NOT_FOUND).send({});
    }

})

router.put("/:id", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);
    const id: number = parseInt(req.params.id);
    const body = req.body;

    try {
        await repository.update({ id: id }, body);

        res.status(HTTPStatus.OK).send({
            "updated": true
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "updated": false
        })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);
    const id: number = parseInt(req.params.id);

    const stellarSystemObject = await repository.delete({ id: id });

    console.log(stellarSystemObject)

    res.status(HTTPStatus.OK).send({
        "deleted": true
    })
})


export default router;
