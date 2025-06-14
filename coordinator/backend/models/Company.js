import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  company_id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: String,
  address: String,
  phone: String,
  email: { type: String, unique: true, required: true },
}, {
  timestamps: true,
});

export default mongoose.model('Company', CompanySchema);