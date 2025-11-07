import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /api/v1/billing/:consultationId/codes
router.get('/:consultationId/codes', (req, res) => {
  res.status(501).json({ message: 'Get billing codes - to be implemented' });
});

// POST /api/v1/billing/:consultationId/suggest-codes
router.post('/:consultationId/suggest-codes', (req, res) => {
  res.status(501).json({ message: 'Suggest billing codes - to be implemented' });
});

// GET /api/v1/billing/:consultationId/summary
router.get('/:consultationId/summary', (req, res) => {
  res.status(501).json({ message: 'Get billing summary - to be implemented' });
});

export default router;
