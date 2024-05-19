import express from 'express';
import { criarUsuario, listarUsuarios, atualizarUsuarioPorID, atualizarPlanoUsuario, excluirUsuarioPorID, obterUsuarioPorID } from '../../controllers/usuarioController';

const router = express.Router();

router.post('/usuario', criarUsuario);

router.get('/usuarios', listarUsuarios);

router.get('/usuario/:id_usuario', obterUsuarioPorID);

router.put('/usuario/:id_usuario', atualizarUsuarioPorID);

router.put('/usuario/:id_usuario/plano',atualizarPlanoUsuario);

router.delete('/usuario/:id_usuario', excluirUsuarioPorID);


export default router;
