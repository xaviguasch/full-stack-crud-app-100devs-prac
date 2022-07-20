const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

require('dotenv').config()

const connectionString = `mongodb+srv://xaviguasch:${process.env.MONGODB_PASSWORD}@cluster0.fw77y.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/', (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          // console.log(results)
          res.render('index.ejs', { quotes: results })
        })
        .catch((error) => console.error(error))
    })

    app.post('/quotes', (req, res) => {
      const { name, quote } = req.body

      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result)
          res.redirect('/')
        })
        .catch((error) => console.error(error))
    })

    app.put('/quotes', (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: 'Yoda' },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          { upsert: true }
        )
        .then((result) => {
          res.json('success')
        })
        .catch((error) => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json("Deleted Darth Vader's quote")
        })
        .catch((error) => console.error(erro))
    })

    app.listen(3002, () => {
      console.log('listening on port 3002!!!')
    })
  })
  .catch((error) => console.error(error))
