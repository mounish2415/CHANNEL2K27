import * as XLSXModule from 'xlsx';
const XLSX = XLSXModule.default || XLSXModule;
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_EXCEL_PATH = path.join(__dirname, '..', '..', 'registrations.xlsx');

/**
 * Format records into standardized rows for Excel
 */
export function formatRecordsForExcel(records) {
  return records.map((r) => {
    const techEvent = r.technicalEvent || {};
    const nonTechEvent = r.nonTechnicalEvent || {};
    const techMembers = Array.isArray(techEvent.teamMembers) ? techEvent.teamMembers : [];
    const nonTechMembers = Array.isArray(nonTechEvent.teamMembers) ? nonTechEvent.teamMembers : [];

    return {
      'Registration ID': r.registrationId || 'N/A',
      'Registration Date': r.createdAt ? new Date(r.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'N/A',
      'Full Name': r.fullName || '',
      'College Name': r.collegeName || '',
      'Department': r.department || '',
      'Year of Study': r.yearOfStudy || '',
      'Email': r.email || '',
      'Mobile / WhatsApp': r.phone || '',
      'Food Preference': r.foodPreference || 'Veg',

      // Package & Fee details (₹199 per head package)
      'Technical Event': techEvent.name || 'None',
      'Non-Technical Event': nonTechEvent.name || 'None',
      'Number of Participants': r.numberOfParticipants || techEvent.teamSize || 1,
      'Fee Per Head': '₹199',
      'Package Calculation': `${r.numberOfParticipants || techEvent.teamSize || 1} × ₹199`,
      'Total Amount': r.totalAmount || ((r.numberOfParticipants || techEvent.teamSize || 1) * 199),
      'Technical Team Size': techEvent.teamSize || 1,
      'Technical Member 1': techMembers[0] || r.fullName || '',
      'Technical Member 2': techMembers[1] || '',
      'Technical Member 3': techMembers[2] || '',
      'Technical Member 4': techMembers[3] || '',
      'Technical Member 5': techMembers[4] || '',

      // Non-Technical Event details
      'Non-Technical Event': nonTechEvent.name || 'None',
      'Non-Technical Team Size': nonTechEvent.teamSize || 1,

      // Total and Payment
      'Payment Mode': r.paymentMode || 'UPI QR SCANNER',
      'UPI Ref / Txn ID': r.upiRefId || 'N/A',
      'Payment Status': r.paymentStatus || 'Paid',
      'Registration Status': r.status || 'Active',
    };
  });
}

/**
 * Generate workbook buffer or write to file
 */
export function generateExcelWorkbook(records, targetFilePath = null) {
  const rows = formatRecordsForExcel(records);
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto column widths
  worksheet['!cols'] = [
    { wch: 18 }, // Reg ID
    { wch: 22 }, // Reg Date
    { wch: 24 }, // Name
    { wch: 34 }, // College
    { wch: 24 }, // Dept
    { wch: 14 }, // Year
    { wch: 28 }, // Email
    { wch: 18 }, // Mobile
    { wch: 16 }, // Food
    { wch: 24 }, // Tech Event
    { wch: 18 }, // Tech Type
    { wch: 16 }, // Tech Team Size
    { wch: 20 }, // Tech M1
    { wch: 20 }, // Tech M2
    { wch: 20 }, // Tech M3
    { wch: 20 }, // Tech M4
    { wch: 20 }, // Tech M5
    { wch: 20 }, // Tech Amount
    { wch: 24 }, // Non-Tech Event
    { wch: 18 }, // Non-Tech Type
    { wch: 16 }, // Non-Tech Team Size
    { wch: 20 }, // Non-Tech M1
    { wch: 20 }, // Non-Tech M2
    { wch: 20 }, // Non-Tech M3
    { wch: 20 }, // Non-Tech M4
    { wch: 20 }, // Non-Tech M5
    { wch: 22 }, // Non-Tech Amount
    { wch: 18 }, // Total Amount
    { wch: 18 }, // Payment Mode
    { wch: 22 }, // UPI Ref
    { wch: 16 }, // Payment Status
    { wch: 18 }, // Reg Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Symposium_Registrations');

  if (targetFilePath) {
    XLSX.writeFile(workbook, targetFilePath);
  }

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

export function syncExcelFile(records) {
  try {
    generateExcelWorkbook(records, DEFAULT_EXCEL_PATH);
  } catch (err) {
    console.error('[EXCEL SYNC ERROR]', err);
  }
}
