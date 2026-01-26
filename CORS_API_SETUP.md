# CORS and API Configuration Setup

## Overview
This project is configured to work across multiple environments:
- **Local Development**: `http://localhost:5000/api`
- **Production IP**: `http://72.61.238.90:5000/api`
- **Production Domain**: `https://api.tspl-corp.com/api`

## Backend Configuration

### File: `backend/server.js`
CORS is configured to accept requests from:
- Local development servers (localhost:3000, localhost:5173)
- Production IP (72.61.238.90)
- Production domains (tspl-corp.com, www.tspl-corp.com)
- Admin subdomain (admin.tspl-corp.com)

The CORS configuration includes:
- `credentials: true` - Allows cookies and authentication headers
- `methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']` - All necessary HTTP methods
- `allowedHeaders: ['Content-Type', 'Authorization']` - Required headers

### Running the Backend

**Local Development:**
```bash
cd backend
npm install
npm start
```
Server will run on `http://localhost:5000`

**Production on IP:**
```bash
cd backend
npm install
PORT=5000 npm start
```
Access via `http://72.61.238.90:5000`

## Frontend Configuration

### File: `telestation/src/services/jobApplicationAPI.js`
The API URL is determined automatically based on the environment:

1. **Explicit Override** via `.env` file using `VITE_API_URL`
2. **Automatic Detection** based on hostname:
   - `www.tspl-corp.com` → `https://api.tspl-corp.com/api`
   - `tspl-corp.com` → `https://api.tspl-corp.com/api`
   - `72.61.238.90` → `http://72.61.238.90:5000/api`
   - `localhost` → `http://localhost:5000/api`

### Environment Files

#### `.env.local` (Local Development)
```
VITE_API_URL=http://localhost:5000/api
```

#### `.env.production` (Production Domain)
```
VITE_API_URL=https://api.tspl-corp.com/api
```

#### `.env.production.ip` (Production IP)
```
VITE_API_URL=http://72.61.238.90:5000/api
```

### Building the Frontend

**Local Development:**
```bash
cd telestation
npm install
npm run dev
```

**Production Build (Domain):**
```bash
cd telestation
npm run build
# This will use .env.production
```

**Production Build (IP):**
```bash
cd telestation
VITE_API_URL=http://72.61.238.90:5000/api npm run build
# Or use .env.production.ip
cp .env.production.ip .env.production
npm run build
```

## Deployment Instructions

### On Server (72.61.238.90)

1. **Clone/Update Repository:**
   ```bash
   cd /var/www/telestation
   git pull origin main
   ```

2. **Install and Build Backend:**
   ```bash
   cd backend
   npm install
   npm start &  # Run in background with PM2 recommended
   ```

3. **Build Frontend:**
   ```bash
   cd ../telestation
   npm install
   VITE_API_URL=http://72.61.238.90:5000/api npm run build
   ```

4. **Serve Frontend:**
   - Copy `telestation/dist/` contents to web root (e.g., nginx public directory)
   - Configure nginx/Apache to proxy `/api/*` to backend `http://localhost:5000`

### Nginx Configuration Example:
```nginx
server {
    listen 80;
    server_name 72.61.238.90;

    # Serve frontend
    root /var/www/telestation/dist;
    index index.html;

    # Try file, fallback to index.html for SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Troubleshooting

### CORS Errors
If you see "No 'Access-Control-Allow-Origin' header":
1. Verify backend CORS origins list includes your frontend URL
2. Check that backend server is running
3. Verify API_URL is correct in frontend

### Connection Refused
1. Ensure backend is running on correct port (5000)
2. Check firewall rules allow traffic on port 5000
3. Verify API_URL hostname/IP is correct

### Wrong API Endpoint
1. Check `console.log` in browser dev tools to see which API_URL is being used
2. Verify environment file is loaded correctly
3. Use VITE_API_URL env var to override

## Testing

### Local Development
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd telestation
npm run dev
```

### Admin Dashboard
- Visit `http://localhost:5173/admin`
- Should load without CORS errors
- Should display applications from backend

