import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import { registerParticipant, exportExcel } from './controllers/registrationController.js';
import { seedDefaultEvents } from './models/Event.js';
import { seedAdminUser } from './models/Admin.js';
import { getDashboardStats } from './models/Registration.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Seeds
async function initializeApp() {
  try {
    await seedDefaultEvents();
    await seedAdminUser();
    console.log('[INIT] Database seeds initialized successfully.');
  } catch (err) {
    console.error('[INIT ERROR] Error during database initialization:', err);
  }
}

initializeApp();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Direct Aliases for backward compatibility and convenience
app.post('/api/register', registerParticipant);
app.get('/api/download-excel', exportExcel);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json({
      status: 'ACTIVE',
      service: 'CHANNEL 2K27 Registration & Admin Backend',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      database: 'NeDB (Structured Persistent Document DB)',
      stats,
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` CHANNEL 2K27 REGISTRATION & ADMIN SYSTEM`);
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Admin route ready at: /admin/login`);
    console.log(`=======================================================`);
  });
}

export default app;
