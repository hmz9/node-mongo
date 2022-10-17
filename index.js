const { MongoClient } = require('mongodb');
const assert = require('assert');
const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

const client = new MongoClient(url);

const connect = async () => {

    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbname);
        const collection = db.collection('dishes');

        const insertionResult = await collection.insertOne({ "name": "Kichri", "description": "Daal" });
        console.log('After result:\n');
        console.log(insertionResult);

        dbOperations.findDocuments(db, 'dishes')
            .then((result) => {
                console.log(result)
                return dbOperations.insertDocument(db, { "name": "Biryani", "description": "Food, Rice" }, 'dishes');
            })
            .then((result) => {
                console.log(result)
                return dbOperations.findDocuments(db, 'dishes');
            })
            .then((result) => {
                console.log(result)
                return dbOperations.updateDocument(db, { name: "Biryani" }, { "name": "Daal", "description": "Food" }, 'dishes');
            })
            .then((result) => {
                console.log(result)
                return dbOperations.findDocuments(db, 'dishes');
            })
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });

        const result = await dbOperations.findDocuments(db, 'dishes');

        // console.log(result);

        // const findDishesResult = await collection.find({}).toArray();
        // console.log('After result:\n');
        // console.log(findDishesResult);

        await db.dropCollection('dishes');
        client.close();

    } catch (error) {
        assert.equal(error, null);
    }

}

connect();