const ObjectId = require('mongodb').ObjectId;
const db_utils = require('../db.js');

const cache = require('../memoryCache');

async function get_metadata() {
    let db_conn = await db_utils.get_db();

    let db_entries = await db_conn.collection("images").find({}).toArray();

    cache.set("images", db_entries);

    return db_entries;
}

async function register_metadata(new_entries) {
  let db_conn = await db_utils.get_db();

  let new_entry = await db_conn.collection("images").insertOne(new_entries)

  await get_metadata();

  console.log("Imagem nova cadastrada");

  return new_entry.ops[0];
}

module.exports = { get_metadata, register_metadata };
