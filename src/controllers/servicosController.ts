import { Request, Response } from 'express';
import knex from '../connection';


//Criar Serviço
export const criarServico = async (req: Request, res: Response) => {
    try {
        const { nome_plano, descricao, valor_do_servico } = req.body;

        const servicoExistente = await knex('servicos').where('nome_plano', nome_plano).first();
        if (servicoExistente) {
            return res.status(400).json({ message: 'Já existe um serviço cadastrado com esse nome.' });
        }

        await knex('servicos').insert({
            nome_plano,
            descricao,
            valor_do_servico
        });

        res.status(201).json({ message: 'Serviço criado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao criar o serviço.');
    }
};


//Editar Serviço
//Apagar Serviço
