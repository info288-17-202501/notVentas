// config/mongoose.js
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coordinator');
    console.log("✅ MongoDB conectado con Mongoose");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
};

export default connectDB;
