import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /api/v1/consultations
router.get('/', (req, res) => {
  res.status(501).json({ message: 'List consultations - to be implemented' });
});

// POST /api/v1/consultations
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create consultation - to be implemented' });
});

// GET /api/v1/consultations/:id
router.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Get consultation - to be implemented' });
});

// PUT /api/v1/consultations/:id
router.put('/:id', (req, res) => {
  res.status(501).json({ message: 'Update consultation - to be implemented' });
});

// POST /api/v1/consultations/:id/start-recording
router.post('/:id/start-recording', (req, res) => {
  res.status(501).json({ message: 'Start recording - to be implemented' });
});

// POST /api/v1/consultations/:id/stop-recording
router.post('/:id/stop-recording', (req, res) => {
  res.status(501).json({ message: 'Stop recording - to be implemented' });
});

export default router;
