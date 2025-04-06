/*import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }, // 'user' or 'driver'
});

export default mongoose.models.User || mongoose.model('User', userSchema);*/



import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'], // Added driver role
    default: 'user',
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

