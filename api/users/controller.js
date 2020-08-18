const db = require('./db');
const cache = require('../memoryCache');

async function get_users() {
  return cache.get('users') || await db.get_users();
}

async function get_user_by_email(email) {

  let all_users = await get_users();

  console.log(email);

  let this_user = all_users.find(user_obj => user_obj.email.toString().toLowerCase() === email.toString().toLowerCase())

  console.log(this_user);

  return this_user;
}


module.exports = {
  get_users,
  get_user_by_email
};
