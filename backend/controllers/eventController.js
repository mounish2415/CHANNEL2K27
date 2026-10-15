import {
  getActiveEvents,
  getAllEvents,
  getEventById,
  createEvent as createEventModel,
  updateEvent as updateEventModel,
  deleteEvent as deleteEventModel,
} from '../models/Event.js';

export async function getPublicEvents(req, res) {
  try {
    const events = await getActiveEvents();
    return res.json({
      success: true,
      events,
    });
  } catch (err) {
    console.error('[GET EVENTS ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve events.' });
  }
}

export async function getAdminEvents(req, res) {
  try {
    const events = await getAllEvents();
    return res.json({
      success: true,
      events,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve admin events.' });
  }
}

export async function createEvent(req, res) {
  try {
    const { name, category, fee, pricingType, maxTeamSize, tagline, description, status } = req.body;

    if (!name || !category || fee === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Event name, category, and fee are required.',
      });
    }

    if (!['TECHNICAL', 'NON-TECHNICAL'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Category must be either TECHNICAL or NON-TECHNICAL.',
      });
    }

    const newEvent = await createEventModel({
      name,
      category,
      fee: Number(fee),
      pricingType: pricingType === 'per_team' ? 'per_team' : 'per_person',
      maxTeamSize: Number(maxTeamSize) || 1,
      tagline: tagline || '',
      description: description || '',
      status: status || 'ACTIVE',
    });

    return res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      event: newEvent,
    });
  } catch (err) {
    console.error('[CREATE EVENT ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to create event.' });
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existing = await getEventById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    if (updateData.category && !['TECHNICAL', 'NON-TECHNICAL'].includes(updateData.category)) {
      return res.status(400).json({
        success: false,
        message: 'Category must be either TECHNICAL or NON-TECHNICAL.',
      });
    }

    const updated = await updateEventModel(id, updateData);

    return res.json({
      success: true,
      message: 'Event updated successfully.',
      event: updated,
    });
  } catch (err) {
    console.error('[UPDATE EVENT ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to update event.' });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    const existing = await getEventById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    await deleteEventModel(id);
    return res.json({
      success: true,
      message: 'Event deleted successfully.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete event.' });
  }
}
