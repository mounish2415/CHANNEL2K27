import {
  createRegistration,
  getRegistrations as getRegistrationsModel,
  getRegistrationById as getRegistrationByIdModel,
  updateRegistration as updateRegistrationModel,
  softDeleteRegistration,
  getDashboardStats,
} from '../models/Registration.js';
import { validateRegistration } from '../utils/validator.js';
import { generateExcelWorkbook } from '../utils/excelGenerator.js';

export async function registerParticipant(req, res) {
  try {
    const rawData = req.body;

    const validation = await validateRegistration(rawData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0] || 'Registration validation failed.',
        errors: validation.errors,
      });
    }

    const savedRecord = await createRegistration(validation.sanitizedData);

    console.log(`[SUCCESS] Registration recorded: ${savedRecord.registrationId} for ${savedRecord.fullName}`);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Your digital pass has been generated.',
      registration: savedRecord,
      registrationId: savedRecord.registrationId,
      totalAmount: savedRecord.totalAmount,
    });
  } catch (err) {
    console.error('[REGISTRATION SUBMIT ERROR]', err);
    return res.status(500).json({
      success: false,
      message: 'Registration processing error. Please try again or contact the helpdesk.',
    });
  }
}

export async function getRegistrations(req, res) {
  try {
    const { search, food, techEvent, nonTechEvent, paymentStatus, college, sort } = req.query;

    const records = await getRegistrationsModel({
      search,
      food,
      techEvent,
      nonTechEvent,
      paymentStatus,
      college,
      sort,
    });

    return res.json({
      success: true,
      count: records.length,
      registrations: records,
    });
  } catch (err) {
    console.error('[GET REGISTRATIONS ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve registrations.' });
  }
}

export async function getRegistrationById(req, res) {
  try {
    const { id } = req.params;
    const record = await getRegistrationByIdModel(id);

    if (!record || record.status === 'DELETED') {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    return res.json({
      success: true,
      registration: record,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving registration.' });
  }
}

export async function updateRegistration(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existing = await getRegistrationByIdModel(id);
    if (!existing || existing.status === 'DELETED') {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    const updated = await updateRegistrationModel(id, updateData);

    return res.json({
      success: true,
      message: 'Registration record updated successfully.',
      registration: updated,
    });
  } catch (err) {
    console.error('[UPDATE REGISTRATION ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to update registration.' });
  }
}

export async function deleteRegistration(req, res) {
  try {
    const { id } = req.params;
    const existing = await getRegistrationByIdModel(id);

    if (!existing || existing.status === 'DELETED') {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    await softDeleteRegistration(id);

    return res.json({
      success: true,
      message: 'Registration deleted successfully.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete registration.' });
  }
}

export async function getStats(req, res) {
  try {
    const stats = await getDashboardStats();
    return res.json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error('[GET STATS ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to compute dashboard stats.' });
  }
}

export async function exportExcel(req, res) {
  try {
    const { search, food, techEvent, nonTechEvent, paymentStatus, college, sort } = req.query;

    const records = await getRegistrationsModel({
      search,
      food,
      techEvent,
      nonTechEvent,
      paymentStatus,
      college,
      sort,
    });

    const buffer = generateExcelWorkbook(records);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Symposium_Registrations.xlsx"'
    );

    return res.send(buffer);
  } catch (err) {
    console.error('[EXPORT EXCEL ERROR]', err);
    return res.status(500).json({ success: false, message: 'Error exporting Excel file.' });
  }
}
