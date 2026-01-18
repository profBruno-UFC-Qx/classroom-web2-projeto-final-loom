const { DataSource } = require("typeorm");
const path = require("path");

const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.resolve(__dirname, "../loom.db"), 
    
    synchronize: false, // OBRIGATÓRIO SER FALSE (pois a tabela já existe)
    logging: true,
    entities: [
        require("../entities/Produto"),
    ], 
});

AppDataSource.initialize()
    .then(() => console.log("Conectado ao banco loom.db com sucesso!"))
    .catch((err) => console.error("Erro ao conectar no banco:", err));

module.exports = AppDataSource;