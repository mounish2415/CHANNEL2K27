import express from 'express';
import {
  registerParticipant,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getStats,
  exportExcel,
} from '../controllers/registrationController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public registration endpoint
router.post('/', registerParticipant);

// Public backward-compatible excel download
router.get('/download-excel', exportExcel);

// Admin-protected registration endpoints
router.get('/admin/stats', authenticateAdmin, getStats);
router.get('/admin/all', authenticateAdmin, getRegistrations);
router.get('/admin/export', authenticateAdmin, exportExcel);
router.get('/admin/:id', authenticateAdmin, getRegistrationById);
router.put('/admin/:id', authenticateAdmin, updateRegistration);
router.delete('/admin/:id', authenticateAdmin, deleteRegistration);

export default router;
