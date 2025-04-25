import { Request, Response } from 'express';
import { Film } from '../models/Film';
import { AuthRequest } from '../middlewares/authMiddleware';

export const addFilm = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Usuário não autenticado' });

    const data = {
      nome: req.body.nome,
      foto: req.body.foto,
      descricao: req.body.descricao,
      diretor: req.body.diretor,
      anoLancamento: req.body.anoLancamento,
      anoAssistiu: req.body.anoAssistiu,
      nota: req.body.nota,
      usuario: req.userId
    };

    const exists = await Film.findOne({ nome: data.nome, usuario: data.usuario });
    if (exists) return res.status(400).json({ message: 'Filme já adicionado' });

    const film = await Film.create(data);
    res.status(201).json(film);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar filme' });
  }
};

export const getFilms = async (req: AuthRequest, res: Response) => {
  try {
    const films = await Film.find({ usuario: req.userId });
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar filmes' });
  }
};

export const updateFilm = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const film = await Film.findOneAndUpdate(
      { _id: id, usuario: req.userId },
      req.body,
      { new: true }
    );
    if (!film) return res.status(404).json({ message: 'Filme não encontrado ou sem permissão' });
    res.json(film);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar filme' });
  }
};

export const deleteFilm = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const film = await Film.findOneAndDelete({ _id: id, usuario: req.userId });
    if (!film) return res.status(404).json({ message: 'Filme não encontrado ou sem permissão' });
    res.json({ message: 'Filme removido' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover filme' });
  }
};
