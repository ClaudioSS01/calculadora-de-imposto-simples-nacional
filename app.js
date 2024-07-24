import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { calcularSimplesNacional } from './CALCULO/simples_nacional.js';
import base64 from 'base-64';
import dotenv from 'dotenv';

// Configuração do dotenv
dotenv.config();

// Definir __dirname em módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração das variáveis de ambiente
const headers = {
    'x-api-key': process.env.X_API_KEY,
    'Content-Type': 'application/json'
};

// Criação do aplicativo Express e do roteador
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Definição das rotas
app.post('/calculo_simples_nacional', async (req, res) => {
    console.log(req.body);
    try {
        const result = await calcularSimplesNacional(req.body.campo_1, req.body.campo_2, req.body.campo_3);
        console.log(result);
        res.send(`{"body":"${result}"}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao processar consulta');
    }
});

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Usar o roteador
app.use('/', router);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} ${process.env.TESTE}`);
});
