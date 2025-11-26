
import React, { useMemo } from "react";
import "./AQICard.css";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AQICard({ payload, onToggleFav }) {
  const data = payload.data || {};
  const cityObj = data.city || {};
  const cityName = (typeof cityObj === "string") ? cityObj : (cityObj.name || "Unknown");
  const aqi = (typeof data.aqi === "number") ? data.aqi : (Number(data.aqi) || 0);
  const iaqi = data.iaqi || {};
  const forecast = data.forecast?.pm25 || [];

  const iaqiEntries = useMemo(() => Object.entries(iaqi).map(([k,v]) => ({k, v: v?.v ?? v})), [iaqi]);

  const chartData = {
    labels: forecast.map(f=> f.day),
    datasets: [{ label: "PM2.5 (forecast avg)", data: forecast.map(f=> f.avg ?? 0), borderWidth: 1 }]
  };

  function getColor(v) {
    if (v <= 50) return "#16a34a";
    if (v <= 100) return "#f59e0b";
    if (v <= 150) return "#f97316";
    if (v <= 200) return "#ef4444";
    if (v <= 300) return "#8b5cf6";
    return "#7c2d12";
  }

  const color = getColor(aqi);

  return (
    <motion.div className="card glass-card" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{duration:0.45}}>
      <div className="card-header">
        <div>
          <h3 className="city">{cityName}</h3>
          <div className="meta small">Source: {payload.source}</div>
        </div>

        <div className="aqi-badge">
          <div className="aqi-val">{aqi}</div>
          <div className="aqi-label">AQI</div>
        </div>
      </div>

      <div className="card-body">
        <div className="left">
          <div className="ring-wrap">
            <AQIRing value={aqi} color={color} />
          </div>

          <div className="iaqi-list">
            {iaqiEntries.map(it => (
              <div key={it.k} className="iaqi-row">
                <div className="iaqi-key">{it.k.toUpperCase()}</div>
                <div className="iaqi-val">{it.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="right">
          <div className="panel small glass">
            <div><strong>Dominant</strong></div>
            <div>{data.dominentpol || "N/A"}</div>
            <div className="muted small">Updated: {data.time?.s || "N/A"}</div>
          </div>

          <div className="panel glass">
            <Bar data={chartData} />
          </div>

          <div className="panel glass actions">
            <button className="btn ghost" onClick={()=> onToggleFav && onToggleFav(cityName)}>☆ Favorite</button>
            <a className="btn link" href={cityObj.url || "#"} target="_blank" rel="noreferrer">Open station</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AQIRing({ value = 0, color = "#16a34a" }) {
  const pct = Math.min(100, (Number(value) || 0) / 300 * 100);
  const stroke = 12;
  const size = 140;                 // ring outer size
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct/100) * c;

  return (
    <svg width={size} height={size} className="aqi-ring" viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={`g-${color.replace('#','')}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color}/>
          <stop offset="100%" stopColor="#ffffff"/>
        </linearGradient>
      </defs>

      <g transform={`translate(${size/2}, ${size/2})`}>
        {/* background track */}
        <circle r={r} fill="none" stroke="var(--ring-track)" strokeWidth={stroke} />
        {/* animated progress */}
        <circle
          r={r}
          fill="none"
          stroke={`url(#g-${color.replace('#','')})`}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${Math.max(0, c - dash)}`}
          strokeLinecap="round"
          transform="rotate(-90)"
          style={{ transition: "stroke-dasharray 0.9s ease, stroke 0.5s ease" }}
        />
        {/* inner white circle */}
        <circle r={r - stroke*0.45} fill="var(--card-bg)" stroke="transparent" />
        {/* number */}
        <text x="0" y="-4" textAnchor="middle" fill="var(--text)" fontSize="26" fontWeight="700">{Number(value)}</text>
        {/* label */}
        <text x="0" y="20" textAnchor="middle" fill="var(--muted)" fontSize="12">AQI</text>
      </g>
    </svg>
  );
}
