const io = require('socket.io-client')
const OSC = require('node-osc')

const MAX_IP = '0.0.0.0'
const MAX_PORT = '2222'
// const serverURL = 'http://localhost:3000'
const serverURL = 'http://165.232.132.201'
const socket = io(serverURL)

socket.on('connect', () => {
  console.log('Connected to server ' + serverURL)
  socket.on('proxy-status', (data) => {
    console.log('got message', data)
    const client = new OSC.Client(MAX_IP, MAX_PORT)
    client.send(`/status ${data}`, 200, () => client.close())
  })
})
