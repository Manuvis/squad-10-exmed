import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const listarCuponsUsuario = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }

        const auth = new Authenticator();
        const tokenData = auth.getTokenData(token);

        if (tokenData.tipo !== 'usuario') {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        const idUsuarioLogado = tokenData.id_usuario

        const cupons = await knex('cupons_gerados')
            .join('beneficios_contratados', 'cupons_gerados.id_contratacao', '=', 'beneficios_contratados.id_contratacao')
            .where('beneficios_contratados.id_usuario', idUsuarioLogado)
            .select('cupons_gerados.id_contratacao', 'cupons_gerados.codigo_cupon', 'cupons_gerados.validade');

        res.status(200).json(cupons);
    } catch (error) {
        console.error('Erro ao listar os cupons do usuário:', error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os cupons do usuário.');
    }
};
