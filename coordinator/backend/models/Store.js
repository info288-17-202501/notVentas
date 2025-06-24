import mongoose from 'mongoose';
import Company from './company.js'; 

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  company: { type: String, required: true},
  is_active: { type: Boolean, default: true },
  coord_latitude: { type: Number, default: null },
  coord_longitude: { type: Number, default: null },
}, {
  timestamps: true,
});

export default mongoose.model('Store', StoreSchema);
