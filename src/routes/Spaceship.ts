import express from "express";
import { Request, Response } from "express";
import database from "../infra/database";
import { Spaceship } from "../infra/entities/Spaceships";
import { Repository } from "typeorm";
import HTTPStatus from "http-status-codes";
import {
    ResourceNotFound,
    InvalidRequestBody,
    ResourceAlreadyExists,
} from "../infra/errors";

const router = express.Router();

router.get("/spaceships", async (req: Request, res: Response): Promise<any> => {
    const repository: Repository<Spaceship> = database.getRepository(Spaceship);

    try {
        const [spaceships, countSpaceships]: [Spaceship[], number] =
            await repository.findAndCount();

        res.status(HTTPStatus.OK).json({
            status: "success",
            message: "Listando todas as spaceships.",
            data: {
                countSpaceships,
                spaceships,
            },
        });
    } catch (err) {
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Erro ao processar a requisição.",
            data: {},
        });
    }
});

router.get(
    "/spaceships/:id",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<Spaceship> =
            database.getRepository(Spaceship);

        try {
            const id: number = parseInt(req.params.id);
            const spaceship: Spaceship = await repository.findOneBy({ id: id });

            if (!spaceship) {
                throw new ResourceNotFound(
                    "Spaceship com ID fornecido não foi encontrada.",
                );
            }

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Mostrando a spaceship com ID fornecido.",
                data: {
                    spaceship,
                },
            });
        } catch (err) {
            return res
                .status(err.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR)
                .json({
                    status: "error",
                    message: err.message || "Erro ao processar a requisição",
                    data: {},
                });
        }
    },
);

router.post(
    "/spaceships",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<Spaceship> =
            database.getRepository(Spaceship);

        try {
            const { model, manufacturer, capacity } = req.body;
            const spaceshipAlreadyExists: boolean = Boolean(
                await repository.findOneBy({ model: model }),
            );

            if (!model || !manufacturer || !capacity) {
                throw new InvalidRequestBody(
                    "Corpo da requisição inválido. Spaceship deve conter: 'model', 'manufacturer' e 'capacity'.",
                );
            }

            if (spaceshipAlreadyExists) {
                throw new ResourceAlreadyExists(
                    "Spaceship do modelo fornecido já existe no banco de dados.",
                );
            }

            const spaceship = repository.create(req.body);
            await repository.save(spaceship);

            return res.status(HTTPStatus.CREATED).json({
                status: "success",
                message: "Spaceship criada com sucesso.",
                data: {
                    spaceship,
                },
            });
        } catch (err) {
            return res
                .status(err.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR)
                .json({
                    status: "error",
                    message:
                        err.message ||
                        "Houve um erro ao processar a requisição",
                    data: {},
                });
        }
    },
);

router.put(
    "/spaceships/:id",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<Spaceship> =
            database.getRepository(Spaceship);

        try {
            const id: number = parseInt(req.params.id);
            await repository.update({ id: id }, req.body);

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Spaceship específicada alterada com sucesso.",
                data: await repository.findOneByOrFail({ id: id }),
            });
        } catch {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                status: "error",
                message: "Erro ao processar a requisição.",
                data: {},
            });
        }
    },
);

router.delete(
    "/spaceships/:id",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<Spaceship> =
            database.getRepository(Spaceship);

        try {
            const id: number = parseInt(req.params.id);
            const spaceship: Spaceship = await repository.findOneBy({ id: id });

            if (!spaceship) {
                throw new ResourceNotFound(
                    "Spaceship com ID fornecido não existe.",
                );
            }

            await repository.delete({ id: id });

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Spaceship deletada com sucesso.",
                data: {},
            });
        } catch (err) {
            return res
                .status(err.HTTPStatusCode || HTTPStatus.INTERNAL_SERVER_ERROR)
                .json({
                    status: "error",
                    message:
                        err.message ||
                        "Houve um erro ao processar a requisição.",
                    data: {},
                });
        }
    },
);

export default router;
