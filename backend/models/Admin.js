import bcrypt from 'bcryptjs';
import { adminDb } from '../config/db.js';

export async function seedAdminUser() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'mounishshanmugamk@gamil.com').toLowerCase().trim();
  const rawPassword = process.env.ADMIN_PASSWORD || 'Mounish@2415';

  const existing = await adminDb.findOneAsync({ email: adminEmail });
  if (!existing) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    await adminDb.insertAsync({
      email: adminEmail,
      name: 'Mounish Kumar (SECE Admin)',
      role: 'ADMIN',
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log(`[AUTH] Initial admin seeded successfully for: ${adminEmail}`);
  }
}

export async function findAdminByEmail(email) {
  if (!email) return null;
  return await adminDb.findOneAsync({ email: email.toLowerCase().trim() });
}

export async function verifyPassword(plainPassword, passwordHash) {
  return await bcrypt.compare(plainPassword, passwordHash);
}

export async function updateAdminPassword(email, newPassword) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  await adminDb.updateAsync(
    { email: email.toLowerCase().trim() },
    { $set: { passwordHash, updatedAt: new Date().toISOString() } }
  );
  return true;
}
