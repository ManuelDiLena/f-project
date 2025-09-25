import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userName, role } = req.body;
    if (!email || !password || !userName) {
      return res.status(400).json({ message: '⚠️ Missing required fields' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: '⚠️ User already exists' });
    }
    const passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
    );
    const user = new User({
      email,
      passwordHash,
      userName,
      role,
    });
    await user.save();
    return res.status(201).json({ message: '✅ User successfully registered' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Registration error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '⚠️ User not found' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: '⚠️ Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Login error' });
  }
};