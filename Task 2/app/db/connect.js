const { MongoClient } = require("mongodb");


const myConnect = (cd) => {
  MongoClient.connect(process.env.dbUrl, (err, client) => {
    if (err) return cd(err, null);
    const db = client.db(process.env.dbName);
    cd(null, db);
  });
};


module.exports = myConnect;
