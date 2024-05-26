import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"
import { router } from "./endpoints/routes";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/v1", router);

app.listen(3003, () => {
    console.log("Server is running  in http://localhost:3003")
})

export default app;
