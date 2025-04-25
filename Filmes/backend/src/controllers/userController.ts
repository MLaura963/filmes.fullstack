import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { User } from '../models/User';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-senha');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updates = { ...req.body };
    if (updates.senha) delete updates.senha; // senha só via rota específica
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-senha');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};

export const deleteProfile = async (req: AuthRequest, res: Response) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'Usuário removido' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover usuário' });
  }
};