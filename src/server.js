const express = require('express')
const app = express()
const port = 8080
const serverExpress = app.listen(port, () => console.log(`Listening on port: ${port}`))
const { Server: IOServer } = require('socket.io')
const io =  new IOServer(serverExpress)
const messages = []
const path = require('path')

app.use(express.static(path.join(__dirname, './public')))

io.on('connection', socket => {
	console.log('Se conectó un usuario - ID:', socket.id)
	io.emit('server:messages', messages)
	
	socket.on('client:messages', messageInfo => {
		messages.push(messageInfo)
		io.emit('server:messages', messages)
	})
})
