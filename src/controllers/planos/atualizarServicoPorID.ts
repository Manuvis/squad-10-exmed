import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const atualizarServicoPorID = async (req: Request, res: Response) => {
    try {
        const authHeader  = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }

        const token = authHeader.split(' ')[1];

        const auth = new Authenticator();
        const tokenData = auth.getTokenData(token);

        if (tokenData.tipo !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado' });
        }
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
