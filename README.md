AQI MERN App
A Complete Air Quality Index Tracking Application (Interview Project)

A full-stack MERN (MongoDB, Express, React, Node.js) application to search real-time Air Quality Index (AQI) for any city using the AQICN API.

The project demonstrates:

Full backend API development

Caching strategies

Modern React UI

Visualizations

Real-world AQI health interpretation

Clean MERN architecture

This project was built as part of an interview assignment and showcases production-quality work.

Features
Backend (Node.js + Express + MongoDB)

Fetches real-time AQI data using the official AQICN API

Smart caching using MongoDB TTL index

Automatic cache invalidation

Clean controller–service structure

Supports .env for secure API tokens

Full error handling and validation

Frontend (React — Modern UI/UX)
1. Search Any City (Live AQI)

Clean search bar with instant UI feedback

Auto-saves recent searches

Works with both Enter key & button click

 2. Dynamic AQI Category Badge

AQI is automatically categorized and color-coded:

AQI Value	Category
0–50	Good
51–100	Moderate
101–150	Unhealthy (Sensitive Groups)
151–200	Unhealthy
201–300	Very Unhealthy
301+	Hazardous
3. NEW: Animated Risk Level Bar (Color-coded + Effects)

A premium animated bar that changes based on AQI:

Gradient color fill

Soft glow effect

Pulse animation

Shaking effect when AQI is hazardous

Smooth width transition

Fully responsive

This gives a professional health-dashboard feel.
 4. NEW: Interactive AQI Mascot System

Automatically shows a character based on AQI:

AQI	Mascot
0–100	😊 Healthy character
101–200	😷 Mask / mild coughing
200+	🤒 Severe / danger character

Adds personality and visual clarity for users.

5. NEW: AQI Health Care Tips Section

Under the favorites bar, context-aware suggestions are shown:

If AQI is Good → “Free to go outside, enjoy!”

If Moderate → “People with asthma should stay cautious.”

If Unhealthy → “Wear a mask, keep windows closed.”

If Hazardous → “Avoid going outdoors, use air purifiers.”

Highly useful for real-world decision-making.

6. AQI Trend Chart (Chart.js)

Displays:

Past AQI values

Color-coded bars

Smooth transitions

Live updates when the city changes

Gives users a visual idea of pollution variations.

7. Favorites System

Users can save cities and switch quickly.

Stored in localStorage

Persistent across reloads

Click-to-load feature
8. Recent Searches

Auto-stored whenever the user searches something.
 
 9. Light/Dark Theme Toggle

Stored in localStorage

Smooth animated transitions

Works globally across the UI

10. Framer Motion Animations Everywhere

Adds micro-interactions:

Cards

Mascot

Risk Meter

Text transitions

Opacity fade-in

Slide animations

App feels premium and app-like.

 11. AQI Interpretation Engine

Automatically calculates:

AQI category

Risk level

Bar color

Mascot state

Care suggestions

Danger effects

This is the core intelligence that powers the UI.

General Features

Clean MERN folder architecture

API token is not exposed to frontend

Environment-based configuration

Mobile responsive

Professional-grade UI

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, Chart.js, Framer Motion, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with TTL caching) |
| **API Provider** | AQICN (World’s Air Quality Index Platform) |

---

## API Endpoints

Base URL:  
`http://localhost:4000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/air?city=<city-name>` | Fetch AQI by city and store cached response |

---

## Run Locally

### 📌 Prerequisites
- Node.js 16+
- MongoDB Installed (local or cloud)
- AQICN API Token (you can register at https://aqicn.org)

---

## ⚙️ Backend Setup

cd backend
npm install
npm start

## Frontend Setup

cd frontend
npm install
npm start

Below are some pictures for your reference:
<img width="1887" height="866" alt="Screenshot 2025-11-26 124250" src="https://github.com/user-attachments/assets/88c57a45-fa4e-4894-87f0-3427a8a248ca" />

<img width="1893" height="853" alt="Screenshot 2025-11-26 124426" src="https://github.com/user-attachments/assets/c8d5f57e-2feb-4f57-8929-6673243a9dd9" />
