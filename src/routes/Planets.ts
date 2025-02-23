import express from "express";
import { Request, Response } from "express";
import database from "../infra/database";
import { Planet } from "../infra/entities/Planets";
import { Repository } from "typeorm";
import HTTPStatus from "http-status-codes";
import {
    InvalidRequestBody,
    ResourceAlreadyExists,
    ResourceNotFound,
} from "../infra/errors";
import { StellarSystem } from "../infra/entities/StellarSystems";

const router = express.Router();

router.get("/planets/", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const [planets, countPlanets]: [Planet[], number] =
            await repository.findAndCount();

        res.status(HTTPStatus.OK).json({
            status: "success",
            message: "Listando todos os planetas.",
            data: {
                count_planets: countPlanets,
                planets: planets,
            },
        });
    } catch {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Erro ao processar a requisição",
            data: {},
        });
    }
});

router.get("/planets/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const id: number = parseInt(req.params.id);
        const planet: Planet = await repository.findOne({ where: { id: id } });

        if (!planet) {
            throw new ResourceNotFound(
                "Planeta com ID fornecido não foi encontrado.",
            );
        }
        res.status(HTTPStatus.OK).json({
            status: "success",
            message: "Mostrando o planeta com ID fornecido.",
            data: planet,
        });
    } catch (error) {
        res.status(
            error.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR,
        ).json({
            status: "error",
            message: error.message || "Erro ao processar a requisição",
            data: {
                planet: {},
            },
        });
    }
});

router.post("/planets", async (req: Request, res: Response) => {
    const planetRepository: Repository<Planet> = database.getRepository(Planet);
    const stellarSystemRepository: Repository<StellarSystem> =
        database.getRepository(StellarSystem);

    try {
        const { name, weather, terrain, population, stellarSystemId, ...rest } =
            req.body;

        if (
            !name ||
            !weather ||
            !terrain ||
            !population ||
            !stellarSystemId ||
            Object.keys(rest).length > 0
        ) {
            throw new InvalidRequestBody(
                "Corpo da requisição inválido. O planeta deve conter somente 'name', 'weather', 'terrain', 'population' e 'stellarSystemId'.",
            );
        }

        const planet = await planetRepository.findOneBy({ name: name });
        if (planet) {
            throw new ResourceAlreadyExists(
                "Planeta com o nome fornecido já existe no banco de dados.",
            );
        }

        const stellarSystem = await stellarSystemRepository.findOneBy({
            id: req.body.stellarSystemId,
        });
        if (!stellarSystem) {
            throw new ResourceNotFound(
                "Sistema de Estrelas como ID fornecido não existe.",
            );
        }

        const newPlanet = new Planet();

        newPlanet.name = req.body.name;
        newPlanet.weather = req.body.weather;
        newPlanet.terrain = req.body.terrain;
        newPlanet.population = req.body.population;
        newPlanet.stellarSystemId = req.body.stellarSystemId;

        await planetRepository.save(newPlanet);
        res.status(HTTPStatus.CREATED).json({
            status: "success",
            message: "Planeta criado com sucesso.",
            data: {
                planet: newPlanet,
            },
        });
    } catch (error) {
        res.status(
            error.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR,
        ).json({
            status: "error",
            message: error.message || "Erro ao processar a requisição.",
            data: {
                planet: {},
            },
        });
    }
});

router.put("/planets/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const id: number = parseInt(req.params.id);

        const planet: Planet = await repository.findOneBy({ id: id });
        if (!planet) {
            throw new ResourceNotFound("Planet com ID fornecido não foi encontrado.")
        }

        const { name, weather, terrain, population, stellarSystemId, ...rest } = req.body;
        if (Object.keys(rest).length > 0) {
            throw new InvalidRequestBody("Corpo da requisição inválido. planet deve conter somente 'name', 'weather', 'terrain', 'population' e 'stellarSystemId'.");
        }

        await repository.update({ id: id }, req.body);

        res.status(HTTPStatus.OK).send({
            "status": "success",
            "message": "Planet específicado alterado com sucesso.",
            "data": {
                "planet": await repository.findOneByOrFail({ id: id })
            }
        })
    } catch (error) {
        res.status(error.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "status": "error",
            "message": error.message || "Erro ao processar a requisição",
            "data": {}
        })
    }
});

router.delete("/planets/:id", async (req: Request, res: Response) => {
    const repository: Repository<Planet> = database.getRepository(Planet);

    try {
        const id: number = parseInt(req.params.id);
        const planet: Planet = await repository.findOneBy({ id: id });
        if (!planet) {
            throw new ResourceNotFound("Planet com ID fornecido não existe.");
        }

        await repository.delete({ id: id })

        res.status(HTTPStatus.OK).send({
            "status": "success",
            "message": "Planet especificado deletado com sucesso.",
            "data": {}
        })
    } catch (error) {
        res.status(error.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR).send({
            "status": "error",
            "message": error.message || "Erro ao processar a requisição",
            "data": {}
        })
    }
});

export default router;
