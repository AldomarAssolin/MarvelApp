const express = require('express');
const cors = require('cors');

const app = express();

// Configurando o CORS para permitir todas as origens
app.use(cors());

// Ou, se você quiser limitar as origens permitidas:
// const allowedOrigins = ['http://localhost:3000', 'https://seu-frontend.com'];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Origem não permitida pelo CORS'));
//     }
//   }
// }));

module.exports = app;