import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ['admin', 'seller', 'sadmin'], required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, 
}, {
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
