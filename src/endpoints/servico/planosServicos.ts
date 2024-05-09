import express from 'express';
import {
    criarServico
} from '../../controllers/servicosController';

const router = express.Router();

router.post('/servico', criarServico);


export default router;
