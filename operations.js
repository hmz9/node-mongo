const assert = require('assert');

exports.insertDocument = async (db, document, collection) => {

    const coll = db.collection(collection);
    return coll.insertOne(document);

}

exports.findDocuments = async (db, collection) => {

    const coll = db.collection(collection);
    return coll.find({}).toArray();

}

exports.removeDocument = async (db, document, collection) => {

    const coll = db.collection(collection);
    return coll.deleteOne(document);

}

exports.updateDocument = async (db, document, update, collection) => {

    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update });

}