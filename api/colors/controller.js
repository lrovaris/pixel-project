const db = require('./db');
const cache = require('../memoryCache');

async function get_color_palletes() {
  return cache.get('colors') || await db.get_color_palletes();
}

module.exports = {  get_color_palletes };
