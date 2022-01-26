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
  const collection = client.db("Food_BD").collection('inventory');


  app.post('/data', (req, res) => {
    const products = {
        item: 'canvas',
        qty: 100,
        tags: ['cotton'],
        size: { h: 28, w: 35.5, uom: 'cm' }
      }

      collection.insertMany(products)
      .then(result => {
        console.log(result.insertedCount)
        res.send(result.insertedCount > 0)

      })

  })

});
app.listen(3100, console.log('Hello world'))