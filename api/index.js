import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:5678/webhook-test/afe4145f-5668-44c5-b815-0b309b9a548b';

app.use(bodyParser.json());

async function handleWebhook(req, res) {
  try {
    console.log('Recebendo dados do webhook:', req.body);
    
    const response = await axios.post(TARGET_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization })
      }
    });
    
    console.log('Dados encaminhados com sucesso:', response.data);
    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return res.status(error.response?.status || 500).json({
      success: false,
      error: error.message,
      ...(error.response?.data && { details: error.response.data })
    });
  }
}


app.post('/webhook', handleWebhook);
app.post('/webhook-zapi', handleWebhook);
app.get('/', (req, res) => res.send('Webhook Node.js está funcionando!'));


export default app;


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor local rodando na porta ${PORT}`);
  });
}