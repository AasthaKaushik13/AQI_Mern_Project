🌍 AQI MERN App
### **A Complete Air Quality Index Tracking Application (Interview Project)**

A full-stack **MERN** (MongoDB, Express, React, Node.js) project to search real-time **Air Quality Index (AQI)** for any city using the **AQICN API**.

This project demonstrates:

* Full backend API development
* Smart caching strategies
* Modern React UI
* Advanced animations & visualizations
* Real-world AQI health interpretation
* Clean MERN architecture

Built as part of an **interview assignment**, showcasing production-quality work.

---

# 🚀 Features

## 🔹 **Backend (Node.js + Express + MongoDB)**

* Fetches live AQI using the official **AQICN API**
* Smart caching with **MongoDB TTL index**
* Automatic cache invalidation
* Clean controller–service structure
* Uses `.env` for secure API tokens
* Full error handling & input validation

---

# 🎨 **Frontend (React — Modern UI/UX)**

## **1️⃣ Search Any City (Live AQI)**

* Clean animated search bar
* Auto-saved **recent searches**
* Works with Enter key & click
* Fast, crisp UI feedback

---

## **2️⃣ Dynamic AQI Category Badge**

Automatically classifies the AQI and applies color coding:

| AQI Value | Category                        |
| --------- | ------------------------------- |
| 0–50      | 🟢 Good                         |
| 51–100    | 🟡 Moderate                     |
| 101–150   | 🟠 Unhealthy (Sensitive Groups) |
| 151–200   | 🔴 Unhealthy                    |
| 201–300   | 🟣 Very Unhealthy               |
| 301+      | 🟤 Hazardous                    |

---

## **3️⃣ 🆕 Animated Risk Level Bar (Premium UI Component)**

A beautiful **animated meter bar** that responds to AQI:

✨ Smooth width animation
🌈 Gradient color fill
💡 Glow effect
❤️ Pulse animation
⚠️ Shake effect when AQI is hazardous
📱 Fully responsive

Adds a professional health-dashboard feel.

---

## **4️⃣ 🆕 Interactive AQI Mascot System**

A dynamic character that changes based on AQI:

| AQI Range | Mascot                            |
| --------- | --------------------------------- |
| 0–100     | 😊 Healthy / Happy character      |
| 101–200   | 😷 Mild coughing / Mask character |
| 200+      | 🤒 Severe / Danger character      |

Makes the interface fun, expressive, and instantly readable.

---

## **5️⃣ 🆕 AQI Health Care Tips**

Smart suggestions based on AQI:

* **Good (0–50):** “Enjoy freely, everything looks perfect!”
* **Moderate:** “People with asthma should stay cautious.”
* **Unhealthy:** “Wear a mask, avoid outdoor exercise.”
* **Hazardous:** “Stay indoors, use air purifiers.”

Improves real-world usability.

---

## **6️⃣ AQI Trend Chart (Chart.js)**

Includes:

* Past AQI values
* Color-coded bars
* Smooth transitions
* Auto-updates when city changes

Provides pollution trend visualization.

---

## **7️⃣ Favorites System**

* Save cities with one click
* Stored in **localStorage**
* Persistent across reloads
* Tap to instantly reload AQI

---

## **8️⃣ Recent Searches**

Automatically stores and displays your latest queries.

---

## **9️⃣ Light/Dark Theme Toggle**

* Global theme change
* Stored in localStorage
* Smooth animated transitions
* Applies to the entire UI

---

## **🔟 Framer Motion Animations Everywhere**

Subtle, premium micro-interactions applied to:

* Cards
* Text
* Risk meter
* Mascot
* Charts
* Search bar

Makes the app feel modern and app-like.

---

## **1️⃣1️⃣ AQI Interpretation Engine**

Automatically calculates:

* AQI category
* Risk level
* Bar color
* Mascot state
* Health tips
* Danger alerts

This intelligence powers the whole UI.

---

# 🧱 General Features

* Clean MERN folder structure
* API token hidden from frontend
* Environment-based config
* Fully mobile responsive
* Professional-grade UI design

---

# 🛠 Tech Stack

| Layer            | Technology                            |
| ---------------- | ------------------------------------- |
| **Frontend**     | React, Chart.js, Framer Motion, Axios |
| **Backend**      | Node.js, Express.js                   |
| **Database**     | MongoDB (with TTL caching)            |
| **API Provider** | AQICN (World Air Quality Index)       |

---

# 📡 API Endpoint

Base URL:
`http://localhost:4000`

| Method  | Endpoint                    | Description                         |
| ------- | --------------------------- | ----------------------------------- |
| **GET** | `/api/air?city=<city-name>` | Fetch AQI and store cached response |

---

# 🏃 Run Locally

## 📌 Prerequisites

* Node.js 16+
* MongoDB (local or cloud)
* AQICN API Token (get it here → [https://aqicn.org](https://aqicn.org))

---

# ⚙️ Backend Setup

```sh
cd backend
npm install
npm start
```

---

# 💻 Frontend Setup

```sh
cd frontend
npm install
npm start
```

---

# 📸 Screenshots

<img width="1887" height="866" alt="Screenshot 2025-11-26 124250" src="https://github.com/user-attachments/assets/88c57a45-fa4e-4894-87f0-3427a8a248ca" />

<img width="1893" height="853" alt="Screenshot 2025-11-26 124426" src="https://github.com/user-attachments/assets/c8d5f57e-2feb-4f57-8929-6673243a9dd9" />

