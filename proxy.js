require('dotenv').config()
const io = require('socket.io-client')
const OSC = require('node-osc')

const MAX_IP = process.env.MAX_IP
const MAX_PORT = process.env.MAX_PORT

const serverURL = `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`
const socket = io(serverURL)
console.log(`listening to ${serverURL}`)

socket.on('connect', () => {
  console.log('Connected to server ' + serverURL)
  socket.on('proxy-status', (data) => {
    console.log('got message', data)
    const client = new OSC.Client(MAX_IP, MAX_PORT)
    client.send(`/status ${data}`, 200, () => client.close())
  })
})
