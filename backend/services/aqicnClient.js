const axios = require("axios");

async function fetchFromVendor(city) {
  const token = process.env.AQICN_TOKEN;

  if (!token) {
    console.error("❌ AQICN_TOKEN missing from .env");
    return null;
  }

  const url = `https://api.waqi.info/feed/${city}/?token=${token}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("❌ Vendor API error:", err.response?.data || err.message);
    return null;
  }
}

function normalize(vendorResponse) {
  try {
    if (!vendorResponse || vendorResponse.status !== "ok") return null;

    const data = vendorResponse.data;

    return {
      aqi: data.aqi,
      city: data.city?.name || "",
      geo: data.city?.geo || [],
      dominant: data.dominentpol || "",
      iaqi: data.iaqi || {},
      time: data.time || {},
      forecast: data.forecast?.daily || {},
      attributions: data.attributions || [],
    };
  } catch (err) {
    console.error("❌ normalize() error:", err);
    return null;
  }
}

module.exports = { fetchFromVendor, normalize };
