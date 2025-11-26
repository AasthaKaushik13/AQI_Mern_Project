# AQI MERN App  
### A Complete Air Quality Index Tracking Application (Interview Project)

This is a full-stack **MERN** (MongoDB, Express, React, Node.js) project that allows users to search real-time **Air Quality Index (AQI)** of any city using the **AQICN API**, visualize data beautifully, and store results using a smart caching mechanism.

This application was built as an **interview project** to demonstrate backend API development, frontend UI/UX, caching strategies, and clean MERN architecture.

---

## Features

### 🔹 **Backend (Node.js + Express + MongoDB)**
- Fetch real-time AQI using AQICN API  
- Caches responses in MongoDB using **TTL indexes**  
- Well-structured REST API following industry patterns  
- Handles multiple environments using `.env` variables  
- Error handling + validation  

### 🔹 **Frontend (React)**
- Modern UI with live AQI search  
- **Chart.js** visualizations (AQI levels, trends, meter bar, risk levels)  
- Favorites system (save most-searched cities)  
- Responsive design  
- Smooth transitions & effects using **Framer Motion**  

### 🔹 General
- Clean MERN folder structure  
- Highly readable code  
- Easy to deploy  
- Safe handling of API tokens using `.env`  

---

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

```bash
cd backend
npm install
npm start

## Frontend Setup

```bash
cd frontend
npm install
npm start
