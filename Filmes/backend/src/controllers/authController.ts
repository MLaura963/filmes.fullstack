import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import config from '../config/dotenvConfig';

export const register = async (req: Request, res: Response) => {
  const { nome, email, usuario, senha } = req.body;
  try {
    const exists = await User.findOne({ $or: [{ email }, { usuario }] });
    if (exists) return res.status(400).json({ message: 'Email ou usuário já existe' });
    const user = await User.create({ nome, email, usuario, senha });
    res.status(201).json({ message: 'Usuário criado', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { emailOrUser, senha } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: emailOrUser }, { usuario: emailOrUser }] });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' }); // Status 404

    const valid = await user.comparePassword(senha);
    if (!valid) return res.status(401).json({ message: 'Senha inválida.' }); // Status 401

    // Opções fixas como no exemplo (expiresIn: '7d')
    const secret: Secret = config.jwtSecret;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' }); // Removeu a leitura de config.jwtExpiresIn

    res.json({ 
      token, 
      userId: user._id, 
      nome: user.nome 
    });
  } catch (err) {
    console.error(err); // Adicionado log de erro
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};