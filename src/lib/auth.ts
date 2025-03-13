
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

// Define User type instead of importing from @prisma/client
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// JWT Secret key - in production this should be stored in environment variables
const JWT_SECRET = 'your-secret-key-change-in-production';

// Function to hash passwords
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Function to verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (user: { id: string; email: string; role: string }): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Get user from token
export const getUserFromToken = async (token: string): Promise<User | null> => {
  try {
    const decoded = verifyToken(token);
    if (!decoded?.id) return null;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    
    return user;
  } catch (error) {
    return null;
  }
};
