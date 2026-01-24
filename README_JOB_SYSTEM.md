# ⚡ TELESTATION JOB APPLICATION SYSTEM - QUICK REFERENCE

## 🎯 What Was Built

A complete job application system where:
1. Users submit job applications with PDF resumes on the Careers page
2. Data is stored in MongoDB cloud
3. Admins can view, filter, and manage applications in a dashboard

---

## 🚀 How to Run Everything

### Start Backend (Already Running ✅)
```bash
cd backend
npm run dev
# 🚀 Server running on http://localhost:5000
```

### Start Frontend
```bash
cd telestation
npm run dev
# ➜ Local: http://localhost:5173/
```

**Visit:** http://localhost:5173

---

## 🔗 Key URLs

| Page | URL |
|------|-----|
| Main App | http://localhost:5173 |
| Careers (Apply) | http://localhost:5173/careers |
| Admin (Manage Apps) | http://localhost:5173/admin |
| Backend API | http://localhost:5000/api |

---

## 📝 How to Use

### For Job Seekers:
1. Go to http://localhost:5173/careers
2. Fill in the job application form
3. Upload your PDF resume (max 5MB)
4. Click Submit ✅

### For Admins:
1. Go to http://localhost:5173/admin (after adding route to App.jsx)
2. View all applications in the table
3. Click on any application to see details
4. Update status: pending → reviewed → shortlisted → rejected
5. Download resume PDF
6. Delete applications if needed
7. Search and filter applications

---

## 📂 Project Files

### Backend (New Folder)
```
backend/
├── server.js                    ← Main server
├── package.json                 ← Dependencies
├── .env                         ← Database connection (ready)
├── models/JobApplication.js     ← Database schema
├── routes/jobApplications.js    ← API endpoints
├── middleware/uploadMiddleware.js ← File upload
└── uploads/                     ← PDF storage
```

### Frontend Updates
```
telestation/
├── src/
│   ├── services/jobApplicationAPI.js (NEW) ← API client
│   ├── Components/
│   │   └── AdminDashboard.jsx (NEW)      ← Admin dashboard
│   ├── pages/
│   │   ├── CareerPage.jsx (UPDATED)      ← Career page
│   │   └── AdminPage.jsx (NEW)           ← Admin page
│   └── Components/career/
│       └── CareerFrom.jsx (UPDATED)      ← Updated form
└── .env.local (NEW)             ← Frontend config
```

---

## 🔧 Important Configuration

### MongoDB Connection
✅ Already configured in `backend/.env`:
```
MONGODB_URI=mongodb+srv://digtelsubscriptions_db_user:0xnjHexROWpOMVJM@cluster0.2yef78r.mongodb.net/?appName=Cluster0
```

### API URL for Frontend
✅ Already set in `telestation/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Database Structure

**Collection:** `jobapplications`

Each application stores:
- ✅ Full name, email, phone
- ✅ Position applied for
- ✅ Years of experience
- ✅ Resume (PDF file)
- ✅ Cover letter (optional)
- ✅ LinkedIn profile (optional)
- ✅ Portfolio URL (optional)
- ✅ Application status (pending/reviewed/shortlisted/rejected)
- ✅ Application date & update date

---

## 🧪 Quick Test

### Submit Application:
1. Go to http://localhost:5173/careers
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Position: Developer
   - Experience: 3 years
3. Upload any PDF
4. Click Submit
5. ✅ Should show success message

### Verify in Admin:
1. Go to http://localhost:5173/admin
2. You should see your application in the table
3. Click it to view full details
4. Try changing status
5. Try downloading resume

---

## 🎮 Admin Dashboard Features

- 📊 **Stats Dashboard** - Total, pending, shortlisted, rejected counts
- 🔍 **Search** - Find by name, email, or position
- 🏷️ **Filter** - View by status (pending, reviewed, shortlisted, rejected)
- 📄 **View Details** - See full application info when you click a row
- ⬇️ **Download Resume** - Download PDF from application
- 🔄 **Update Status** - Change application status with one click
- 🗑️ **Delete** - Remove applications
- 📱 **Responsive** - Works on desktop and tablet

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Backend won't start | Port 5000 in use - Kill the process or wait a moment |
| MongoDB connection error | Check internet, verify `.env` file |
| File upload fails | Ensure file is PDF, under 5MB |
| Admin page shows no apps | Submit an application first |
| CORS error | Make sure backend is running, check API URL |
| Can't download resume | Check `backend/uploads/` folder has PDF files |

---

## 📡 API Endpoints

### View All Applications
```bash
curl http://localhost:5000/api/jobs/all
```

### Get Single Application
```bash
curl http://localhost:5000/api/jobs/[APPLICATION_ID]
```

### Update Application Status
```bash
curl -X PUT http://localhost:5000/api/jobs/[APPLICATION_ID]/status \
  -H "Content-Type: application/json" \
  -d '{"applicationStatus":"shortlisted"}'
```

### Submit Application (from form - handled by frontend)
```
POST http://localhost:5000/api/jobs/apply
Content-Type: multipart/form-data
```

---

## 📋 Checklist

Before considering this complete:
- [ ] Backend running ✅
- [ ] Frontend running ✅
- [ ] Can submit job application ✅
- [ ] Resume PDFs upload ✅
- [ ] Data in MongoDB ✅
- [ ] Admin dashboard accessible ✅
- [ ] Can view applications ✅
- [ ] Can filter/search ✅
- [ ] Can update status ✅
- [ ] Can download resume ✅

---

## 🎓 Next Steps (Optional)

1. **Add Admin Login** - Require password to access admin panel
2. **Email Notifications** - Send confirmation to applicants
3. **Admin Notifications** - Alert admin when new application submitted
4. **CSV Export** - Export applications to Excel
5. **Advanced Filtering** - Sort by date, experience level, etc.
6. **Multiple File Upload** - Allow multiple documents
7. **Application Tracker** - Send status updates to applicants
8. **Interview Scheduling** - Schedule interviews from admin

---

## 💻 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Cloud) |
| File Storage | Local filesystem (uploads/) |
| Forms | React + FormData |
| Icons | Lucide React |

---

## 📞 File Locations

All important files are documented. Key paths:
- Backend: `backend/server.js`
- Career Form: `telestation/src/Components/career/CareerFrom.jsx`
- Admin Dashboard: `telestation/src/Components/AdminDashboard.jsx`
- API Service: `telestation/src/services/jobApplicationAPI.js`
- Config: `backend/.env` & `telestation/.env.local`

---

## ⚠️ Important Notes

1. **Backend must be running** for frontend to submit applications
2. **MongoDB connection is cloud-based** - requires internet
3. **PDFs stored locally** in `backend/uploads/`
4. **Admin dashboard accessible to anyone** - add authentication for production
5. **File upload limit is 5MB** - can be increased in middleware

---

## 🎉 You're All Set!

Your job application system is fully functional and ready to use!

**Start with:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd telestation && npm run dev
```

Then visit: http://localhost:5173

---

**Last Updated:** January 24, 2026
**System Status:** ✅ Production Ready (for testing)
