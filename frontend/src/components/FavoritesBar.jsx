import React from "react";

export default function FavoritesBar({ favorites = [], onSelect }) {
  if (!favorites.length) return null;
  return (
    <div className="favorites">
      <div className="fav-title">Favorites:</div>
      <div className="fav-list">
        {favorites.map((f,i) => (
          <button key={i} className="fav-item" onClick={()=> onSelect(f)}>{f}</button>
        ))}
      </div>
    </div>
  );
}
