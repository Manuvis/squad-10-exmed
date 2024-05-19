import { Request, Response } from 'express';
import knex from '../connection';

// Criar Serviço
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

// Listar Serviços
export const listarServicos = async (req: Request, res: Response) => {
    try {
        const servicos = await knex('servicos').select('*');
        res.status(200).json(servicos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os serviços.');
    }
};

// Atualizar Serviço 
export const atualizarServicoPorID = async (req: Request, res: Response) => {
    try {
        const { id_servico } = req.params;
        const { nome_plano, descricao, valor_do_servico } = req.body;

        await knex('servicos').where('id_servico', id_servico).update({
            nome_plano,
            descricao,
            valor_do_servico
        });

        res.status(200).send('Serviço atualizado com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar o serviço:', error);
        res.status(500).send('Ocorreu um erro inesperado ao atualizar o serviço.');
    }
};


// Excluir Serviço 
export const excluirServicoPorID = async (req: Request, res: Response) => {
    try {
        const { id_servico } = req.params;

        const servicoExistente = await knex('servicos').where('id_servico', id_servico).first();
        if (!servicoExistente) {
            return res.status(404).json({ message: 'Serviço não encontrado.' });
        }

        await knex('servicos').where('id_servico', id_servico).del();

        res.status(200).json({ message: 'Serviço excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao excluir o serviço.');
    }
};
