import express from "express";
import { calcularSimplesNacional } from "./CALCULO/simples_nacional.js"

//import para o cel cash
import base64 from 'base-64'; // Ou utilize a função nativa do Node.js
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';


const headers = {
  'x-api-key': process.env.X_API_KEY,
  'Content-Type': 'application/json'
};


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


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








app.get('/', async (req, res) => {
  try {
    console.log("Rota principal chamada, aplicação acordada com sucesso =================================== \n \n \n ");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (error) {
    res.status(500).send('Erro ao processar consulta');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ${process.env.TESTE}`);
});

