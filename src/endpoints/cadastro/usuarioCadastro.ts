import express from 'express';
import {
    criarUsuario,
    listarUsuarios,
    obterUsuarioPorCPF,
    atualizarUsuarioPorCPF,
    excluirUsuarioPorCPF
} from '../../controllers/usuarioController';

const router = express.Router();

router.post('/usuario', criarUsuario);

router.get('/usuarios', listarUsuarios);

router.get('/usuario/:cpf', obterUsuarioPorCPF);

router.put('/usuario/:cpf', atualizarUsuarioPorCPF);

router.delete('/usuario/:cpf', excluirUsuarioPorCPF);

export default router;
