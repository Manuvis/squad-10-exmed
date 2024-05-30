import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const criarServico = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }

        const auth = new Authenticator();
        const tokenData = auth.getTokenData(token);

        if (tokenData.tipo !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        
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

        res.status(200).json({ message: 'Serviço criado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao criar o serviço.');
    }
};