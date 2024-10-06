import { verifyToken } from './auth';

export default async function handler(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Now, the user is authenticated
  return res.status(200).json({ message: 'You are authenticated!', userId: decoded.userId });
}