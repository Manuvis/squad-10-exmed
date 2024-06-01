import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const excluirServicoPorID = async (req: Request, res: Response) => {
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
