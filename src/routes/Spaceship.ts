import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source';
import { Spaceship } from '../entity/Spaceships';
import { Repository } from 'typeorm';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);
    const spaceship = repository.create(req.body)

    repository.save(spaceship);

    res.send({
        result: "Created"
    })
})

router.get('/', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);
    const spaceships = await repository.find();

    res.send({
        result: spaceships
    })
})

router.get('/:id', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);
    const spaceship = await repository.findOneBy({
        id: parseInt(req.params["id"])
    })

    res.send({
        result: spaceship
    })
})

router.put('/:id', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);
    const spaceship = await repository.findOneBy({
        id: parseInt(req.params["id"])
    })

    if (req.body["model"]) {
        spaceship.model = req.body["model"]
    }

    if (req.body["manufacturer"]) {
        spaceship.manufacturer = req.body["manufacturer"]
    }

    if (req.body["capacity"]) {
        spaceship.capacity = req.body.capacity
    }

    repository.save(spaceship);

    res.send({
        result: spaceship
    })
})

router.delete('/:id', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);

    await repository.delete(parseInt(req.params["id"]))

    res.send({
        result: "Success"
    })
})

export default router;
