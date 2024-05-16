import express, { Express } from 'express'
import cors from 'cors'
import { criarUsuario, listarUsuarios, atualizarUsuarioPorID, excluirUsuarioPorID, obterUsuarioPorID } from './controllers/usuarioController';
import {  criarServico, listarServicos, atualizarServicoPorID, excluirServicoPorID } from './controllers/servicosController';

const app: Express = express();

app.use(express.json());
app.use(cors());


app.post('/usuario', criarUsuario);
app.get('/usuarios', listarUsuarios);
app.get('/usuario/:id_usuario', obterUsuarioPorID); 
app.put('/usuario/:id_usuario', atualizarUsuarioPorID);
app.delete('/usuario/:id_usuario', excluirUsuarioPorID);
app.post('/servicos', criarServico);
app.get('/servicos', listarServicos);
app.put('/servicos/:id_servico', atualizarServicoPorID);
app.delete('/servicos/:id_servico', excluirServicoPorID);

app.listen(3003, () => {
    console.log("Server is running  in http://localhost:3003")
})
