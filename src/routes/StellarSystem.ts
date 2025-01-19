import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/database'
import { Repository } from 'typeorm';
import { StellarSystem } from '../entity/StellarSystems';
import HTTPStatus from 'http-status-codes';

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

    try {
        const stellarSystem = repository.create(req.body);
        await repository.save(stellarSystem);

        res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                stellarSystem
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
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

    try {
        const [stellarSystems, countStellarSystems]: [StellarSystem[], number] = await repository.findAndCount();

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                countStellarSystems,
                stellarSystems
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
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

    try {
        const id: number = parseInt(req.params.id);
        const stellarSystem: StellarSystem = await repository.findOneByOrFail({ id: id });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                stellarSystem
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

router.put("/:id", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

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

router.delete("/:id", async (req: Request, res: Response) => {
    const repository: Repository<StellarSystem> = database.getRepository(StellarSystem);

    try {
        const id: number = parseInt(req.params.id);
        const stellarSystem: StellarSystem = await repository.findOneByOrFail({ id: id });
        await repository.delete({ id: id });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                stellarSystem
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
