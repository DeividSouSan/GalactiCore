import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source';
import { Planet } from '../entity/Planets';
import { Repository, EntityNotFoundError } from 'typeorm';
import HTTPStatus from 'http-status-codes';

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const newPlanet = repository.create(req.body);

        await repository.save(newPlanet);

        res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                newPlanet
            }
        })
    } catch (err) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            "status": "fail",
            "message": "Um erro correu durante a criação da entidade",
            "data": {}
        })
    }
})


router.get("/", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    const [planets, countPlanets] = await repository.findAndCount({
        relations: ["stellarSystem"]
    });

    res.status(HTTPStatus.OK).json({
        "status": "success",
        "message": "Requisição processada com sucesso",
        "data": {
            countPlanets,
            planets,
        }
    })
})

router.get("/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);
    const id: number = parseInt(req.params.id);

    try {

        const planet: Planet = await repository.findOneByOrFail({
            id: id
        })

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                planet
            }
        })
    } catch (EntityNotFoundError) {
        res.status(HTTPStatus.NOT_FOUND).json({
            "status": "error",
            "message": "Requisição processada com sucesso, mas a entidade não foi encontrada",
            "data": {
                planet: {}
            }
        })
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);
    const id: number = parseInt(req.params.id);

    try {
        await repository.update({ id: id }, req.body);

        res.status(HTTPStatus.OK).send({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": await repository.findOneByOrFail({ id: id })
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "status": "error",
            "message": "Algum erro ocorreu",
            "data": {}
        })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);
    const id: number = parseInt(req.params.id);

    try {
        await repository.findOneByOrFail({ id: id })

        await repository.delete({ id: id })

        res.status(HTTPStatus.OK).send({
            "status": "success",
            "message": "Entidade deletada com sucesso",
            "data": {}
        })
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "status": "error",
            "message": "Entidade não existe no banco de dados",
            "data": {}
        })
    }
})

export default router;
