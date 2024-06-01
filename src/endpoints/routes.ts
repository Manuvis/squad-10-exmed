import { Router } from 'express';

import { excluirUsuarioPorID } from "../controllers/usuário/excluirUsuarioPorID";
import { atualizarPlanoUsuario } from '../controllers/usuário/atualizarPlanoUsuario';
import { atualizarUsuarioPorID } from '../controllers/usuário/atualizarUsuarioPorID';
import { criarUsuario } from '../controllers/usuário/criarUsuario';
import { listarUsuarios } from '../controllers/usuário/listarUsuarios';
import { obterUsuarioPorID } from '../controllers/usuário/obterUsuarioPorID';
import { loginUsuario } from '../controllers/usuário/loginUsuario';
import { listarCuponsUsuario } from '../controllers/usuário/listarCuponsUsuario';

import { criarServico } from '../controllers/planos/criarServico';
import { atualizarServicoPorID } from '../controllers/planos/atualizarServicoPorID';
import { excluirServicoPorID } from "../controllers/planos/excluirServicoPorID";
import { listarServicos } from '../controllers/planos/listarServicos';

import { atualizarBeneficioPorID } from '../controllers/beneficio/atualizarBeneficioPorID';
import { contratarBeneficio } from '../controllers/beneficio/contratarBeneficio';
import { criarBeneficio } from '../controllers/beneficio/criarBeneficio';
import { excluirBeneficioPorID } from '../controllers/beneficio/excluirBeneficioPorID';
import { listarBeneficios } from '../controllers/beneficio/listarBeneficios';
import { obterBeneficioPorID } from '../controllers/beneficio/obterBeneficioPorID';

const router = Router();

//Usuario
router.post('/usuarios/signup', criarUsuario);
router.post('/usuarios/login', loginUsuario);  
router.get('/usuarios', listarUsuarios);
router.get('/usuarios/cupons', listarCuponsUsuario);
router.get('/usuarios/:id_usuario', obterUsuarioPorID);
router.put('/usuarios/atualizar', atualizarUsuarioPorID);
router.put('/usuario/:id_usuario/plano', atualizarPlanoUsuario);
router.delete('/usuarios/:id_usuario', excluirUsuarioPorID);

//Serviço
router.post('/servicos',criarServico);
router.get('/servicos', listarServicos);
router.put('/servicos/:id_servico', atualizarServicoPorID);
router.delete('/servicos/:id_servico', excluirServicoPorID);

//Benefícios
router.post('/beneficio',criarBeneficio);
router.get('/beneficio', listarBeneficios);
router.get('/beneficio/:id_beneficio', obterBeneficioPorID);
router.put('/beneficio/:id_beneficio', atualizarBeneficioPorID);
router.delete('/beneficio/:id_beneficio', excluirBeneficioPorID);
router.post('/contratar-beneficio', contratarBeneficio);

export { router };
