var MongoClient = require('mongodb').MongoClient;

const customers = require('./customers.json')
const products = require('./products.json')

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
     if(err) throw err;
     const db = client.db('store')
     db.collection('customers', (err, collection) => {
      if(err) throw err;
       customers.forEach(customer => {
         collection.insert(customer)
       })
     })
     db.collection('products', (err, collection) => {
      if(err) throw err;
      products.forEach(product => {
        collection.insert(product)
      })
    })
});

setTimeout(() => {
  console.log('Customers and Products created')
  process.exit()
}, 2000)