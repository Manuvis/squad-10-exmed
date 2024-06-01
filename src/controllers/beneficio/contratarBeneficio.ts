import { Request, Response } from 'express';
import knex from '../../connection';
import { v4 as uuidv4 } from 'uuid';
import { Authenticator } from '../../services/midleware/Authenticator';

const gerarCodigoCupom = () => {
    return uuidv4();
};

export const contratarBeneficio = async (req: Request, res: Response) => {
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

        const { id_beneficio } = req.body;

        const usuario = await knex('usuario').where('id_usuario', idUsuarioLogado).first();
        if (!usuario) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const beneficio = await knex('beneficio').where('id_beneficio', id_beneficio).first();
        if (!beneficio) {
            return res.status(404).json({ message: 'Benefício não encontrado.' });
        }

        if (usuario.saldo < beneficio.valor_beneficio) {
            return res.status(406).json({ message: 'Saldo insuficiente.' });
        }

        let codigo_cupon;
        
        await knex.transaction(async (trx) => {
            const [id_contratacao] = await trx('beneficios_contratados').insert({
                id_usuario: idUsuarioLogado,
                id_beneficio,
                valor_contratacao: beneficio.valor_beneficio
            }).returning('id_contratacao');

            codigo_cupon = gerarCodigoCupom();
            const validade = new Date();
            validade.setMonth(validade.getMonth() + 6); 

            await trx('cupons_gerados').insert({
                id_contratacao,
                codigo_cupon,
                validade
            });

            await trx('usuario').where('id_usuario', idUsuarioLogado).update({
                saldo: usuario.saldo - beneficio.valor_beneficio
            });
        });

        res.status(200).json({ message: 'Benefício contratado e cupom gerado com sucesso.', codigo_cupon });
    } catch (error) {
        console.error('Ocorreu um erro ao contratar o benefício e gerar o cupom:', error);
        res.status(500).send('Ocorreu um erro inesperado ao contratar o benefício.');
    }
};