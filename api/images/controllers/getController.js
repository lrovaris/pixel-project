const db = require('../db');
const cache = require('../../memoryCache');

async function get_metadata() {
  return cache.get('images') || await db.get_metadata();
}

async function get_metadata_by_id(meta_id) {

  let all_metadata = await get_metadata();

  let this_metadata = all_metadata.find(meta_obj => meta_obj._id.toString() === meta_id.toString())

  return this_metadata;
}

module.exports = {
  get_metadata,
  get_metadata_by_id
};
