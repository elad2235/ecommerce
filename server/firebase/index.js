var admin = require("firebase-admin");

var serviceAccount = require("../config/fbAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
