import express, { Express } from 'express'
import cors from 'cors'
import { criarUsuario, listarUsuarios,atualizarUsuarioPorCPF, excluirUsuarioPorCPF } from './controllers/usuarioController';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/usuario',criarUsuario );


app.listen(3003, () => {
    console.log("Server is running  in http://localhost:3003")
})

console.log("Exmed")