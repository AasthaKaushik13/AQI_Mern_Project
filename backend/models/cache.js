
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CacheSchema = new Schema({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

// TTL index will be set by code (expire after seconds) or via environment when creating index.
module.exports = mongoose.model('AqiCache', CacheSchema);
