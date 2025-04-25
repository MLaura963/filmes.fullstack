import { Router } from 'express';
import { addFilm, getFilms, updateFilm, deleteFilm } from '../controllers/filmController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate); // garante que todas as rotas abaixo exijam autenticação
router.use(authenticate);
router.post('/', addFilm);
router.get('/', getFilms);
router.put('/:id', updateFilm);
router.delete('/:id', deleteFilm);
export default router;