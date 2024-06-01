import { Request, Response } from 'express';
import knex from '../../connection';
import { v4 as uuidv4 } from 'uuid';
import { Authenticator, HashManager } from '../../services/midleware/Authenticator';

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
            senha,
            tipo 
        } = req.body;

        const codigoIndicacaoPorCpf = uuidv4();
        const userIdUsuario = uuidv4();

        let codigoIndicacaoDeOrigem = codigo_indicacao_origem;
        let saldoInicial = 0;

        const cypherPassword = new HashManager();
        const senhaHash = await cypherPassword.hash(senha);

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
                senha: senhaHash,
                tipo 
            });

            await trx('indicacao').insert({
                codigo_indicacao_por_cpf: codigoIndicacaoPorCpf,
                cpf_usuario: cpf
            });
        });

        const auth = new Authenticator();
        const token = auth.generateToken({ id_usuario: userIdUsuario, tipo }); 

        res.status(201).json({ message: 'Usuário cadastrado com sucesso.', codigoIndicacaoPorCpf, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro inesperado ao cadastrar o usuário.');
    }
};
