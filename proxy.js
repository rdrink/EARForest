require('dotenv').config()
const io = require('socket.io-client')
const OSC = require('node-osc')

const MAX_IP = process.env.MAX_IP
const MAX_PORT = process.env.MAX_PORT

const oscServer = new OSC.Server(3333, '0.0.0.0', () => {
  console.log('OSC Server is listening')
})

oscServer.on('message', function (msg) {
  console.log(`Message: ${msg}`)
  socket.emit('status', msg)
  // oscServer.close()
})

const serverURL = `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`
console.log(`reaching out to ${serverURL}`)

const socket = io(serverURL)
socket.on('connect', () => {
  console.log('Connected to server ' + serverURL)

  socket.on('proxy-status', (data) => {
    console.log('got message', data)
    const client = new OSC.Client(MAX_IP, MAX_PORT)
    client.send(`/status ${data}`, 200, () => client.close())
  })

})
