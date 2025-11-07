import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /api/v1/notes/:consultationId
router.get('/:consultationId', (req, res) => {
  res.status(501).json({ message: 'Get clinical note - to be implemented' });
});

// POST /api/v1/notes/:consultationId/generate
router.post('/:consultationId/generate', (req, res) => {
  res.status(501).json({ message: 'Generate clinical note - to be implemented' });
});

// PUT /api/v1/notes/:noteId
router.put('/:noteId', (req, res) => {
  res.status(501).json({ message: 'Update clinical note - to be implemented' });
});

// POST /api/v1/notes/:noteId/finalize
router.post('/:noteId/finalize', (req, res) => {
  res.status(501).json({ message: 'Finalize and sign note - to be implemented' });
});

// GET /api/v1/notes/:noteId/export
router.get('/:noteId/export', (req, res) => {
  res.status(501).json({ message: 'Export note as PDF - to be implemented' });
});

export default router;
