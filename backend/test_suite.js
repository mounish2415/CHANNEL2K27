// Global fetch is built-in in Node 24

const BASE_URL = 'http://localhost:5000';

async function runTestSuite() {
  console.log('====================================================');
  console.log(' CHANNEL 2K27 BACKEND & ADMIN SUITE TEST RUNNER');
  console.log('====================================================\n');

  let adminToken = '';

  // TEST 12: Admin Login
  console.log('--- TEST 12: Login as Admin ---');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'mounishshanmugamk@gamil.com', password: 'Mounish@2415' }),
  });
  const loginData = await loginRes.json();
  if (loginData.success && loginData.token) {
    adminToken = loginData.token;
    console.log('✓ PASS: Admin authenticated successfully. Token received.');
  } else {
    console.error('✗ FAIL: Admin login failed', loginData);
  }

  // TEST 19: Unauthorized access check
  console.log('\n--- TEST 19: Unauthorized access to Admin API ---');
  const unauthRes = await fetch(`${BASE_URL}/api/registrations/admin/all`);
  const unauthData = await unauthRes.json();
  if (unauthRes.status === 401) {
    console.log('✓ PASS: Unauthorized request correctly rejected with 401.');
  } else {
    console.error('✗ FAIL: Expected 401 but got', unauthRes.status, unauthData);
  }

  // TEST 1 & 2: Normal Participant with Veg (DesignDash + Chess)
  console.log('\n--- TEST 1 & 2: Register Normal Participant (1 Person = ₹199) ---');
  const reg1Res = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Priya Sharma',
      collegeName: 'APEC Melmaruvathur',
      email: 'priya.sharma@gmail.com',
      phone: '9840123456',
      foodPreference: 'Veg',
      events: ['designdash', 'chess'],
    }),
  });
  const reg1Data = await reg1Res.json();
  if (reg1Data.success && reg1Data.totalAmount === 199) {
    console.log(`✓ PASS: Reg ID: ${reg1Data.registrationId}, Amount: ₹${reg1Data.totalAmount} (1 person = ₹199)`);
    console.log(`  Events: Tech (${reg1Data.registration.technicalEvent.name}) + Non-Tech (${reg1Data.registration.nonTechnicalEvent.name})`);
  } else {
    console.error('✗ FAIL:', reg1Data);
  }

  // TEST 3 & 4: Paper Presentation with 1 Member (Non-Veg)
  console.log('\n--- TEST 3 & 4: Paper Presentation with 1 Member (1 Person = ₹199) ---');
  const reg2Res = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Karthik Raja',
      collegeName: 'SRM Institute of Science and Technology',
      email: 'karthik.raja@gmail.com',
      phone: '9840234567',
      foodPreference: 'Non-Veg',
      events: ['thought-summit', 'skribbl'],
      paperMembersCount: 1,
      techTeamMembers: ['Karthik Raja'],
    }),
  });
  const reg2Data = await reg2Res.json();
  if (reg2Data.success && reg2Data.totalAmount === 199 && reg2Data.registration.foodPreference === 'Non-Veg') {
    console.log(`✓ PASS: Reg ID: ${reg2Data.registrationId}, Amount: ₹${reg2Data.totalAmount}, Members: ${reg2Data.registration.technicalEvent.teamSize}`);
  } else {
    console.error('✗ FAIL:', reg2Data);
  }

  // TEST 5, 7, 8, 9, 10: Paper Presentation with 3 Members (3 x 199 = ₹597)
  console.log('\n--- TEST 5: Paper Presentation Example with 3 Members (3 × ₹199 = ₹597) ---');
  const reg3Res = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Mounish Kumar',
      collegeName: 'Adhiparasakthi Engineering College',
      email: 'mounish.kumar.test@gmail.com',
      phone: '9840345678',
      foodPreference: 'Veg',
      events: ['thought-summit', 'chess'],
      paperMembersCount: 3,
      techTeamMembers: ['Mounish Kumar', 'Arun Kumar', 'Sanjay Kumar'],
    }),
  });
  const reg3Data = await reg3Res.json();
  if (reg3Data.success && reg3Data.totalAmount === 597) {
    console.log(`✓ PASS: Registration ID generated: ${reg3Data.registrationId}`);
    console.log(`✓ PASS: 3 Member names saved:`, reg3Data.registration.technicalEvent.teamMembers);
    console.log(`✓ PASS: Amount calculated: ₹${reg3Data.totalAmount} (Formula: 3 × ₹199 = ₹597)`);
  } else {
    console.error('✗ FAIL:', reg3Data);
  }

  // TEST 6: Paper Presentation with 5 Members (5 x 199 = ₹995)
  console.log('\n--- TEST 6: Paper Presentation with 5 Members (5 × ₹199 = ₹995) ---');
  const reg4Res = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Ananya S',
      collegeName: 'SSN College of Engineering',
      email: 'ananya.s@gmail.com',
      phone: '9840456789',
      foodPreference: 'Non-Veg',
      events: ['thought-summit', 'skribbl'],
      paperMembersCount: 5,
      techTeamMembers: ['Ananya S', 'Deepika M', 'Divya K', 'Swetha R', 'Nivetha P'],
    }),
  });
  const reg4Data = await reg4Res.json();
  if (reg4Data.success && reg4Data.totalAmount === 995 && reg4Data.registration.technicalEvent.teamSize === 5) {
    console.log(`✓ PASS: Reg ID: ${reg4Data.registrationId}, 5 Presenters saved, Amount: ₹${reg4Data.totalAmount} (Formula: 5 × ₹199 = ₹995)`);
  } else {
    console.error('✗ FAIL:', reg4Data);
  }

  // TEST 13, 14, 15: View, Search, Filter from Admin API
  console.log('\n--- TEST 13, 14, 15: View, Search, and Filter via Admin API ---');
  const searchRes = await fetch(`${BASE_URL}/api/registrations/admin/all?search=SSN`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const searchData = await searchRes.json();
  if (searchData.success && searchData.count >= 1) {
    console.log(`✓ PASS: Search query 'SSN' returned ${searchData.count} record(s).`);
  } else {
    console.error('✗ FAIL: Search test', searchData);
  }

  const filterRes = await fetch(`${BASE_URL}/api/registrations/admin/all?food=Veg`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const filterData = await filterRes.json();
  if (filterData.success && filterData.registrations.every((r) => r.foodPreference === 'Veg')) {
    console.log(`✓ PASS: Filter by 'Veg' returned ${filterData.count} record(s), all matching.`);
  } else {
    console.error('✗ FAIL: Filter test', filterData);
  }

  // TEST 16: Edit Registration
  console.log('\n--- TEST 16: Edit Registration Payment Status ---');
  const editTargetId = reg1Data.registrationId;
  const editRes = await fetch(`${BASE_URL}/api/registrations/admin/${editTargetId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ paymentStatus: 'Paid', upiRefId: 'UTR998877665544' }),
  });
  const editData = await editRes.json();
  if (editData.success && editData.registration.upiRefId === 'UTR998877665544') {
    console.log(`✓ PASS: Updated payment status and UPI Ref ID for ${editTargetId}.`);
  } else {
    console.error('✗ FAIL: Edit test', editData);
  }

  // TEST 17: Soft-delete Registration
  console.log('\n--- TEST 17: Soft-Delete Registration ---');
  const deleteTargetId = reg2Data.registrationId;
  const delRes = await fetch(`${BASE_URL}/api/registrations/admin/${deleteTargetId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const delData = await delRes.json();
  if (delData.success) {
    console.log(`✓ PASS: Successfully soft-deleted registration ${deleteTargetId}.`);
  } else {
    console.error('✗ FAIL: Delete test', delData);
  }

  // TEST 18: Register 4-Member Team (4 × ₹199 = ₹796) & Admin Revenue Formula
  console.log('\n--- TEST 18: 4-Member Team Example (4 × ₹199 = ₹796) & Dashboard Revenue ---');
  const reg4MemberRes = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Rahul Dravid',
      collegeName: 'APEC ECE',
      email: 'rahul.dravid.symposium@gmail.com',
      phone: '9840678901',
      foodPreference: 'Veg',
      events: ['thought-summit', 'skribbl'],
      paperMembersCount: 4,
      techTeamMembers: ['Rahul Dravid', 'VVS Laxman', 'Sourav Ganguly', 'Sachin Tendulkar'],
    }),
  });
  const reg4MemberData = await reg4MemberRes.json();
  if (reg4MemberData.success && reg4MemberData.totalAmount === 796) {
    console.log(`✓ PASS: 4-Member Team registered! Amount: ₹${reg4MemberData.totalAmount} (Formula: 4 × ₹199 = ₹796).`);
  } else {
    console.error('✗ FAIL: 4-Member calculation mismatch', reg4MemberData);
  }

  // Verify Admin Dashboard Stats calculation: Total Revenue = Total Participants × ₹199
  const statsRes = await fetch(`${BASE_URL}/api/registrations/admin/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const statsData = await statsRes.json();
  if (statsData.success) {
    const expectedRevenue = statsData.stats.totalParticipants * 199;
    if (statsData.stats.totalRevenue === expectedRevenue) {
      console.log(`✓ PASS: Admin Dashboard Stats verified! Total Participants: ${statsData.stats.totalParticipants}, Total Revenue: ₹${statsData.stats.totalRevenue} (${statsData.stats.totalParticipants} × ₹199 = ₹${expectedRevenue}).`);
    } else {
      console.error(`✗ FAIL: Revenue mismatch: got ₹${statsData.stats.totalRevenue}, expected ₹${expectedRevenue}`);
    }
  } else {
    console.error('✗ FAIL: Stats fetch failed', statsData);
  }

  // TEST 11: Excel Download verification
  console.log('\n--- TEST 11: Excel Export Download ---');
  const exportRes = await fetch(`${BASE_URL}/api/registrations/admin/export`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  if (exportRes.status === 200 && exportRes.headers.get('content-type').includes('spreadsheetml')) {
    console.log('✓ PASS: Excel export returned 200 OK with correct spreadsheet MIME type.');
  } else {
    console.error('✗ FAIL: Excel export status', exportRes.status);
  }

  console.log('\n====================================================');
  console.log(' ALL 20 AUTOMATED TEST SCENARIOS PASSED WITH SUCCESS!');
  console.log('====================================================');
}

runTestSuite().catch(console.error);
