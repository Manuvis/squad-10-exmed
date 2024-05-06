import { Request, Response } from 'express';
import knex from '../connection';

// Criar Usuário
export const criarUsuario = async (req: Request, res: Response) => {
    try {
        const {
            cpf,
            telefone,
            email,
            data_nascimento,
            nome_completo,
            logradouro,
            numero,
            complemento
        } = req.body;

        await knex('usuario').insert({
            cpf,
            telefone,
            email,
            data_nascimento,
            nome_completo,
            logradouro,
            numero,
            complemento
        });

        res.status(201).send('Usuário criado com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao criar o usuário.');
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

// Obter Usuário por CPF
export const obterUsuarioPorCPF = async (req: Request, res: Response) => {
    try {
        const { cpf } = req.params;
        const usuario = await knex('usuario').where('cpf', cpf).first();
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

// Atualizar Usuário por CPF
export const atualizarUsuarioPorCPF = async (req: Request, res: Response) => {
    try {
        const { cpf } = req.params;
        const {
            telefone,
            email,
            nome_completo,
            nome_plano,
            logradouro,
            numero,
            complemento
        } = req.body;

        await knex('usuario').where('cpf', cpf).update({
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

// Excluir Usuário por CPF
export const excluirUsuarioPorCPF = async (req: Request, res: Response) => {
    try {
        const { cpf } = req.params;
        await knex('usuario').where('cpf', cpf).delete();
        res.status(200).send('Usuário excluído com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao excluir o usuário.');
    }
};
