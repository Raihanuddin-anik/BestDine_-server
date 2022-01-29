const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Food_Hunter:Food431760@cluster0.ostva.mongodb.net/Food_BD?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Food_BD").collection('Organic_Food');
  const IngredientCollection = client.db("Food_BD").collection('ingredient');
  const OrdersCollection = client.db("Food_BD").collection('orders');

  app.get('/Meals', (req, res) => {
    collection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

 

  app.get('/Ingredients', (req, res) => {
    IngredientCollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })
  app.post('/addOrder', (req, res) => {
    const Order = req.body
    OrdersCollection.insertOne(Order)
      .then(result => {
        res.send(result.insertedCount > 0)

      })

  })

});
var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);