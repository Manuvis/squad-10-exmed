import express, { Express } from 'express'
import cors from 'cors'
import { criarUsuario, listarUsuarios, atualizarUsuarioPorID, atualizarPlanoUsuario, excluirUsuarioPorID, obterUsuarioPorID } from './controllers/usuarioController';
import {  criarServico, listarServicos, atualizarServicoPorID, excluirServicoPorID } from './controllers/servicosController';

const app: Express = express();

app.use(express.json());
app.use(cors());

//Usuario
app.post('/usuario', criarUsuario);
app.get('/usuarios', listarUsuarios);
app.get('/usuario/:id_usuario', obterUsuarioPorID); 
app.put('/usuario/:id_usuario', atualizarUsuarioPorID);
app.put('/usuario/:id_usuario/plano',atualizarPlanoUsuario);
app.delete('/usuario/:id_usuario', excluirUsuarioPorID);

//Serviço
app.post('/servicos', criarServico);
app.get('/servicos', listarServicos);
app.put('/servicos/:id_servico', atualizarServicoPorID);
app.delete('/servicos/:id_servico', excluirServicoPorID);


app.listen(3003, () => {
    console.log("Server is running  in http://localhost:3003")
})
