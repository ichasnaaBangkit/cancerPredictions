const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore();
   
    const predictCollection = db.collection('predictions');
    console.log("masuk2");
    return predictCollection.doc(id).set(data);
  }
   
  module.exports = storeData;