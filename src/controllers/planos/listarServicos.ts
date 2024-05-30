import { Request, Response } from 'express';
import knex from '../../connection';

export const listarServicos = async (req: Request, res: Response) => {
    try {
        const servicos = await knex('servicos').select('*');
        res.status(200).json(servicos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os serviços.');
    }
};