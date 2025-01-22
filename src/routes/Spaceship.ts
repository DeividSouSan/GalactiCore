import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/database';
import { Spaceship } from '../entity/Spaceships';
import { Repository } from 'typeorm';
import HTTPStatus from 'http-status-codes';

const router = express.Router();

class SpaceshipAleradyExists extends Error {
    public httpStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.httpStatusCode = 406;
    }
}

class InvalidRequestBody extends Error {
    public httpStatusCode: number;

    constructor(message = "", ...args: []) {
        super(message, ...args);
        this.message = message;
        this.httpStatusCode = 400;
    }
}

router.post('/', async (req: Request, res: Response): Promise<any> => {
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

    try {
        const { model, manufacturer, capacity } = req.body;
        const spaceshipAlreadyExists: boolean = Boolean(await repository.findOneBy({ model: model }))

        if (!model || !manufacturer || !capacity) {
            throw new InvalidRequestBody("Corpo da requisição inválido. Nave deve conter: 'model', 'manufacturer' e 'capacity'.");
        }

        if (spaceshipAlreadyExists) {
            throw new SpaceshipAleradyExists('Nave do modelo fornecido já existe no banco de dados.')
        }

        const spaceship = repository.create(req.body);
        await repository.save(spaceship);

        return res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                spaceship
            }
        })
    } catch (err) {
        return res.status(err.httpStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": err.message || 'Houve um erro ao processar a requisição',
            "data": {}
        })
    }
})

router.get('/', async (req: Request, res: Response) => {
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

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
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

    try {
        const id: number = parseInt(req.params.id);
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
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

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
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

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
