import { Router } from 'express';
import { criarUsuario, listarUsuarios, atualizarUsuarioPorID, atualizarPlanoUsuario, excluirUsuarioPorID, obterUsuarioPorID } from "../controllers/usuarioController";
import { criarServico, listarServicos,atualizarServicoPorID, excluirServicoPorID } from "../controllers/servicosController";
import { criarBeneficio, listarBeneficios, obterBeneficioPorID, atualizarBeneficioPorID, excluirBeneficioPorID, contratarBeneficio } from "../controllers/beneficioController";

const router = Router();

//Usuario
router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id_usuario', obterUsuarioPorID);
router.put('/usuarios/:id_usuario', atualizarUsuarioPorID);
router.put('/usuario/:id_usuario/plano',atualizarPlanoUsuario);
router.delete('/usuarios/:id_usuario', excluirUsuarioPorID);

//Serviço
router.post('/servicos', criarServico);
router.get('/servicos', listarServicos);
router.put('/servicos/:id_servico', atualizarServicoPorID);
router.delete('/servicos/:id_servico', excluirServicoPorID);

//Benefícios
router.post('/beneficio', criarBeneficio);
router.get('/beneficio', listarBeneficios);
router.get('/beneficio/:id_beneficio', obterBeneficioPorID);
router.put('/beneficio/:id_beneficio', atualizarBeneficioPorID);
router.delete('/beneficio/:id_beneficio', excluirBeneficioPorID);
router.post('/contratar-beneficio', contratarBeneficio);

export { router };
