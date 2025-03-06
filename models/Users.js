import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  documentType: { type: String, required: true },
  document: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
}, { versionKey: false, timestamps: true });

export default mongoose.model('User', userSchema);
