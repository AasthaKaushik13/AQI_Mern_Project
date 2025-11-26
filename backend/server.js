
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const airRouter = require('./routes/air');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aqi_cache_db';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.warn('MongoDB connection warning:', err.message || err);
});

app.get('/api/health', async (req, res) => {
  const mongoState = mongoose.connection.readyState;
  res.json({ status: 'ok', mongoState });
});

app.use('/api/air', airRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`AQI backend listening on ${PORT}`));
