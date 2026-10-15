import express from 'express';
import {
  getPublicEvents,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: get active events
router.get('/', getPublicEvents);

// Admin-only event routes
router.get('/admin', authenticateAdmin, getAdminEvents);
router.post('/', authenticateAdmin, createEvent);
router.put('/:id', authenticateAdmin, updateEvent);
router.delete('/:id', authenticateAdmin, deleteEvent);

export default router;
