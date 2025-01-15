import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source';
import { Spaceship } from '../entity/Spaceships';
import { Repository } from 'typeorm';
import HTTPStatus from 'http-status-codes';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

    try {
        const spaceship = repository.create(req.body);
        await repository.save(spaceship);

        res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                spaceship
            }
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

router.get('/', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);

    try {
        const [spaceships, countSpaceships]: [Spaceship[], number] = await repository.findAndCount();

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                countSpaceships,
                spaceships
            }
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);

    try {
        const id: number = parseInt(req.params["id"]);
        const spaceship: Spaceship = await repository.findOneByOrFail({ id: id });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                spaceship
            }
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);

    try {
        const id: number = parseInt(req.params.id);
        await repository.update({ id: id }, req.body);

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": await repository.findOneByOrFail({ id: id })
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const repository = database.getRepository(Spaceship);

    try {
        const id: number = parseInt(req.params.id);
        const spaceship: Spaceship = await repository.findOneByOrFail({ id: id });
        await repository.delete({ id: id });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                spaceship
            }
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

export default router;
