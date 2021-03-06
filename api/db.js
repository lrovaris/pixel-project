const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || "mongodb+srv://Ademir:9Dyo5zhppA2JS6mH@cluster0-fmuw8.mongodb.net/PixelProject?retryWrites=true&w=majority";

let client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true   });
let connection;
let database;

async function init_db(){
  client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true   });

  try {
    connection = await client.connect();
    database = await client.db('PixelProject');
    console.log("Conectado");

  } catch (e) {
    console.log(e);

  }

  return database;
}

async function get_db() {
  return database || await init_db()
}

module.exports = {
    init_db,
    get_db
};
