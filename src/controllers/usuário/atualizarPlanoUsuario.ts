import { Request, Response } from 'express';
import knex from '../../connection';
import { Authenticator } from '../../services/midleware/Authenticator';

export const atualizarPlanoUsuario = async (req: Request, res: Response) => {
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
    
        const { id_usuario } = req.params;
        const { id_servico } = req.body;

        const servico = await knex('servicos').where('id_servico', id_servico).first();
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado para o id_servico fornecido.' });
        }

        const usuario = await knex('usuario').where('id_usuario', id_usuario).first();
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (usuario.nome_plano === null) {
            await knex('usuario').where('id_usuario', id_usuario).update({
                nome_plano: servico.nome_plano,
                saldo: knex.raw('saldo + 10') 
            });
        } else {
            await knex('usuario').where('id_usuario', id_usuario).update({
                nome_plano: servico.nome_plano
            });
        }

        res.status(200).json({ message: 'Plano do usuário atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao atualizar o plano do usuário.');
    }
};