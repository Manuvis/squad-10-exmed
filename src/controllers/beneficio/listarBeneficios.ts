import { Request, Response } from 'express';
import knex from '../../connection';


export const listarBeneficios = async (req: Request, res: Response) => {
    try {
        const beneficios = await knex('beneficio').select('*');
        res.status(200).json(beneficios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os benefícios.');
    }
};