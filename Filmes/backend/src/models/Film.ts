import { Schema, model, Document, Types } from 'mongoose';

export interface IFilm extends Document {
  nome: string;
  foto?: string;
  descricao: string;
  diretor: string;
  anoLancamento: number;
  anoAssistiu?: number;
  nota?: number;
  usuario: Types.ObjectId;
}

const FilmSchema = new Schema<IFilm>({
  nome: { type: String, required: true },
  foto: String,
  descricao: { type: String, required: true },
  diretor: { type: String, required: true },
  anoLancamento: { type: Number, required: true },
  anoAssistiu: Number,
  nota: { type: Number, min: 0, max: 5 },
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Film = model<IFilm>('Film', FilmSchema);