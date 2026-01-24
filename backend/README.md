# Telestation Backend - Job Applications Admin System

A complete backend system for handling job applications, storing resumes as PDFs, and managing applications through an admin dashboard.

## Features

✅ **Job Application Management**
- Accept job applications with resume uploads (PDF)
- Store applicant information in MongoDB
- Application status tracking (pending, reviewed, shortlisted, rejected)
- Admin endpoints to view, update, and delete applications

✅ **File Upload**
- PDF resume upload support (max 5MB)
- Secure file storage with unique naming
- File metadata tracking (filename, size, upload date)

✅ **MongoDB Integration**
- Cloud-based MongoDB Atlas connection
- Automatic database connection with error handling
- Document validation and schema enforcement

✅ **CORS Enabled**
- Accept requests from frontend running on different ports
- Secure cross-origin resource sharing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables are already set in `.env`**
   - MongoDB URI: Pre-configured
   - Port: 5000

4. **Start the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

5. **Verify it's running:**
   ```bash
   curl http://localhost:5000/api/health
   ```

## API Endpoints

### Job Applications

#### 1. Submit Job Application
**POST** `/api/jobs/apply`

**Request:** FormData with the following fields:
- `fullName` (required, string)
- `email` (required, email)
- `phone` (required, string)
- `position` (required, string)
- `experience` (required, string)
- `resume` (required, PDF file, max 5MB)
- `coverLetter` (optional, string)
- `linkedInProfile` (optional, URL)
- `portfolio` (optional, URL)

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "ObjectId"
}
```

#### 2. Get All Applications (Admin)
**GET** `/api/jobs/all`

**Response:**
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
      "appliedAt": "2024-01-24T10:30:00Z",
      "resume": {
        "filename": "resume-123456.pdf",
        "originalName": "John_Resume.pdf",
        "size": 250000,
        "uploadDate": "2024-01-24T10:30:00Z"
      }
    }
  ]
}
```

#### 3. Get Single Application
**GET** `/api/jobs/:id`

**Response:**
```json
{
  "success": true,
  "data": { /* application object */ }
}
```

#### 4. Update Application Status (Admin)
**PUT** `/api/jobs/:id/status`

**Request Body:**
```json
{
  "applicationStatus": "reviewed" // or "shortlisted", "rejected"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application updated",
  "data": { /* updated application object */ }
}
```

#### 5. Delete Application (Admin)
**DELETE** `/api/jobs/:id`

**Response:**
```json
{
  "success": true,
  "message": "Application deleted"
}
```

## Frontend Integration

The frontend is already configured to use this API. Key files:

1. **API Service:** `src/services/jobApplicationAPI.js`
   - Helper functions to interact with backend endpoints
   - Error handling included

2. **Career Form:** `src/Components/career/CareerFrom.jsx`
   - Updated to send FormData to backend
   - PDF resume upload support
   - Form validation

3. **Environment Variables:** `.env.local`
   - `VITE_API_URL=http://localhost:5000/api` (already set)

## Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── models/
│   └── JobApplication.js   # MongoDB schema
├── routes/
│   └── jobApplications.js  # API endpoints
├── middleware/
│   └── uploadMiddleware.js # File upload config
└── uploads/                # Directory for stored PDFs
```

## Database Schema

**JobApplication Collection:**

```javascript
{
  fullName: String,           // Required
  email: String,              // Required, indexed
  phone: String,              // Required
  position: String,           // Required
  experience: String,         // Required
  coverLetter: String,        // Optional
  resume: {                   // Required
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: Date
  },
  linkedInProfile: String,    // Optional
  portfolio: String,          // Optional
  applicationStatus: String,  // pending, reviewed, shortlisted, rejected
  appliedAt: Date,            // Auto-set to now
  updatedAt: Date             // Auto-updated
}
```

## MongoDB Connection

Connected to: `mongodb+srv://digtelsubscriptions_db_user:***@cluster0.2yef78r.mongodb.net/`

Database: `telestation` (or default cluster database)

Collection: `jobapplications`

## Troubleshooting

### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
- Check internet connection
- Verify MongoDB URI is correct in `.env`
- Ensure MongoDB Atlas cluster is active
- Check IP whitelist in MongoDB Atlas

### 2. File Upload Error
```
Error: Only PDF files are allowed
```
- Ensure file is in PDF format
- Check file size (max 5MB)
- Verify file is not corrupted

### 3. CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env.local`
- Verify frontend is making requests to correct endpoint

### 4. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## Running Both Frontend and Backend

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd telestation
npm install
npm run dev
```

Both will run simultaneously. Frontend: `http://localhost:5173`, Backend: `http://localhost:5000`

## Next Steps

1. ✅ Backend is ready to accept applications
2. ✅ Frontend CareerForm is configured to send to backend
3. **TODO:** Create Admin Dashboard to view and manage applications
   - View all applications
   - Filter by status
   - Download resumes
   - Update application status
   - Search applications

4. **TODO:** Add authentication for admin routes (protected endpoints)

5. **TODO:** Add email notifications to applicants

## Support

For issues or questions, check the logs in the terminal where the backend is running. MongoDB connection issues will be logged with detailed error messages.
