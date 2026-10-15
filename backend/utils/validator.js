import { eventsDb, registrationsDb } from '../config/db.js';

export async function validateRegistration(data) {
  const errors = [];

  // 1. Participant Details
  const fullName = (data.fullName || '').trim();
  if (!fullName) {
    errors.push('Full Name is required.');
  }

  const collegeName = (data.collegeName || '').trim();
  if (!collegeName) {
    errors.push('College Name is required.');
  }

  const department = (data.department || '').trim();

  const yearOfStudy = (data.yearOfStudy || data.year || '').trim();

  const email = (data.email || '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('A valid Email address is required.');
  }

  const phoneRaw = (data.phone || data.mobileNumber || '').toString().trim().replace(/[\s-]/g, '');
  const cleanPhone = phoneRaw.startsWith('+91') ? phoneRaw.slice(3) : phoneRaw.startsWith('91') && phoneRaw.length === 12 ? phoneRaw.slice(2) : phoneRaw;
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
    errors.push('A valid 10-digit Indian Mobile / WhatsApp number is required.');
  }

  // Food Preference
  const foodPreference = (data.foodPreference || '').trim();
  if (!foodPreference || !['Veg', 'Non-Veg'].includes(foodPreference)) {
    errors.push('Please select your food preference (Veg or Non-Veg).');
  }

  // 2. Event Validation - Strict 1 Tech + 1 Non-Tech rule
  const eventIds = Array.isArray(data.events)
    ? data.events
    : Array.isArray(data.selectedEvents)
    ? data.selectedEvents
    : [];

  if (eventIds.length !== 2) {
    errors.push('You must select exactly TWO events: one Technical and one Non-Technical event.');
  }

  // Fetch all active events from database
  const dbEvents = await eventsDb.findAsync({});
  const activeEventsMap = new Map(dbEvents.filter((e) => e.status === 'ACTIVE').map((e) => [e.id, e]));

  const selectedDbEvents = [];
  for (const id of eventIds) {
    const found = activeEventsMap.get(id);
    if (!found) {
      errors.push(`Event '${id}' is either invalid or inactive.`);
    } else {
      selectedDbEvents.push(found);
    }
  }

  const techEvents = selectedDbEvents.filter((e) => e.category === 'TECHNICAL');
  const nonTechEvents = selectedDbEvents.filter((e) => e.category === 'NON-TECHNICAL');

  if (techEvents.length !== 1 || nonTechEvents.length !== 1) {
    errors.push('Invalid event combination. Please select exactly ONE Technical Event and ONE Non-Technical Event.');
  }

  const techEvent = techEvents[0];
  const nonTechEvent = nonTechEvents[0];

  // 3. Paper Presentation Team Validation
  let techTeamSize = 1;
  let techTeamMembers = [fullName];

  if (techEvent) {
    const isPaperPres = Boolean(
      techEvent.isPaperPresentation ||
      techEvent.id === 'thought-summit' ||
      techEvent.name.toLowerCase().includes('paper')
    );

    if (isPaperPres) {
      const requestedMembersCount = Number(data.paperMembersCount || data.teamSize || data.techTeamSize) || 1;
      const maxAllowed = techEvent.maxTeamSize || 5;

      if (requestedMembersCount < 1 || requestedMembersCount > maxAllowed) {
        errors.push(`Number of members for ${techEvent.name} must be between 1 and ${maxAllowed}.`);
      }

      techTeamSize = requestedMembersCount;
      const rawMembers = Array.isArray(data.techTeamMembers || data.teamMembers)
        ? (data.techTeamMembers || data.teamMembers)
        : [];

      const sanitizedMembers = [];
      const seenNames = new Set();

      for (let i = 0; i < requestedMembersCount; i++) {
        const memberName = (rawMembers[i] || (i === 0 ? fullName : '')).trim();
        if (!memberName) {
          errors.push(`Member ${i + 1} Name is required for ${techEvent.name}.`);
        } else {
          const lower = memberName.toLowerCase();
          if (seenNames.has(lower)) {
            errors.push(`Duplicate member name '${memberName}' detected in the same team.`);
          }
          seenNames.add(lower);
          sanitizedMembers.push(memberName);
        }
      }

      techTeamMembers = sanitizedMembers;
    } else {
      techTeamSize = 1;
      techTeamMembers = [fullName];
    }
  }

  // 4. Non-Technical Team details
  const nonTechTeamSize = 1;
  const nonTechTeamMembers = [fullName];

  // 5. Duplicate Check: same email or mobile for the same events
  if (email && techEvent && nonTechEvent) {
    const existing = await registrationsDb.findOneAsync({
      status: { $ne: 'DELETED' },
      $or: [{ email }, { phone: cleanPhone }],
      $and: [
        {
          $or: [
            { 'technicalEvent.id': techEvent.id },
            { 'nonTechnicalEvent.id': nonTechEvent.id },
          ],
        },
      ],
    });

    if (existing) {
      errors.push(`A registration with email ${email} or phone ${cleanPhone} already exists for one or more selected events.`);
    }
  }

  // 6. Unified Package Pricing: ₹199 PER HEAD (covers 1 Technical + 1 Non-Technical Event)
  const feePerHead = 199;
  const numberOfParticipants = techTeamSize; // For Paper Presentation: 1-5 members; for other events: 1
  const totalAmount = numberOfParticipants * feePerHead;

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      fullName,
      collegeName,
      department: department || 'Electronics and Communication Engineering',
      yearOfStudy: yearOfStudy || '3rd Year',
      email,
      phone: cleanPhone,
      foodPreference,
      feePerHead,
      numberOfParticipants,
      totalAmount,
      packageDescription: '1 Technical + 1 Non-Technical Event (₹199 per head)',
      technicalEvent: techEvent
        ? {
            id: techEvent.id,
            name: techEvent.name,
            originalName: techEvent.originalName || techEvent.name,
            category: 'TECHNICAL',
            teamSize: techTeamSize,
            teamMembers: techTeamMembers,
          }
        : null,
      nonTechnicalEvent: nonTechEvent
        ? {
            id: nonTechEvent.id,
            name: nonTechEvent.name,
            originalName: nonTechEvent.originalName || nonTechEvent.name,
            category: 'NON-TECHNICAL',
            teamSize: nonTechTeamSize,
            teamMembers: nonTechTeamMembers,
          }
        : null,
      paymentMode: data.paymentMode || 'UPI QR SCANNER',
      upiRefId: (data.upiRefId || 'VERIFIED_ON_SPOT').trim(),
      paymentStatus: data.paymentStatus || 'Paid',
    },
  };
}
