import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const listarCuponsUsuario = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido ou malformado' });
        }

        const auth = new Authenticator();
        let tokenData;
        try {
            tokenData = auth.getTokenData(token);
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        if (tokenData.tipo !== 'usuario') {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        const idUsuarioLogado = tokenData.id_usuario;

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
