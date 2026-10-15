import express from 'express';
import { login, getProfile, changePassword } from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', authenticateAdmin, getProfile);
router.post('/change-password', authenticateAdmin, changePassword);

export default router;
