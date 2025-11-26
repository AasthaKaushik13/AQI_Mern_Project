
const express = require('express');
const router = express.Router();
const AqiCache = require('../models/cache');
const { fetchFromVendor, normalize } = require('../services/aqicnClient');
const mongoose = require('mongoose');

const ttlSeconds = parseInt(process.env.CACHE_TTL_SECONDS || '300', 10);

// ensure TTL index exists
(async function ensureIndex(){
  try {
    await AqiCache.collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds: ttlSeconds });
  } catch(e){
    // index exists or error
  }
})();

router.get('/', async (req, res) => {
  const city = req.query.city;
  if(!city || city.trim() === '') return res.status(400).json({ error: 'Missing city query param' });
  const key = city.trim().toLowerCase();

  try {
    // check cache
    const cached = await AqiCache.findOne({ key }).lean();
    if (cached && cached.data) {
      return res.json({ source: 'cache', data: cached.data });
    }

    // fetch vendor
    const vendor = await fetchFromVendor(city);
    if(!vendor) return res.status(502).json({ error: 'vendor_empty' });

    if(vendor.status !== 'ok') {
      return res.status(502).json({ error: 'vendor_error', vendor });
    }

    const normalized = normalize(vendor);

    // upsert into cache
    await AqiCache.updateOne(
      { key },
      { $set: { key, data: normalized, createdAt: new Date() } },
      { upsert: true }
    );

    return res.json({ source: 'vendor', data: normalized });
  } catch (err) {
    console.error(err);
    if (err.response) {
      return res.status(502).json({ error: 'vendor_error', details: err.response.data || err.response.status });
    }
    return res.status(500).json({ error: 'internal_error', message: err.message });
  }
});

module.exports = router;
