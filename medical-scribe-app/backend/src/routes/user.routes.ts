import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/users/me
router.get('/me', (req, res) => {
  res.status(501).json({ message: 'Get current user - to be implemented' });
});

// PUT /api/v1/users/me
router.put('/me', (req, res) => {
  res.status(501).json({ message: 'Update current user - to be implemented' });
});

// GET /api/v1/users (admin only)
router.get('/', authorize('admin'), (req, res) => {
  res.status(501).json({ message: 'List users - to be implemented' });
});

export default router;
