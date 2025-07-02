import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_URL = 'http://localhost:5678/webhook-test/afe4145f-5668-44c5-b815-0b309b9a548b'; // Substitua pela URL de destino

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rota do webhook que recebe POST
app.post('/webhook', async (req, res) => {
  try {
    console.log('Recebendo dados do webhook:', req.body);

    const response = await axios.post(TARGET_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        // Adicione headers adicionais se necessário
        // 'Authorization': 'Bearer seu-token'
      }
    });
    
    console.log('Dados encaminhados com sucesso:', response.data);
    res.status(200).json({ success: true, message: 'Webhook processado' });
  } catch (error) {
    console.error('Erro ao processar webhook:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao processar webhook' });
  }
});

app.post('/webhook-zapi', async (req, res) => {
  try {
    console.log('Recebendo dados do webhook:', req.body);

    const response = await axios.post(TARGET_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        // Adicione headers adicionais se necessário
        // 'Authorization': 'Bearer seu-token'
      }
    });
    
    console.log('Dados encaminhados com sucesso:', response.data);
    res.status(200).json({ success: true, message: 'Webhook processado' });
  } catch (error) {
    console.error('Erro ao processar webhook:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao processar webhook' });
  }
});

app.get('/', (req, res) => {
  res.send('Webhook Node.js está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`);
});