import React, { useEffect, useState } from "react";
import "./styles.css";
import AQICard from "./components/AQICard";
import SearchBar from "./components/SearchBar";
import FavoritesBar from "./components/FavoritesBar";
import { motion } from "framer-motion";
import AQIMascot from "./components/AQIMascot";


export default function App() {
  const [city, setCity] = useState("");
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("aqi_dark");
    return saved ? JSON.parse(saved) : true;
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aqi_favs")) || []; } catch { return []; }
  });

  // Apply theme by setting data-theme on <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("aqi_dark", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("aqi_favs", JSON.stringify(favorites));
  }, [favorites]);

  async function searchCity(q) {
    if (!q || !q.trim()) { setErr("Please enter a city"); return; }
    setErr(null);
    setLoading(true);
    setPayload(null);
    try {
      const encoded = encodeURIComponent(q.trim());
      const res = await fetch(`http://localhost:4000/api/air?city=${encoded}`);
      const body = await res.json();
      if (!res.ok) {
        setErr(body.error || "Vendor error");
      } else {
        setPayload(body);
        // push to favorites suggestion cache (recent)
        const recent = JSON.parse(localStorage.getItem("aqi_recent") || "[]");
        const normalized = q.trim();
        if (!recent.includes(normalized)) {
          localStorage.setItem("aqi_recent", JSON.stringify([normalized, ...recent].slice(0, 10)));
        }
      }
    } catch (e) {
      setErr("Backend unreachable. Start backend and check .env.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(cityName) {
    if (!cityName) return;
    setFavorites(prev => {
      if (prev.includes(cityName)) return prev.filter(x => x !== cityName);
      return [cityName, ...prev].slice(0, 10);
    });
  }


  const getCareTips = (aqi) => {
  if (!aqi) return null;

  if (aqi <= 50) {
    return {
      status: "Excellent Air Quality",
      tips: [
        "Enjoy outdoor activities 🏃‍♀️🌳",
        "Perfect time for a walk or workout",
        "Open windows for ventilation"
      ],
      color: "var(--good)"
    };
  }

  if (aqi <= 100) {
    return {
      status: "Moderate — Acceptable",
      tips: [
        "Sensitive people should avoid heavy outdoor activity",
        "Keep hydration in check 💧",
        "Light outdoor exercise is okay"
      ],
      color: "var(--moderate)"
    };
  }

  if (aqi <= 150) {
    return {
      status: "Unhealthy for Sensitive Groups",
      tips: [
        "Wear a light mask outdoors 😷",
        "Avoid long outdoor runs",
        "People with asthma should be cautious"
      ],
      color: "var(--usg)"
    };
  }

  if (aqi <= 200) {
    return {
      status: "Unhealthy Air",
      tips: [
        "Reduce outdoor activity",
        "Use an N95 mask outdoors",
        "Air purifier recommended 🔆"
      ],
      color: "var(--unhealthy)"
    };
  }

  if (aqi <= 300) {
    return {
      status: "Very Unhealthy",
      tips: [
        "Avoid going outdoors ❌",
        "Mask essential (N95)",
        "Run air purifier inside"
      ],
      color: "var(--very-unhealthy)"
    };
  }

  return {
    status: "Hazardous Air — Dangerous",
    tips: [
      "Stay indoors as much as possible 🚫",
      "Use A/C or purifier with closed windows",
      "Wear N95 if you must go out",
      "Avoid physical activity completely"
    ],
    color: "var(--hazardous)"
  };
};
const getRiskLevel = (aqi) => {
  if (!aqi) return { label: "Unknown", percent: 0, color: "#888", glow: "0 0 8px #777" };

  if (aqi <= 50)
    return { label: "Good", percent: 20, color: "#00c853", glow: "0 0 10px #00c85388" };

  if (aqi <= 100)
    return { label: "Moderate", percent: 40, color: "#ffeb3b", glow: "0 0 10px #ffeb3b88" };

  if (aqi <= 150)
    return { label: "Unhealthy (SG)", percent: 60, color: "#ff9800", glow: "0 0 10px #ff980088" };

  if (aqi <= 200)
    return { label: "Unhealthy", percent: 75, color: "#f44336", glow: "0 0 10px #f4433688" };

  if (aqi <= 300)
    return { label: "Very Unhealthy", percent: 90, color: "#9c27b0", glow: "0 0 12px #9c27b088" };

  return {
    label: "Hazardous",
    percent: 100,
    color: "#6a1b1a",
    glow: "0 0 14px #ff0000cc",
    shake: true
  };
};


  return (
    <div className="page-wrap">
      <header className="hero">
        <motion.div initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.6}}>
          <h1 className="hero-title">Air Quality Explorer</h1>
          <p className="hero-sub">Search AQI by city — live data and health insights</p>
        </motion.div>

        <div className="controls-row">
          <SearchBar
            onSearch={(q)=> { setCity(q); searchCity(q); }}
            placeholder="Search city (e.g. Delhi, London)"
          />
          <div className="toggles">
            <button
              className="btn ghost theme-toggle"
              onClick={()=> setDark(d => !d)}
              aria-label="Toggle theme"
            >
              <span className="toggle-emoji">{dark ? "🌙" : "☀️"}</span>
              <span className="toggle-text">{dark ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>

        <FavoritesBar favorites={favorites} onSelect={q => { setCity(q); searchCity(q); }} />

        {/* AQI CARE TIPS SECTION */}
{payload?.data?.aqi && (
  <motion.div
    className="care-tips-card glass"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {(() => {
      const advice = getCareTips(payload.data.aqi);
      return (
        <>
          <h3 className="care-title" style={{ color: advice.color }}>
            {advice.status}
          </h3>
          <ul className="care-list">
            {advice.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </>
      );
    })()}
  </motion.div>
)}
{/* RISK LEVEL METER */}
{payload?.data?.aqi && (
  <motion.div
    className="risk-meter-card glass"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {(() => {
      const r = getRiskLevel(payload.data.aqi);
      return (
        <>
          <div className="risk-meter-header">
            <span>Risk Level:</span>
            <strong style={{ color: r.color }}>{r.label}</strong>
          </div>

          <div className={`risk-meter-track ${r.shake ? "shake" : ""}`}>
            <motion.div
              className="risk-meter-fill"
              style={{
                background: `linear-gradient(90deg, ${r.color}, #ffffff22)`,
                boxShadow: r.glow
              }}
              animate={{ width: r.percent + "%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </>
      );
    })()}
  </motion.div>
)}


      </header>

      <main className="main">
        <motion.div layout className="content-grid">
          <motion.section layout className="left-col">
            {loading && <div className="skeleton-card shimmer" />}
            {err && <div className="notice error">{err}</div>}
            {payload && <AQICard payload={payload} onToggleFav={() => toggleFavorite(payload.data?.city?.name)} />}
          </motion.section>

                    {/* Floating mascot based on AQI */}
          {payload?.data?.aqi && (
            <AQIMascot aqi={payload.data.aqi} />
          )}


          <aside className="right-col">
            <div className="panel glass">
              <h4>How it works</h4>
              <p>Data provided by AQICN. Cached server-side for faster results.</p>
            </div>

            <div className="panel glass">
              <h4>Recent searches</h4>
              <RecentList onPick={(q) => { setCity(q); searchCity(q); }} />
            </div>
          </aside>
        </motion.div>
      </main>

      <footer className="footer">
        <small>Built with ❤️ — AQICN API</small>
      </footer>
    </div>
  );
}

function RecentList({ onPick }) {
  const recent = JSON.parse(localStorage.getItem("aqi_recent") || "[]");
  if (!recent.length) return <div className="muted">No recent searches</div>;
  return (
    <div className="chip-list">
      {recent.map((r,i)=> (
        <button key={i} className="chip" onClick={()=> onPick(r)}>{r}</button>
      ))}
    </div>
  );
}
