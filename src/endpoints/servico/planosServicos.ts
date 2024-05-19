import express from 'express';
import {
    criarServico,
    listarServicos,
    atualizarServicoPorID,
    excluirServicoPorID
} from '../../controllers/servicosController';

const router = express.Router();


router.post('/servicos', criarServico);
router.get('/servicos', listarServicos);
router.put('/servicos/:id_servico', atualizarServicoPorID);
router.delete('/servicos/:id_servico', excluirServicoPorID);

export default router;
