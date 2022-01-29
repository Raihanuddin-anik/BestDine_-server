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


  app.post('/addMeals', (req, res) => {
    const products = req.body
    console.log(products)
    collection.insertMany(products)
      .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0)

      })

  })

  app.get('/Meals', (req, res) => {
    collection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  app.post('/addIngredient', (req, res) => {
    const products = req.body
    IngredientCollection.insertMany(products)
      .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0)

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
    console.log(Order)
    OrdersCollection.insertOne(Order)
      .then(result => {
        console.log(result)
        console.log(result.insertedCount)
        res.send(result.insertedCount > 0)

      })

  })

});
app.listen(3100, console.log('Hello world'))