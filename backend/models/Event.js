import { eventsDb } from '../config/db.js';

export const defaultEvents = [
  {
    id: 'thought-summit',
    name: 'Paper Presentation',
    originalName: 'THOUGHT SUMMIT',
    category: 'TECHNICAL',
    tagline: 'National Paper & Innovation Presentation',
    fee: 199,
    pricingType: 'per_person', // 'per_person' or 'per_team'
    maxTeamSize: 5,
    isPaperPresentation: true,
    status: 'ACTIVE',
    description: 'National level paper & technical research presentation across cutting-edge engineering domains.',
  },
  {
    id: 'designdash',
    name: 'DesignDash',
    originalName: 'DESIGNDASH',
    category: 'TECHNICAL',
    tagline: 'UI/UX Design & Prototyping Challenge',
    fee: 199,
    pricingType: 'per_person',
    maxTeamSize: 2,
    isPaperPresentation: false,
    status: 'ACTIVE',
    description: 'UI/UX design challenge to recreate interfaces and innovate interactive Figma prototypes.',
  },
  {
    id: 'skribbl',
    name: 'Skribbl.io',
    originalName: 'SKRIBBL.IO',
    category: 'NON-TECHNICAL',
    tagline: 'Creative Tech Doodling & Guessing Arena',
    fee: 199,
    pricingType: 'per_person',
    maxTeamSize: 1,
    isPaperPresentation: false,
    status: 'ACTIVE',
    description: 'Rapid-fire visual tech sketching and engineering keyword guessing game.',
  },
  {
    id: 'chess',
    name: 'Chess Tournament',
    originalName: 'CHESS TOURNAMENT',
    category: 'NON-TECHNICAL',
    tagline: 'Grandmaster Tactics & Rapid Blitz Clash',
    fee: 199,
    pricingType: 'per_person',
    maxTeamSize: 1,
    isPaperPresentation: false,
    status: 'ACTIVE',
    description: 'Rapid blitz chess showdown with electronic tournament clocks.',
  },
];

export async function seedDefaultEvents() {
  const count = await eventsDb.countAsync({});
  if (count === 0) {
    for (const evt of defaultEvents) {
      await eventsDb.insertAsync({
        ...evt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    console.log('[EVENTS] Seeded 4 default events successfully into database.');
  }
}

export async function getActiveEvents() {
  return await eventsDb.findAsync({ status: 'ACTIVE' });
}

export async function getAllEvents() {
  return await eventsDb.findAsync({});
}

export async function getEventById(id) {
  return await eventsDb.findOneAsync({ id });
}

export async function createEvent(eventData) {
  const cleanId = eventData.id || eventData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const newEvent = {
    ...eventData,
    id: cleanId,
    status: eventData.status || 'ACTIVE',
    fee: Number(eventData.fee) || 100,
    maxTeamSize: Number(eventData.maxTeamSize) || 1,
    pricingType: eventData.pricingType === 'per_team' ? 'per_team' : 'per_person',
    category: eventData.category === 'NON-TECHNICAL' ? 'NON-TECHNICAL' : 'TECHNICAL',
    isPaperPresentation: Boolean(eventData.isPaperPresentation || cleanId === 'thought-summit' || eventData.name.toLowerCase().includes('paper')),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await eventsDb.insertAsync(newEvent);
  return newEvent;
}

export async function updateEvent(id, updateData) {
  const existing = await eventsDb.findOneAsync({ id });
  if (!existing) return null;

  const updated = {
    ...existing,
    ...updateData,
    fee: updateData.fee !== undefined ? Number(updateData.fee) : existing.fee,
    maxTeamSize: updateData.maxTeamSize !== undefined ? Number(updateData.maxTeamSize) : existing.maxTeamSize,
    category: updateData.category !== undefined ? updateData.category : existing.category,
    pricingType: updateData.pricingType !== undefined ? updateData.pricingType : existing.pricingType,
    updatedAt: new Date().toISOString(),
  };

  await eventsDb.updateAsync({ id }, { $set: updated });
  return updated;
}

export async function deleteEvent(id) {
  return await eventsDb.removeAsync({ id }, {});
}
