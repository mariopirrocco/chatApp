const socket = io()

const formMessage = document.querySelector('#formMessage')
const userNameInput = document.querySelector('#userNameInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const sendMessage = () => {
	try {
		const username = userNameInput.value
		const message = messageInput.value
		
		socket.emit('client:messages', { username, message })
	} catch(err) {
		console.log(err)
	}
}

const renderMessages = (messagesArray) => {
	try {
		const html = messagesArray.map((messageInfo) => {
			return `<div><strong>${messageInfo.username}: </strong>${messageInfo.message}</div>`
		}).join(" ")
		messagesPool.innerHTML = html
	} catch(err) {
		console.log(err)
	}
}

formMessage.addEventListener('submit', (e) => {
	e.preventDefault()
	sendMessage()
})

socket.on('server:messages', renderMessages)



