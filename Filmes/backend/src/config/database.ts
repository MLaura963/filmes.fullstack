import mongoose from 'mongoose';
import config from './dotenvConfig';

// Mongoose connection
export const connectMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro na conexão MongoDB:', error);
    process.exit(1);
  }
};