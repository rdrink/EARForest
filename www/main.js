/* global io */
const socket = io()

socket.on('proxy-status', (data) => {
  console.log(data)
  if (data[0] === 'int' && data[1] === 0) {
    toggle.textContent = 'Start'
    toggle.style.backgroundColor = 'hsl(337, 38%, 50%)'
  } else if (typeof data[0] === 'string' && data[0] !== 'int') {
    document.querySelector('#filename').textContent = data[0]
  }
})

socket.on('clients-updated', (num) => {
  document.querySelector('#connected-clients').textContent = num
})

function clickButton () {
  if (toggle.textContent === 'Start') {
    toggle.textContent = 'Playing...'
    toggle.style.backgroundColor = 'hsl(103, 38%, 50%)'
    socket.emit('status', 1)
  } else {
    toggle.textContent = 'Start'
    toggle.style.backgroundColor = 'hsl(337, 38%, 50%)'
  }
}

const toggle = document.querySelector('#toggle')

toggle.addEventListener('click', clickButton)
