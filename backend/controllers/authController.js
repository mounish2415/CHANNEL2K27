import jwt from 'jsonwebtoken';
import { findAdminByEmail, verifyPassword, updateAdminPassword } from '../models/Admin.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'channel2k27_super_secure_jwt_secret_key_apec_ece_2026_sece';
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role, name: admin.name },
      jwtSecret,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error('[AUTH LOGIN ERROR]', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during authentication.',
    });
  }
}

export async function getProfile(req, res) {
  try {
    const admin = await findAdminByEmail(req.admin.email);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    return res.json({
      success: true,
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving profile.' });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    const admin = await findAdminByEmail(req.admin.email);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    const isMatch = await verifyPassword(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match.',
      });
    }

    await updateAdminPassword(admin.email, newPassword);

    return res.json({
      success: true,
      message: 'Password changed successfully. Please keep your new password safe.',
    });
  } catch (err) {
    console.error('[AUTH CHANGE PASSWORD ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
}
