import { Request, Response } from 'express';
import knex from '../connection';
import { v4 as uuidv4 } from 'uuid';

// Criar Usuário
export const criarUsuario = async (req: Request, res: Response) => {
    try {
        const {
            cpf,
            telefone,
            email,
            data_nascimento, 
            nome_completo,
            nome_plano,
            logradouro,
            numero,
            complemento,
            codigo_indicacao_origem 
        } = req.body;

        const codigoIndicacaoPorCpf = uuidv4();
        const userIdUsuario = uuidv4(); 


        let codigoIndicacaoDeOrigem = codigo_indicacao_origem;
        if (codigo_indicacao_origem) {
            const indicacaoOrigem = await knex('indicacao').where('codigo_indicacao_por_cpf', codigo_indicacao_origem).first();
            if (indicacaoOrigem) {
                codigoIndicacaoDeOrigem = indicacaoOrigem.codigo_indicacao_por_cpf;
            } else {
                return res.status(400).json({ message: 'Código de indicação de origem inválido.' });
            }
        }

        await knex.transaction(async (trx) => {
            await trx('usuario').insert({
                id_usuario: userIdUsuario,
                cpf,
                telefone,
                email,
                data_nascimento, 
                nome_completo,
                nome_plano,
                logradouro,
                numero,
                complemento,
                codigo_indicacao_origem: codigoIndicacaoDeOrigem
            });

            await trx('indicacao').insert({
                codigo_indicacao_por_cpf: codigoIndicacaoPorCpf,
                cpf_usuario: cpf
            });
        });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso.', codigoIndicacaoPorCpf });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao cadastrar o usuário.');
    }
};

// Listar Usuários
export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await knex('usuario').select('*');
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os usuários.');
    }
};

// Obter Usuário por ID
export const obterUsuarioPorID = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.params;
        const usuario = await knex('usuario').where('id_usuario', id_usuario).first();
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao obter o usuário.');
    }
};

// Atualizar Usuário por ID
export const atualizarUsuarioPorID = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.params;
        const {
            telefone,
            email,
            nome_completo,
            nome_plano,
            logradouro,
            numero,
            complemento
        } = req.body;

        await knex('usuario').where('id_usuario', id_usuario).update({
            telefone,
            email,
            nome_completo,
            nome_plano,
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

// Excluir Usuário por ID
export const excluirUsuarioPorID = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.params;

        const usuarioExistente = await knex('usuario').where('id_usuario', id_usuario).first();
        if (!usuarioExistente) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await knex('indicacao').where('cpf_usuario', usuarioExistente.cpf).del();

        await knex('usuario').where('id_usuario', id_usuario).del();

        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao excluir o usuário.');
    }
};
