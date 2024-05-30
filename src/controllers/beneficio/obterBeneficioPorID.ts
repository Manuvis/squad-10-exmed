import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const obterBeneficioPorID = async (req: Request, res: Response) => {
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
        
        const { id_beneficio } = req.params;
        const beneficio = await knex('beneficio').where('id_beneficio', id_beneficio).first();
        
        if (!beneficio) {
            return res.status(404).json({ message: 'Benefício não encontrado.' });
        }

        res.status(200).json(beneficio);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao obter o benefício.');
    }
};