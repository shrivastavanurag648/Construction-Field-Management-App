const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri);


async function run() {
  try {
    await client.connect();
    
    // Select database
    const db = client.db('mongodbVSCodePlaygroundDB');
    
    // Select collection
    const salesCollection = db.collection('sales');

    // Insert documents
    await salesCollection.insertMany([
      { item: 'abc', price: 10, quantity: 2, date: new Date('2014-03-01T08:00:00Z') },
      { item: 'jkl', price: 20, quantity: 1, date: new Date('2014-03-01T09:00:00Z') },
      { item: 'xyz', price: 5, quantity: 10, date: new Date('2014-03-15T09:00:00Z') },
      { item: 'xyz', price: 5, quantity: 20, date: new Date('2014-04-04T11:21:39.736Z') },
      { item: 'abc', price: 10, quantity: 10, date: new Date('2014-04-04T21:23:13.331Z') },
      { item: 'def', price: 7.5, quantity: 5, date: new Date('2015-06-04T05:08:13Z') },
      { item: 'def', price: 7.5, quantity: 10, date: new Date('2015-09-10T08:43:00Z') },
      { item: 'abc', price: 10, quantity: 5, date: new Date('2016-02-06T20:20:13Z') },
    ]);

    // Query example
    const salesOnApril4th = await salesCollection.countDocuments({
      date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
    });
    

    console.log(`${salesOnApril4th} sales occurred on April 4th, 2014.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

