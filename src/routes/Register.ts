import express from "express";
import { Request, Response } from "express";
import database from "../infra/database";
import { Repository } from "typeorm";
import { User } from "../infra/entities/User";
import HTTPStatus from "http-status-codes";
import bcrypt from "bcrypt";

const router = express.Router();
const repository: Repository<User> = database.getRepository(User);

class ConflictError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
        this.statusCode = 409;
    }
}

router.post("/register", async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(HTTPStatus.BAD_REQUEST).send({
            status: "error",
            message: "Entrada inválida: nome, email e senha são necessários.",
            data: {},
        });
    }

    try {
        let user = await repository.findOneBy({
            username: username,
            email: email,
        });
        if (user) {
            if (user.email === email)
                throw new ConflictError("E-mail alredy in use");

            throw new ConflictError("Username already in use");
        }

        user = repository.create(req.body as User);
        user.password = await bcrypt.hash(user.password, 10);

        await repository.save(user);

        return res.status(HTTPStatus.CREATED).send({
            status: "success",
            message: "Usuário criado com sucesso.",
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        console.error("Error during user creation: ", error);

        if (error instanceof ConflictError) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: error.message,
                data: {},
            });
        }

        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: "Erro ao criar o usuário.",
            data: {},
        });
    }
});

export default router;
