import { registrationsDb } from '../config/db.js';
import { generateUniqueRegistrationId } from '../utils/idGenerator.js';
import { syncExcelFile } from '../utils/excelGenerator.js';

export async function createRegistration(data) {
  const registrationId = await generateUniqueRegistrationId();

  const record = {
    registrationId,
    ...data,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await registrationsDb.insertAsync(record);

  // Sync to Excel
  const allActive = await registrationsDb.findAsync({ status: { $ne: 'DELETED' } });
  syncExcelFile(allActive);

  return record;
}

export async function getRegistrations({ search = '', food = '', techEvent = '', nonTechEvent = '', paymentStatus = '', college = '', sort = 'newest' } = {}) {
  // Query only non-deleted registrations
  let query = { status: { $ne: 'DELETED' } };

  if (food) {
    query.foodPreference = food;
  }
  if (paymentStatus) {
    query.paymentStatus = paymentStatus;
  }
  if (college) {
    query.collegeName = new RegExp(college, 'i');
  }
  if (techEvent) {
    query['technicalEvent.id'] = techEvent;
  }
  if (nonTechEvent) {
    query['nonTechnicalEvent.id'] = nonTechEvent;
  }

  let records = await registrationsDb.findAsync(query);

  // Apply search query across multiple fields in memory or query
  if (search && search.trim()) {
    const s = search.trim().toLowerCase();
    records = records.filter((r) => {
      const matchId = (r.registrationId || '').toLowerCase().includes(s);
      const matchName = (r.fullName || '').toLowerCase().includes(s);
      const matchEmail = (r.email || '').toLowerCase().includes(s);
      const matchPhone = (r.phone || '').toLowerCase().includes(s);
      const matchCollege = (r.collegeName || '').toLowerCase().includes(s);
      return matchId || matchName || matchEmail || matchPhone || matchCollege;
    });
  }

  // Apply Sorting
  records.sort((a, b) => {
    if (sort === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sort === 'name') {
      return (a.fullName || '').localeCompare(b.fullName || '');
    } else if (sort === 'amount') {
      return (b.totalAmount || 0) - (a.totalAmount || 0);
    } else {
      // Default: newest first
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return records;
}

export async function getRegistrationById(id) {
  return await registrationsDb.findOneAsync({
    $or: [{ registrationId: id }, { _id: id }],
  });
}

export async function updateRegistration(id, updateData) {
  const existing = await getRegistrationById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...updateData,
    updatedAt: new Date().toISOString(),
  };

  await registrationsDb.updateAsync(
    { _id: existing._id },
    { $set: updated }
  );

  const allActive = await registrationsDb.findAsync({ status: { $ne: 'DELETED' } });
  syncExcelFile(allActive);

  return updated;
}

export async function softDeleteRegistration(id) {
  const existing = await getRegistrationById(id);
  if (!existing) return null;

  await registrationsDb.updateAsync(
    { _id: existing._id },
    { $set: { status: 'DELETED', deletedAt: new Date().toISOString() } }
  );

  const allActive = await registrationsDb.findAsync({ status: { $ne: 'DELETED' } });
  syncExcelFile(allActive);

  return true;
}

export async function getDashboardStats() {
  const activeRecords = await registrationsDb.findAsync({ status: { $ne: 'DELETED' } });

  const totalRegistrations = activeRecords.length;

  // Today's date in local YYYY-MM-DD
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayRegistrations = activeRecords.filter(
    (r) => r.createdAt && r.createdAt.slice(0, 10) === todayStr
  ).length;

  let totalParticipants = 0;
  let paidRegistrations = 0;
  let pendingRegistrations = 0;

  for (const r of activeRecords) {
    const participants = Number(r.numberOfParticipants || r.technicalEvent?.teamSize) || 1;
    totalParticipants += participants;

    if (r.paymentStatus === 'Paid') {
      paidRegistrations++;
    } else {
      pendingRegistrations++;
    }
  }

  // Strictly calculate total revenue as Total Participants × ₹199
  const totalRevenue = totalParticipants * 199;

  return {
    totalRegistrations,
    todayRegistrations,
    totalParticipants,
    totalRevenue,
    paidRegistrations,
    pendingRegistrations,
  };
}
