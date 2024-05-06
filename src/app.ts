import express, { Express } from 'express'
import cors from 'cors'
import { criarUsuario, listarUsuarios, atualizarUsuarioPorCPF, excluirUsuarioPorCPF, obterUsuarioPorCPF } from './controllers/usuarioController';

const app: Express = express();

app.use(express.json());
app.use(cors());

// Roteamento correto dos endpoints
app.post('/usuario', criarUsuario);
app.get('/usuarios', listarUsuarios);
app.get('/usuario/:cpf', obterUsuarioPorCPF); // Você precisa importar 'obterUsuarioPorCPF' do controlador
app.put('/usuario/:cpf', atualizarUsuarioPorCPF);
app.delete('/usuario/:cpf', excluirUsuarioPorCPF);

app.listen(3003, () => {
    console.log("Server is running  in http://localhost:3003")
})
