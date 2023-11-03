require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.SERVER_PORT
// const OSC = require('node-osc')

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('status', (data) => {
    console.log('received', data)
    // const client = new OSC.Client(MAX_IP, MAX_PORT)
    // client.send(`/status ${data}`, 200, () => client.close())
    socket.broadcast.emit('proxy-status', data)
  })
})

http.listen(port, () => {
  console.log(`listening on port ${port}`)
})
