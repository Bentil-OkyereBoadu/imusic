const express = require("express")
const {chats} = require('./data/data')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.get('/', (req, res) => {
    res.send('api is running successfully')
})

app.get('/api/chat', (req, res) => {
    res.send(chats);

})

app.get('/api/chat/:id', (req, res) => {
    const id = req.params.id;
    const singleChat = chats.find( chat => chat._id === id)
    res.send(singleChat);
})

 
const PORT = process.env.PORT || 5000
app.listen( PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})