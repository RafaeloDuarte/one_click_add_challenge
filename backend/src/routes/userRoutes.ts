import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redis from "redis";

import { User } from "../models/User";
import i18next from "../middleware/i18n"; // Middleware de internacionalização
import { addToBlacklist } from "../utils/auth";

require('dotenv').config();

const router = express.Router();

// Chave secreta do JWT
const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware de i18n
router.use(i18next);

// Rota de Registro
router.get("/", async (req: any, res: any) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error });
  }
});

// Rota de Registro
router.post("/register", async (req: any, res: any) => {
  const { username, email, password, lng } = req.body;
  const t = req.t; // Função de tradução

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Verifica se a chave secreta do JWT foi definida
    if (!JWT_SECRET) {
      res.status(500).json({ error: "Erro na autenticação, tente novamente" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: newUser.getDataValue("id"),
        username: newUser.getDataValue("username"),
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ ...newUser.dataValues, token });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Rota de Login
router.post("/login", async (req: any, res: any) => {
  const { email, password, lng } = req.body;
  const t = req.t; // Função de tradução

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "E-mail não cadastrado" });
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        username: user.getDataValue("username"),
        isAdmin: user.getDataValue("isAdmin"),
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Rota de logout
router.post('/logout', (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  const t = req.t;
  const redisClient = redis.createClient();

  if (!token) {
    return res.status(401).send(t("Token não existe"));
  }

  try {
    addToBlacklist(token, redisClient);

    return res.status(200).send(t("Token removido"));
  } catch (error) {
    return res.status(500).send(t("Token não removido"));
  }
});

export default router;
