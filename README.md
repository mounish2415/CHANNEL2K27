# CHANNEL 2K27 – National Level Technical Symposium

> **“Connect. Collaborate. Create.”**  
> Organized by the **Society of Electronics and Communication Engineering (S.E.C.E.)**  
> **Adhiparasakthi Engineering College (Autonomous)**, Melmaruvathur – 603319, Tamil Nadu  
> *Approved by AICTE • Affiliated to Anna University • Accredited by NAAC with “A” Grade • ISO 9001:2015 Certified*

---

## ⚡ Overview & Architecture

CHANNEL 2K27 features a light futuristic technology theme frontend built with **React 19** and **Vite 8**, powered by a **Node.js + Express backend** with persistent structured document storage, comprehensive admin management, and Excel reporting.

### 📌 Participation Rule:
Every participant can register for **EXACTLY 2 EVENTS**:
- **1 Technical Event** (Thought Summit / Paper Presentation, DesignDash)
- **1 Non-Technical Event** (Meme Competition, Treasure Hunt)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (`.env`)
Create or edit `.env` in the project root:
```env
PORT=5000
JWT_SECRET=channel2k27_super_secure_jwt_secret_key_apec_ece_2026_sece
ADMIN_EMAIL=mounishshanmugamk@gamil.com
ADMIN_PASSWORD=Mounish@2415
EXCEL_FILE_PATH=./registrations.xlsx
```

### 3. Start the Backend Server
```bash
npm run server
```
*The backend starts at `http://localhost:5000`, initializes seeds in `./data/`, and creates the initial admin user.*

### 4. Start the Frontend Development Server
```bash
npm run dev
```
*The frontend starts at `http://localhost:5173/` and proxies `/api` requests to `http://localhost:5000`.*

---

## 🔐 Admin Portal

- **Admin Login URL**:  
  `http://localhost:5173/admin/login` (or via hash route `http://localhost:5173/#/admin/login`)
- **Admin Dashboard URL**:  
  `http://localhost:5173/admin/dashboard`
- **Initial Admin Credentials**:
  - **Email**: `mounishshanmugamk@gamil.com`
  - **Password**: `Mounish@2415`

### Admin Features:
1. **Live Analytics**: Total registrations, today's registrations, total attendees, total revenue, and payment status breakdown.
2. **Registration Management**: Search (name, college, email, phone, ID), filter by events, food preference (Veg/Non-Veg), payment status, and sorting.
3. **Registration Actions**:
   - **View**: Complete delegate card with team presenters list and payment receipt.
   - **Edit**: Update payment status (Paid, Pending, Failed, Refunded) and UPI reference IDs.
   - **Delete**: Soft-delete with confirmation dialog.
   - **Print**: Print registration details or pass.
4. **Excel Export**: Download live spreadsheet `Symposium_Registrations.xlsx`.
5. **Event Management**:
   - Edit registration fee, pricing rule (Per Person vs Per Team), max team size, and active status.
   - Add new events. Changes reflect immediately on public registration forms.
6. **Admin Security**: Change admin password with bcrypt hashing.

---

## 📊 Excel Export Details

### File Location:
The live Excel export is continuously synchronized to:
```
./registrations.xlsx
```
And can be downloaded on-demand from the Admin Dashboard or directly via:
```
GET /api/download-excel
GET /api/registrations/admin/export
```

### Columns Included:
1. `Registration ID` (e.g. `REG-2026-0001`)
2. `Registration Date`
3. `Full Name`
4. `College Name`
5. `Department`
6. `Year of Study`
7. `Email`
8. `Mobile / WhatsApp`
9. `Food Preference` (`Veg` / `Non-Veg`)
10. `Technical Event`
11. `Technical Event Type` (`Per Person` / `Per Team`)
12. `Technical Team Size`
13. `Technical Member 1`
14. `Technical Member 2`
15. `Technical Member 3`
16. `Technical Member 4`
17. `Technical Member 5`
18. `Technical Event Amount (INR)`
19. `Non-Technical Event`
20. `Non-Technical Event Type`
21. `Non-Technical Team Size`
22. `Non-Technical Member 1`
23. `Non-Technical Member 2`
24. `Non-Technical Member 3`
25. `Non-Technical Member 4`
26. `Non-Technical Member 5`
27. `Non-Technical Event Amount (INR)`
28. `Total Amount (INR)`
29. `Payment Mode`
30. `UPI Ref / Txn ID`
31. `Payment Status`
32. `Registration Status`

---

## 🛠️ Backend Architecture & Database

- **Framework**: Express.js (Node.js)
- **Database**: NeDB (Structured persistent document database stored in `./data/*.db` with JSON compatibility)
  - `data/registrations.db` (Indexed by `registrationId`, `email`, `phone`)
  - `data/events.db` (Indexed by `id`)
  - `data/admin.db` (Indexed by `email`)
- **Security**:
  - Passwords hashed with `bcryptjs`
  - Stateless JSON Web Tokens (`jsonwebtoken`)
  - Strict input sanitization and duplicate registration checks
  - Backend-only fee and amount calculations

---

## 🌐 Production Deployment

### Frontend (e.g., Vercel / Netlify / Cloudflare Pages):
1. Build production bundle:
   ```bash
   npm run build
   ```
2. The output is generated in `./dist`.
3. Set your production API URL in environment or proxy.

### Backend (e.g., Render / Railway / VPS / AWS):
1. Set environment variables on your host (`PORT`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
2. Run start script:
   ```bash
   npm start
   ```
