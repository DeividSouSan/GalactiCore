import express from "express";
import { Request, Response } from "express";
import database from "../infra/database";
import { Repository } from "typeorm";
import { StellarSystem } from "../infra/entities/StellarSystems";
import HTTPStatus from "http-status-codes";
import {
    InvalidRequestBody,
    ResourceAlreadyExists,
    ResourceNotFound,
} from "../infra/errors";

const router = express.Router();

router.get(
    "/stellar-systems",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<StellarSystem> =
            database.getRepository(StellarSystem);

        try {
            const [stellarSystems, countStellarSystems]: [
                StellarSystem[],
                number,
            ] = await repository.findAndCount();

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Listando todos os stellar systems.",
                data: {
                    count_stellar_systems: countStellarSystems,
                    stellar_systems: stellarSystems,
                },
            });
        } catch (err) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                status: "error",
                message: "Erro ao processar a requisição.",
                data: {},
            });
        }
    },
);

router.get(
    "/stellar-systems/:id",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<StellarSystem> =
            database.getRepository(StellarSystem);

        try {
            const id: number = parseInt(req.params.id);
            const stellarSystem: StellarSystem = await repository.findOneBy({
                id: id,
            });

            if (!stellarSystem) {
                throw new ResourceNotFound(
                    "Stellar system com ID fornecido não foi encontrado.",
                );
            }

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Mostrando o stellar system com ID fornecido.",
                data: stellarSystem,
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
    "/stellar-systems",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<StellarSystem> =
            database.getRepository(StellarSystem);

        try {
            const { name, description, ...rest } = req.body;
            if (!name || !description || Object.keys(rest).length > 0) {
                throw new InvalidRequestBody(
                    "Corpo da requisição inválido. Stellar system deve conter somente 'name' e 'description'.",
                );
            }

            const alreadyExistsStellarSystem: boolean = Boolean(
                await repository.findOneBy({ name: name }),
            );
            if (alreadyExistsStellarSystem) {
                throw new ResourceAlreadyExists(
                    "Stellar system com o nome fornecido já existe no banco de dados.",
                );
            }

            const stellarSystem: StellarSystem[] = repository.create(req.body);
            await repository.save(stellarSystem);

            return res.status(HTTPStatus.CREATED).json({
                status: "success",
                message: "Stellar system criado com sucesso.",
                data: stellarSystem,
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

router.put(
    "/stellar-systems/:id",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<StellarSystem> =
            database.getRepository(StellarSystem);

        try {
            const id: number = parseInt(req.params.id);
            const stellarSystem: StellarSystem = await repository.findOneBy({
                id: id,
            });

            if (!stellarSystem) {
                throw new ResourceNotFound(
                    "Stellar system com ID fornecido não foi encontrado.",
                );
            }

            const { name, description, ...rest } = req.body;
            if ((!name && !description) || Object.keys(rest).length > 0) {
                // só precisa da 2ª parte, depois do ||
                throw new InvalidRequestBody(
                    "Corpo da requisição inválido. Stellar system deve conter somente 'name' e 'description'.",
                );
            }

            await repository.update({ id: id }, req.body);

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Stellar system específicado alterado com sucesso.",
                data: await repository.findOneByOrFail({ id: id }),
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

router.delete(
    "/stellar-systems/:id",
    async (req: Request, res: Response): Promise<any> => {
        const repository: Repository<StellarSystem> =
            database.getRepository(StellarSystem);

        try {
            const id: number = parseInt(req.params.id);
            const stellarSystem: StellarSystem = await repository.findOneBy({
                id: id,
            });
            if (!stellarSystem) {
                throw new ResourceNotFound(
                    "Stellar system com ID fornecido não existe.",
                );
            }

            await repository.delete({ id: id });

            return res.status(HTTPStatus.OK).json({
                status: "success",
                message: "Stellar system especificado deletado com sucesso.",
                data: {},
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

export default router;
