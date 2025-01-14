import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source';
import { Spaceship } from '../entity/Spaceships';
import { Repository } from 'typeorm';
import HTTPStatus from 'http-status-codes';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

    try {
        const spaceship = repository.create(req.body)
        repository.save(spaceship);

        res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                spaceship
            }
        })
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Ocorreu um erro ao processar a requisição",
            "data": {}
        })
    }



})

router.get('/', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);
    const [spaceships, countSpaceships] = await repository.findAndCount();

    try {
        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                countSpaceships,
                spaceships
            }
        })
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Ocorreu um erro ao processar a requisição",
            "data": {}
        })
    }
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
