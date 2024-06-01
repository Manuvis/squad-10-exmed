import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const excluirUsuarioPorID = async (req: Request, res: Response) => {
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
        
        const { id_usuario } = req.params;

        const usuarioExistente = await knex('usuario').where('id_usuario', id_usuario).first();
        if (!usuarioExistente) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await knex('indicacao').where('cpf_usuario', usuarioExistente.cpf).del();

        await knex('beneficios_contratados').where('id_usuario', usuarioExistente.id_usuario).del();

        await knex('usuario').where('id_usuario', id_usuario).del();

        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao excluir o usuário.');
    }
};
