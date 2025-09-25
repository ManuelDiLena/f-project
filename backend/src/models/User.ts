import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  userName: String,
  avatarUrl: String,
  role: { type: String, enum: ['player', 'teamAdmin', 'fieldAdmin'], default: 'player' },
  positions: [String],
  age: Number,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] }
  },
  availability: { type: Map, of: Boolean },
  ratings: {
    level: { type: Number, default: 0 },
    fairPlay: { type: Number, default: 0 },
    commitment: { type: Number, default: 0 } 
  }
}, { timestamps: true });

export default model('User', UserSchema);