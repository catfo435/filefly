const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

require('dotenv').config()

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS)
let {private_key} = serviceAccount
private_key = private_key.replace(/\\n/g, '\n')

serviceAccount['private_key'] = private_key

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getVals(){
  const snapshot = await db.collection('users').get();
snapshot.forEach(async (doc) => {
  const snapshot = await db.collection('passkeys').get(doc.id);
  snapshot.forEach((doc) => {
    console.log(doc.data());
  })
});
}

