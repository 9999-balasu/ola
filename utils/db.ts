  // utils/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined in .env.local');

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'olaclone',
      bufferCommands: false,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}
