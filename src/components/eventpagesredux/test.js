const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: true,
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept"
  ],
  methods: ["POST", "OPTIONS"],
  credentials: true
});

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thumbprint-1c31n.firebaseio.com"
});
const geo = require("geofirex").init(admin);
//const {get} = require('geofirex')
//const firestoreRef = firestore().collection('planner').where('name', '==', 'Phoenix');

exports.doesUserPhoneExist = functions.https.onRequest((req, res) => {
  // Google Cloud Function res.methods
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Content-Type", "Application/JSON");
  // CORS-enabled req.methods, res.methods
  return cors(req, res, () => {
    res.set("Content-Type", "Application/JSON");
    var origin = req.get("Origin");
    var allowedOrigins = [
      "https://1c31n.csb.app",
      "https://1c31n.codesandbox.io",
      "https://www.1c31n.csb.app",
      "https://www.1c31n.codesandbox.io"
    ];
    if (allowedOrigins.indexOf(origin) > -1) {
      // Origin Allowed!!
      res.set("Access-Control-Allow-Origin", origin);
      if (req.method === "OPTIONS") {
        // Method accepted for next request
        res.set("Access-Control-Allow-Methods", "POST");

        //SEND or end
        return res.status(200).send({});
      } else {
        // After request req.method === 'OPTIONS'
        if (req.body.center && req.body.radius) {
          const center = req.body.center;
          const radius = req.body.radius;
          const field = req.body.field;
          const geoRef = geo.query(firestoreRef);
          const query = geoRef.within(center, radius, field);
          query.subscribe(hits => send.status(200).send(hits));
        } else {
          res.status(200).send("no center or radius sent with request body");
        }
      }
    } else {
      //Origin Bad!!
      //SEND or end
      return res.status(400).send("no access for this origin");
    }
    return res.status(200).send();
  });
});
