require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.SERVER_PORT

let connectedClients = 0

app.use(express.static('www'))

io.on('connection', (socket) => {
  connectedClients++
  socket.emit('clients-updated', connectedClients)
  socket.broadcast.emit('clients-updated', connectedClients)

  socket.on('status', (data) => {
    console.log('received', data)
    socket.broadcast.emit('proxy-status', data)
  })

  socket.on('disconnect', () => {
    connectedClients--
    socket.broadcast.emit('clients-updated', connectedClients)
  })

  console.log(`${connectedClients} users connected`)
})

http.listen(port, () => {
  console.log(`listening on port ${port}`)
})
