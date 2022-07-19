const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3002, () => {
  console.log('listening on port 3002!!!')
})
