const ObjectId = require('mongodb').ObjectId;
const db_utils = require('../db.js');

const cache = require('../memoryCache');

async function get_users() {
    let db_conn = await db_utils.get_db();

    let db_entries = await db_conn.collection("users").find({}).toArray();

    cache.set("users", db_entries);

    return db_entries;
}

async function register_user(new_user) {
  let db_conn = await db_utils.get_db();

  let new_entry = await db_conn.collection("users").insertOne(new_user)

  await get_users();

  console.log("Usuário novo cadastrado");

  return new_entry.ops[0];
}

async function update_user(user) {
  let db_conn = await db_utils.get_db();

  let updated_user = await db_conn.collection("users").replaceOne({_id: new ObjectId(user._id) }, user,{w: "majority", upsert: false});

  console.log(`Modificados ${updated_user.result.nModified} elementos`);

  await get_users();

  return updated_user.ops[0];
}

async function delete_user(user_id) {
  db_conn = await db_utils.get_db();

  let delete_action = await db_conn.collection("users").deleteOne( { _id: new ObjectId(user_id) })

  await get_users();

  return delete_action.ops;
}

module.exports = {
  get_users,
  register_user,
  update_user,
  delete_user  };
