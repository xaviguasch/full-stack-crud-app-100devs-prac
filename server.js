const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

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
