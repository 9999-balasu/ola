import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
  }
};


