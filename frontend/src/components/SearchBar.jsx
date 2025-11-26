import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch, placeholder = "Search city" }) {
  const [value, setValue] = useState("");
  const [suggests, setSuggests] = useState([]);

  useEffect(() => {
    try {
      const recent = JSON.parse(localStorage.getItem("aqi_recent") || "[]");
      setSuggests(recent);
    } catch {
      setSuggests([]);
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    onSearch(value);
  }

  function pick(s) {
    setValue(s);
    onSearch(s);
  }

  return (
    <form className="searchbar-component" onSubmit={submit}>
      <input
        value={value}
        onChange={e=> setValue(e.target.value)}
        placeholder={placeholder}
        list="recent_suggestions"
      />
      <button className="btn primary" type="submit">Search</button>

      {suggests.length>0 && (
        <div className="suggests">
          {suggests.slice(0,6).map((s,idx) => (
            <button key={idx} className="suggest" onClick={(ev)=> { ev.preventDefault(); pick(s); }}>
              {s}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
