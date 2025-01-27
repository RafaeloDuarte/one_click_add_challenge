import { app } from "./app";

const PORT = process.env.PORT || 3000;

app.listen({
  port: PORT, hostname: "0.0.0.0", callback: () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  }
});