import express from 'express';
import {
    criarUsuario,
    listarUsuarios,
    obterUsuarioPorCPF,
    atualizarUsuarioPorCPF,
    excluirUsuarioPorCPF
} from '../../controllers/usuarioController';

const router = express.Router();

// Endpoint para criar um novo usuário
router.post('/usuario', criarUsuario);

// Endpoint para listar todos os usuários
router.get('/usuarios', listarUsuarios);

// Endpoint para obter um usuário pelo CPF
router.get('/usuario/:cpf', obterUsuarioPorCPF);

// Endpoint para atualizar um usuário pelo CPF
router.put('/usuario/:cpf', atualizarUsuarioPorCPF);

// Endpoint para excluir um usuário pelo CPF
router.delete('/usuario/:cpf', excluirUsuarioPorCPF);

export default router;
