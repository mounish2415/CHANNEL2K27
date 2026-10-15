import { registrationsDb } from '../config/db.js';

/**
 * Generate a sequential, unique Registration ID like REG-2026-0001
 */
export async function generateUniqueRegistrationId() {
  const year = '2026';
  const prefix = `REG-${year}-`;

  // Find count of all records (including soft-deleted) to determine next index
  const count = await registrationsDb.countAsync({});
  let candidateNumber = count + 1;
  let candidateId = `${prefix}${String(candidateNumber).padStart(4, '0')}`;

  // Ensure collision safety
  while (true) {
    const existing = await registrationsDb.findOneAsync({ registrationId: candidateId });
    if (!existing) {
      break;
    }
    candidateNumber++;
    candidateId = `${prefix}${String(candidateNumber).padStart(4, '0')}`;
  }

  return candidateId;
}
