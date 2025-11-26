
# AQI MERN App (Interview Project)

This is a MERN-style project that allows searching Air Quality Index by city using the AQICN API.

## Features
- Backend: Node.js + Express + MongoDB (cache)
- Frontend: React with charts (Chart.js)
- Cache vendor responses in MongoDB with TTL index (configurable)
- REST API follows guidelines

## Run locally

### Prerequisites
- Node.js (16+)
- MongoDB running locally (or provide connection string)

### Backend
1. Go to backend folder:
   ```
   cd backend
   ```
2. Install deps:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and set values (especially AQICN_TOKEN and MONGO_URI)
4. Start server:
   ```
   npm start
   ```
Backend runs on `http://localhost:4000`

API:
- `GET /api/air?city=<city-name>`

### Frontend
1. Go to frontend:
   ```
   cd frontend
   ```
2. Install deps:
   ```
   npm install
   ```
3. Start dev server:
   ```
   npm start
   ```
Frontend runs on `http://localhost:3000`

## Notes
- Cache TTL controlled by `CACHE_TTL_SECONDS` in backend `.env`
- This project intentionally stores normalized data and raw vendor data in Mongo for inspection.
- Make sure to register for AQICN API token at https://aqicn.org/data-platform/token/

Good luck — include this repo link in your interview submission.
