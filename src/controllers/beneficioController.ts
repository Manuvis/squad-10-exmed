import { Request, Response } from 'express';
import knex from '../connection';
import { v4 as uuidv4 } from 'uuid';

// Criar Benefício
export const criarBeneficio = async (req: Request, res: Response) => {
    try {
        const { id_usuario, valor_beneficio, nome_beneficio } = req.body;

        await knex('beneficio').insert({
            id_usuario,
            valor_beneficio,
            nome_beneficio
        });

        res.status(201).json({ message: 'Benefício criado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao criar o benefício.');
    }
};

// Listar Benefícios
export const listarBeneficios = async (req: Request, res: Response) => {
    try {
        const beneficios = await knex('beneficio').select('*');
        res.status(200).json(beneficios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os benefícios.');
    }
};

// Obter Benefício por ID
export const obterBeneficioPorID = async (req: Request, res: Response) => {
    try {
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

// Atualizar Benefício por ID
export const atualizarBeneficioPorID = async (req: Request, res: Response) => {
    try {
        const { id_beneficio } = req.params;
        const { id_usuario, valor_beneficio, nome_beneficio } = req.body;

        await knex('beneficio').where('id_beneficio', id_beneficio).update({
            id_usuario,
            valor_beneficio,
            nome_beneficio
        });

        res.status(200).json({ message: 'Benefício atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao atualizar o benefício.');
    }
};

const gerarCodigoCupom = () => {
    return uuidv4();
};

// Função para contratar um benefício e gerar cupons
export const contratarBeneficio = async (req: Request, res: Response) => {
    try {
        const { id_usuario, id_beneficio } = req.body;

        const usuario = await knex('usuario').where('id_usuario', id_usuario).first();
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const beneficio = await knex('beneficio').where('id_beneficio', id_beneficio).first();
        if (!beneficio) {
            return res.status(404).json({ message: 'Benefício não encontrado.' });
        }

        if (usuario.saldo < beneficio.valor_beneficio) {
            return res.status(400).json({ message: 'Saldo insuficiente.' });
        }

        let codigo_cupon;
        
        await knex.transaction(async (trx) => {
            const [id_contratacao] = await trx('beneficios_contratados').insert({
                id_usuario,
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

            await trx('usuario').where('id_usuario', id_usuario).update({
                saldo: usuario.saldo - beneficio.valor_beneficio
            });
        });

        res.status(201).json({ message: 'Benefício contratado e cupom gerado com sucesso.', codigo_cupon });
    } catch (error) {
        console.error('Ocorreu um erro ao contratar o benefício e gerar o cupom:', error);
        res.status(500).send('Ocorreu um erro inesperado ao contratar o benefício.');
    }
};



// Excluir Benefício por ID
export const excluirBeneficioPorID = async (req: Request, res: Response) => {
    try {
        const { id_beneficio } = req.params;

        await knex('beneficio').where('id_beneficio', id_beneficio).del();

        res.status(200).json({ message: 'Benefício excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao excluir o benefício.');
    }
};
