const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//cria o server
const app = express();

//habilita o cors, pra ele poder ser acessado por qualquer dominio, o json é pra ele conseguir entender dados do tipo json
// e rotas é pra ele reconhecer os end points criados no arquivo routes.js
app.use(cors());
app.use(express.json());
app.use(routes);

//informo a porta que ele vai ouvir as requisições
app.listen(3333);