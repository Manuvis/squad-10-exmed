import express from 'express';
import {
    criarBeneficio,
    listarBeneficios,
    obterBeneficioPorID,
    atualizarBeneficioPorID,
    excluirBeneficioPorID,
    contratarBeneficio
} from '../../controllers/beneficioController';

const router = express.Router();


router.post('/beneficio', criarBeneficio);
router.get('/beneficios', listarBeneficios);
router.get('/beneficio/:id_beneficio', obterBeneficioPorID);
router.put('/beneficio/:id_beneficio', atualizarBeneficioPorID);
router.delete('/beneficio/:id_beneficio', excluirBeneficioPorID);
router.post('/contratar-beneficio', contratarBeneficio);


export default router;
