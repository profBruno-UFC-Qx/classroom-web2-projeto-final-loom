import app from "./app";
import "dotenv/config";
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize()
  .then(() => {
    app.listen(3333, () => {
      console.log("🚀 Servidor rodando em http://localhost:3333");
    });
  })
  .catch((error) => console.log(error));
