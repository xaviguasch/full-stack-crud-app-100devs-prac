const express = require('express')
const app = express()

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
const connectionString = `mongodb+srv://xaviguasch:${process.env.MONGODB_PASSWORD}@cluster0.fw77y.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(express.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          console.log(results)
        })
        .catch((error) => console.error(error))

      res.sendFile(__dirname + '/index.html')
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

    app.listen(3002, () => {
      console.log('listening on port 3002!!!')
    })
  })
  .catch((error) => console.error(error))
