const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
// const OSC = require('node-osc')

// const MAX_IP = '192.168.86.42'
// const MAX_IP = '0.0.0.0'
// const MAX_PORT = '2222'

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

http.listen(3000, () => {
  console.log('listening on *:3000')
})
