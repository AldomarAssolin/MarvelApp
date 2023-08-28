const express = require('express');
const app = express();
const corsConfig = require('./cors/cors'); // Importando a configuração do CORS
const routes = require('./routes/routes');

app.use(express.json());

// Usando a configuração do CORS
app.use(corsConfig);

// Suas rotas e configurações adicionais vão aqui
app.use('/', routes);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});