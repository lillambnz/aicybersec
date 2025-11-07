import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /api/v1/patients
router.get('/', (req, res) => {
  res.status(501).json({ message: 'List patients - to be implemented' });
});

// POST /api/v1/patients
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create patient - to be implemented' });
});

// GET /api/v1/patients/:id
router.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Get patient details - to be implemented' });
});

// PUT /api/v1/patients/:id
router.put('/:id', (req, res) => {
  res.status(501).json({ message: 'Update patient - to be implemented' });
});

// DELETE /api/v1/patients/:id
router.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Delete patient - to be implemented' });
});

export default router;
