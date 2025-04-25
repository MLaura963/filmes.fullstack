import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/dotenvConfig';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
