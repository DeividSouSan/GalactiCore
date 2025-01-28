import express from 'express';
import { Request, Response } from 'express';
import database from '../infra/database'
import { Repository } from 'typeorm';
import { Character } from '../infra/entities/Characters';
import HTTPStatus from 'http-status-codes';

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    const repository: Repository<Character> = database.getRepository(Character);

    try {
        const character = repository.create(req.body);
        await repository.save(character);

        res.status(HTTPStatus.CREATED).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                character
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
    const repository: Repository<Character> = database.getRepository(Character);

    try {
        const [characters, countCharacters]: [Character[], number] = await repository.findAndCount();

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                countCharacters,
                characters
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
    const repository: Repository<Character> = database.getRepository(Character);

    try {
        const id: number = parseInt(req.params.id);
        const character: Character = await repository.findOneByOrFail({ id: id });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                character
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
    const repository: Repository<Character> = database.getRepository(Character);

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
    const repository: Repository<Character> = database.getRepository(Character);

    try {
        const id: number = parseInt(req.params.id);
        const character: Character = await repository.findOneByOrFail({ id: id });
        await repository.delete({ id: id });

        res.status(HTTPStatus.OK).json({
            "status": "success",
            "message": "Requisição processada com sucesso",
            "data": {
                character
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
