import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    console.log('MONGO_URI:', process.env.MONGO_URI);
    const mongo = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${mongo.connection.host}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;