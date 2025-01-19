import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/database';
import { Planet } from '../entity/Planets';
import { Repository, EntityNotFoundError } from 'typeorm';
import HTTPStatus from 'http-status-codes';

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const planet = repository.create(req.body);
        await repository.save(planet);

        res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                planet
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

router.get("/", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const [planets, countPlanets]: [Planet[], number] = await repository.findAndCount({
            relations: ["stellarSystem"]
        });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                countPlanets,
                planets
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

router.get("/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const id: number = parseInt(req.params.id);
        const planet: Planet = await repository.findOneByOrFail({ id: id })

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                planet
            }
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {
                planet: {}
            }
        })
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const id: number = parseInt(req.params.id);
        await repository.update({ id: id }, req.body);

        res.status(HTTPStatus.OK).send({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": await repository.findOneByOrFail({ id: id })
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const id: number = parseInt(req.params.id);
        const planet: Planet = await repository.findOneByOrFail({ id: id });
        await repository.delete({ id: id })

        res.status(HTTPStatus.OK).send({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                planet
            }
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "status": "error",
            "message": "Erro ao processar a requisição",
            "data": {}
        })
    }
})

export default router;
