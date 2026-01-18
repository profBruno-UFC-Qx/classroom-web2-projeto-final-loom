require("reflect-metadata"); 

const express = require('express');
const cors = require('cors');

require('./database/data-source');

const produtosRoutes = require('./routes/produtos'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produtos', produtosRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});