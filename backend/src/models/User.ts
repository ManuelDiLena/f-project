import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  userName: string;
  avatarUrl?: string;
  role: 'player' | 'teamAdmin' | 'fieldAdmin';
  positions: string[];
  age?: number;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  availability?: Record<string, boolean>;
  ratings: {
    level: number;
    fairPlay: number;
    commitment: number;
  };
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    userName: { type: String, required: true },
    avatarUrl: String,
    role: {
      type: String,
      enum: ["player", "teamAdmin", "fieldAdmin"],
      default: "player",
    },
    positions: { type: [String], default: [] },
    age: Number,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    availability: { type: Map, of: Boolean },
    ratings: {
      level: { type: Number, default: 0 },
      fairPlay: { type: Number, default: 0 },
      commitment: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);