import Datastore from '@seald-io/nedb';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data folder exists
const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Persistent database stores
export const registrationsDb = new Datastore({
  filename: path.join(dataDir, 'registrations.db'),
  autoload: true,
});

export const eventsDb = new Datastore({
  filename: path.join(dataDir, 'events.db'),
  autoload: true,
});

export const adminDb = new Datastore({
  filename: path.join(dataDir, 'admin.db'),
  autoload: true,
});

// Create indices for fast lookup
registrationsDb.ensureIndex({ fieldName: 'registrationId', unique: true });
registrationsDb.ensureIndex({ fieldName: 'email' });
registrationsDb.ensureIndex({ fieldName: 'phone' });
eventsDb.ensureIndex({ fieldName: 'id', unique: true });
adminDb.ensureIndex({ fieldName: 'email', unique: true });

console.log('[DATABASE] Structured NeDB stores initialized successfully in data/');
