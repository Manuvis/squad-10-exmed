import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const excluirUsuarioPorID = async (req: Request, res: Response) => {
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
        const idUsuarioLogado = tokenData.id_usuario 

        const usuarioExistente = await knex('usuario').where('id_usuario', idUsuarioLogado).first();
        if (!usuarioExistente) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await knex('indicacao').where('cpf_usuario', usuarioExistente.cpf).del();

        await knex('beneficios_contratados').where('id_usuario', usuarioExistente.id_usuario).del();

        await knex('usuario').where('id_usuario', idUsuarioLogado).del();

        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao excluir o usuário.');
    }
};
