const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

const client = new MongoClient(url);

async function connect() {

    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbname);
        const collection = db.collection('dishes');

        const insertionResult = await collection.insertOne({ "name": "Kichri", "description": "Daal" });
        console.log('After result:\n');
        console.log(insertionResult);

        const findDishesResult = await collection.find({}).toArray();
        console.log('After result:\n');
        console.log(findDishesResult);

        await db.dropCollection('dishes');
        client.close();

    } catch (error) {
        assert.equal(error, null);
    }

}

connect();