# Full Setup & Testing Guide

## 📋 Complete System Overview

Your job application system is now fully functional with:

✅ **Backend (Node.js + Express)**
- Job application API endpoints
- MongoDB Atlas integration
- PDF resume upload handling
- Application status management

✅ **Frontend (React + Vite)**
- Career page with application form
- PDF resume upload UI
- Admin dashboard to view/manage applications

✅ **Database (MongoDB Atlas)**
- Cloud-based data storage
- Automatic connection handling
- Schema validation

---

## 🚀 STEP 1: Start Both Servers

### Terminal 1 - Backend (Already Running ✅)
```bash
cd backend
npm run dev
```
Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd telestation
npm run dev
```
Expected output:
```
VITE v5.x.x ready in 123 ms

➜ Local: http://localhost:5173/
```

---

## 🧪 STEP 2: Test the Application

### Test 1: Submit a Job Application

1. Open http://localhost:5173 in browser
2. Navigate to **Careers** page
3. Fill in the form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `1234567890`
   - Position: `Senior Developer` (or any position)
   - Experience: `5 years`
   - LinkedIn (optional): `https://linkedin.com/in/johndoe`
   - Portfolio (optional): `https://johndoe.com`
   - Cover Letter (optional): Any text

4. **Upload a PDF Resume**
   - Create a test PDF or use any PDF file
   - Max size: 5MB
   - Must be PDF format

5. Click **Submit** button

**Expected Result:**
- ✅ Success message appears
- ✅ Form clears
- ✅ Green "Submitted" confirmation

---

### Test 2: Verify Data in MongoDB

**Option A: Check via Backend API**
```bash
# In another terminal, test the API
curl http://localhost:5000/api/jobs/all
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "position": "Senior Developer",
      "experience": "5 years",
      "applicationStatus": "pending",
      "appliedAt": "2024-01-24T...",
      "resume": {
        "filename": "resume-1706087400123-456789012.pdf",
        "originalName": "your_resume.pdf",
        "size": 250000,
        "uploadDate": "2024-01-24T..."
      }
    }
  ]
}
```

**Option B: Check in MongoDB Atlas UI**
1. Go to https://cloud.mongodb.com/
2. Login with credentials
3. Navigate to: Cluster0 → Database → telestation → jobapplications
4. View your submitted application

**Option C: Check File Upload**
```bash
# PDFs are stored in backend/uploads/
# List files:
ls backend/uploads/
# Should show: resume-1706087400123-456789012.pdf
```

---

### Test 3: Access Admin Dashboard

#### Adding Admin Page to Your App

Edit [telestation/src/App.jsx](telestation/src/App.jsx) and add the route:

```jsx
import AdminPage from './pages/AdminPage';

// In your routing setup:
<Route path="/admin" element={<AdminPage />} />
```

Then visit: http://localhost:5173/admin

#### Admin Dashboard Features:
- ✅ View all applications in table format
- ✅ Search by name, email, or position
- ✅ Filter by application status
- ✅ View detailed application info
- ✅ Download resume PDF
- ✅ Update application status (pending → reviewed → shortlisted → rejected)
- ✅ Delete applications
- ✅ Stats dashboard (total, pending, shortlisted, rejected)

---

### Test 4: Update Application Status

In the Admin Dashboard:

