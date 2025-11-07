import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /api/v1/transcriptions/:consultationId
router.get('/:consultationId', (req, res) => {
  res.status(501).json({ message: 'Get transcription - to be implemented' });
});

// POST /api/v1/transcriptions/:consultationId/process
router.post('/:consultationId/process', (req, res) => {
  res.status(501).json({ message: 'Process transcription - to be implemented' });
});

export default router;
