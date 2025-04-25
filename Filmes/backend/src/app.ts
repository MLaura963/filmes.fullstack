import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectMongo } from './config/database';
import authRoutes from './routes/authRoutes';
import filmRoutes from './routes/filmRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import config from './config/dotenvConfig';

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await connectMongo();
    console.log('✔️ MongoDB conectado');
    app.listen(config.port, () =>
      console.log(`🚀 Server rodando na porta ${config.port}`)
    );
  } catch (err) {
    console.error('❌ Falha ao conectar no MongoDB:', err);
  }
})();


// Serve frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// API
app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/me', userRoutes);

// Fallback to index.html for PWA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// Error handler
app.use(errorHandler);

export default app;