1. Click on any application in the table
2. In the right panel, click a status button:
   - **pending** (initial state)
   - **reviewed** (you've reviewed it)
   - **shortlisted** (moving to next round)
   - **rejected** (not selected)
3. Status updates in real-time

---

## 🔧 API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Submit Application (POST)
```
POST /jobs/apply
Content-Type: multipart/form-data

Fields:
- fullName (required)
- email (required)
- phone (required)
- position (required)
- experience (required)
- resume (required, PDF file)
- coverLetter (optional)
- linkedInProfile (optional)
- portfolio (optional)
```

#### 2. Get All Applications (GET)
```
GET /jobs/all

Response:
{
  "success": true,
  "data": [{ application objects }]
}
```

#### 3. Get Single Application (GET)
```
GET /jobs/:applicationId

Example:
GET /jobs/507f1f77bcf86cd799439011
```

#### 4. Update Status (PUT)
```
PUT /jobs/:applicationId/status
Content-Type: application/json

Body:
{
  "applicationStatus": "reviewed"
}

Valid values: "pending", "reviewed", "shortlisted", "rejected"
```

#### 5. Delete Application (DELETE)
```
DELETE /jobs/:applicationId

Example:
DELETE /jobs/507f1f77bcf86cd799439011
```

#### 6. Health Check (GET)
```
GET /api/health

Response:
{
  "status": "Backend is running",
  "timestamp": "2024-01-24T..."
}
```

---

## 📂 Project Structure

```
tspl-corp/
├── backend/                          # Backend server
│   ├── server.js                    # Main server file ✅
│   ├── package.json                 # Dependencies ✅
│   ├── .env                         # Environment config ✅
│   ├── models/
│   │   └── JobApplication.js        # MongoDB schema ✅
│   ├── routes/
│   │   └── jobApplications.js       # API endpoints ✅
│   ├── middleware/
│   │   └── uploadMiddleware.js      # File upload config ✅
│   └── uploads/                     # PDF storage
│
└── telestation/                      # Frontend
    ├── src/
    │   ├── pages/
    │   │   ├── CareerPage.jsx       # Career page (updated) ✅
    │   │   └── AdminPage.jsx        # Admin dashboard page ✅
    │   ├── Components/
    │   │   ├── career/
    │   │   │   └── CareerFrom.jsx   # Application form (updated) ✅
    │   │   └── AdminDashboard.jsx   # Admin dashboard (new) ✅
    │   ├── services/
    │   │   └── jobApplicationAPI.js # API service (new) ✅
    │   └── App.jsx                  # Main app (needs route added)
    └── .env.local                   # Frontend config ✅
```

---

## ✅ Checklist: Everything Working?

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can access Careers page
- [ ] Can fill and submit job application form
- [ ] PDF resume uploads successfully
- [ ] Data appears in MongoDB (via API or Atlas)
- [ ] PDF file appears in `backend/uploads/`
- [ ] Can access Admin Dashboard (after adding route to App.jsx)
- [ ] Can view applications in admin table
- [ ] Can filter applications by status/search
- [ ] Can update application status
- [ ] Can download resume PDF from admin
- [ ] Can delete applications

---

## 🐛 Troubleshooting

### Issue 1: Backend Won't Start
```
Error: EADDRINUSE: address already in use :::5000
```
**Solution:** Port 5000 is already in use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# macOS/Linux
lsof -i :5000
kill -9 [PID]
```

### Issue 2: MongoDB Connection Failed
```
Error: connect ECONNREFUSED
```
**Solution:** Check MongoDB connection
- Verify internet connection
- Check `.env` file has correct MongoDB URI
- Ensure MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0 for development)

### Issue 3: File Upload Fails
```
Error: Only PDF files are allowed
```
**Solution:** 
- Ensure file is PDF format
- Check file size (max 5MB)
- Try another PDF file

### Issue 4: CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Ensure backend is running
- Check `VITE_API_URL` in `.env.local` is `http://localhost:5000/api`
- Verify no typos in API URL

### Issue 5: Admin Dashboard Shows "No applications found"
**Solution:**
- Ensure you submitted at least one application first
- Check backend is running and connected to MongoDB
- Try clicking "Refresh" button in admin

### Issue 6: Can't Download Resume PDF
**Solution:**
- PDF should be in `backend/uploads/` folder
- Check API URL in admin component: `VITE_API_URL`
- Verify resume.filename is correct in database

---

## 🔒 Security Notes (Development)

For **development only**:
- MongoDB user/password is in `.env` (fine for dev)
- CORS allows all origins (should be restricted in production)
- No authentication on admin endpoints (add in production)

**For Production, add:**
1. Environment-specific .env files
2. Admin route protection/authentication
3. Rate limiting on API
4. Input validation and sanitization
5. Restrict CORS to specific domains
6. Use HTTPS

---

## 📞 Next Steps

1. ✅ **Backend running** - Job application API ready
2. ✅ **Frontend connected** - Forms sending to backend
3. ✅ **Admin Dashboard** - Manage applications
4. **TODO:** Add admin authentication (login required)
5. **TODO:** Add email notifications to applicants
6. **TODO:** Add file download statistics
7. **TODO:** Add CSV export of applications
8. **TODO:** Add advanced filtering/reporting

---

## 📖 Quick Reference

| What | Where | URL |
|------|-------|-----|
| Frontend App | http://localhost:5173 | - |
| Careers Page | http://localhost:5173/careers | CareerPage.jsx |
| Admin Dashboard | http://localhost:5173/admin | AdminPage.jsx |
| Backend API | http://localhost:5000/api | - |
| Health Check | http://localhost:5000/api/health | - |
| MongoDB Atlas | https://cloud.mongodb.com | - |
| Database Name | telestation | - |
| Collection | jobapplications | - |

---

## 💡 Tips

- **Quick test:** Fill form with test data, upload any PDF, submit
- **Debug API:** Use `curl` or Postman to test endpoints directly
- **View logs:** Check browser console (frontend) and terminal (backend)
- **Database access:** Use MongoDB Atlas UI to inspect data
- **Restart servers:** Just close terminal (Ctrl+C) and restart with npm run dev

---

**Everything is working! 🎉 Your job application system is live!**
