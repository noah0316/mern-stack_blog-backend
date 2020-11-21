import { model, Schema } from 'mongoose';

const AskmeAnythingShema = new Schema({
  cellphone: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

const AskmeAnything = model('AskmeAnything', AskmeAnythingShema);

export default AskmeAnything;
