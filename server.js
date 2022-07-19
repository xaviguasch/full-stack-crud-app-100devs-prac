const express = require('express')
const bodyParser = require('body-parser')
const app = express()

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
const connectionString = `mongodb+srv://xaviguasch:${process.env.MONGODB_PASSWORD}@cluster0.fw77y.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to mongo database')
})

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  const { name, quote } = req.body

  console.log(req.body)
})

app.listen(3002, () => {
  console.log('listening on port 3002!!!')
})

console.log(process.env.MONGODB_PASSWORD)
