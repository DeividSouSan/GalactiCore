import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/data-source';
import { Planet } from '../entity/Planets';
import { Repository, EntityNotFoundError } from 'typeorm';
import HTTPStatus from 'http-status-codes';

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);


    const newPlanet = repository.create(req.body);

    repository.save(newPlanet);

    res.status(HTTPStatus.CREATED).json({
        "status": "success",
        "message": "Requisição processada com sucesso",
        "data": {
            newPlanet
        }
    })
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
            "status": "not found",
            "message": "Requisição processada com sucesso, mas a entidade não foi encontrada",
            "data": {
                planet: {}
            }
        })
    }
})


export default router;
