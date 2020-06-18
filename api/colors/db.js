const ObjectId = require('mongodb').ObjectId;
const db_utils = require('../db.js');

const cache = require('../memoryCache');

async function get_color_palletes() {
    let db_conn = await db_utils.get_db();

    let db_entries = await db_conn.collection("colors").find({}).toArray();

    cache.set("colors", db_entries);

    return db_entries;
}

async function register_color_pallete(new_pallete) {
  let db_conn = await db_utils.get_db();

  let new_pallete_db = await db_conn.collection("colors").insertOne(new_pallete)

  await get_color_palletes();

  console.log("Imagem nova cadastrada");

  return new_pallete_db.ops[0];
}

async function delete_color_pallete(pallete_id) {
  db_conn = await db_utils.get_db();

  let delete_action = await db_conn.collection("colors").deleteOne( { _id: new ObjectId(pallete_id) })

  await get_color_palletes();

  return delete_action.ops;
}

module.exports = { get_color_palletes, register_color_pallete, delete_color_pallete  };
