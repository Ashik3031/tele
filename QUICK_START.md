# Quick Start Guide

## 🚀 Get Everything Running in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3: In Another Terminal, Start Frontend
```bash
cd telestation
npm run dev
```

### Step 4: Test It Out
1. Open http://localhost:5173 in your browser
2. Navigate to Careers page
3. Fill out the job application form
4. Upload a PDF resume
5. Click Submit

**Expected Result:** Application data + PDF stored in MongoDB ✅

---

## 📊 Verify Data Was Saved

### Check MongoDB Directly
The applications are stored in: `telestation.jobapplications` collection

You can view data in MongoDB Atlas:
1. Go to https://cloud.mongodb.com/
2. Login with your credentials
3. Navigate to the cluster
4. Check the `telestation` database → `jobapplications` collection

### Check via Backend API
```bash
# Get all applications
curl http://localhost:5000/api/jobs/all

# Get single application (replace ID)
curl http://localhost:5000/api/jobs/[APPLICATION_ID]
```

---

## 🛠️ Common Commands

### Backend
```bash
npm run dev      # Development with auto-reload
npm start        # Production mode
```

### Frontend
```bash
npm run dev      # Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📂 File Uploads

Resume PDFs are stored in: `backend/uploads/`

Example filename: `resume-1706087400123-456789012.pdf`

---

## 🔗 Important URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health
- **MongoDB Atlas:** https://cloud.mongodb.com/

---

## ⚡ Next: Create Admin Dashboard

To manage applications, you'll want to create an admin panel. Future additions:
- View all applications with filters
- Download PDFs
- Update application status
- Search functionality
- Admin authentication

---

## ❌ Troubleshooting

**Backend won't start?**
```bash
# Check if port 5000 is free
netstat -ano | findstr :5000
```

**MongoDB connection fails?**
- Check internet connection
- Verify `.env` file has the correct MongoDB URI
- Ensure MongoDB Atlas cluster is running

**File upload not working?**
- Ensure file is PDF format
- File size must be under 5MB
- Check browser console for errors

---

## 📝 Environment Variables

Already configured in `.env`:
- `MONGODB_URI` → Your MongoDB connection string
- `PORT` → 5000

Frontend `.env.local`:
- `VITE_API_URL` → http://localhost:5000/api
