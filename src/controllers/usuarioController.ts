import { Request, Response } from 'express';
import knex from '../connection';
import { v4 as uuidv4 } from 'uuid';

const incrementarSaldoUsuarioIndicacao = async (codigoIndicacao: string) => {
    try {
        const indicacao = await knex('indicacao').where('codigo_indicacao_por_cpf', codigoIndicacao).first();
        if (!indicacao) {
            console.log('Código de indicação inválido.');
            return;
        }

        const cpfUsuarioIndicador = indicacao.cpf_usuario;

        await knex('usuario').where('cpf', cpfUsuarioIndicador).increment('saldo', 1);
        console.log('Saldo do usuário indicador incrementado com sucesso.');
    } catch (error) {
        console.error('Ocorreu um erro ao incrementar o saldo do usuário indicador:', error);
    }
};

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
            codigo_indicacao_origem,
        } = req.body;

        const codigoIndicacaoPorCpf = uuidv4();
        const userIdUsuario = uuidv4();

        let codigoIndicacaoDeOrigem = codigo_indicacao_origem;
        let saldoInicial = 0;


        if (codigo_indicacao_origem) {
            await incrementarSaldoUsuarioIndicacao(codigo_indicacao_origem);
            const indicacaoOrigem = await knex('indicacao').where('codigo_indicacao_por_cpf', codigo_indicacao_origem).first();
            if (indicacaoOrigem) {
                codigoIndicacaoDeOrigem = indicacaoOrigem.codigo_indicacao_por_cpf;
                saldoInicial += 5; 
            } else {
                return res.status(400).json({ message: 'Código de indicação de origem inválido.' });
            }
        }

        let servicoNomePlano = null;

        if (nome_plano) {
            const servico = await knex('servicos').where('id_servico', nome_plano).first();
            if (!servico) {
                return res.status(400).json({ message: 'Serviço não encontrado para o id_servico fornecido.' });
            }
            servicoNomePlano = servico.nome_plano;
            saldoInicial += 10; 
        }

        await knex.transaction(async (trx) => {
            await trx('usuario').insert({
                id_usuario: userIdUsuario,
                cpf,
                telefone,
                email,
                data_nascimento,
                nome_completo,
                nome_plano: servicoNomePlano,
                logradouro,
                numero,
                complemento,
                codigo_indicacao_origem: codigoIndicacaoDeOrigem,
                saldo: saldoInicial,
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

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await knex('usuario').select('*');
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao listar os usuários.');
    }
};

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


export const atualizarUsuarioPorID = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.params;
        const {
            telefone,
            email,
            nome_completo,
            logradouro,
            numero,
            complemento
        } = req.body;

        await knex('usuario').where('id_usuario', id_usuario).update({
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

export const atualizarPlanoUsuario = async (req: Request, res: Response) => {
    try {
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
