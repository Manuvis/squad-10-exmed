import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const atualizarUsuarioPorID = async (req: Request, res: Response) => {
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
        
        const {
            telefone,
            email,
            nome_completo,
            logradouro,
            numero,
            complemento
        } = req.body;

        await knex('usuario').where('id_usuario', idUsuarioLogado).update({
            telefone,
            email,
            nome_completo,
            logradouro,
            numero,
            complemento
        });

        res.status(200).send('Usuário atualizado com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao atualizar o usuário.');
    }
};