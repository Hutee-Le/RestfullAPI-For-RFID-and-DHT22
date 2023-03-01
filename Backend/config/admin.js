const admin = require("firebase-admin");

// cấu hình Firebase Admin SDK

var serviceAccount = require("./rfid-7f3b2-firebase-adminsdk-sf2b5-94ab273139.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

var db= admin.firestore();
module.exports = {db};