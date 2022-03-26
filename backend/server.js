const http = require('http')
const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const server = http.createServer(app)
const querystring = require('query-string')
// const {chats} = require('./data/data')
const connectDB = require('./config/db')
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const morgan = require('morgan');

app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) //for the server to accept JSON data
dotenv.config()

//connecting database
connectDB()


//getting client id and redirect uri from .env file
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;


//generate random string (hash) as code verifier for spotify api
const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
     return text;
  };


/**getting user routes */
app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes)

/**Handle error */
app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat/:id', (req, res) => {
//     const id = req.params.id;
//     const singleChat = chats.find( chat => chat._id === id)
//     res.send(singleChat);
// })



//spotify authentication
app.get('/auth', (req, res) =>{
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&state=${state}`, 302)
})
// querystring.stringify({
//   response_type: 'code',
//   client_id: client_id,
//   scope: scope,
//   redirect_uri: redirect_uri,
//   state: state
// }));

app.get('/callback', (req, res) => {
    let access_token = req.query.access_token || null;
    let expires_in = req.query.expires_in || null;
    let token_type = req.query.token_type || null;

    if (access_token === null) {
        res.redirect('/#' + querystring.stringify({ 
            error: 'state_mismatch'
        }))
    } else {
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                access_token: access_token,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code',
                expires_in: expires_in,
                token_type: token_type,
            },
            headers: {
                'Authorization' : 'Bearer ' + (new Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
            },
            json: true
        };
        res.send(authOptions);
    }
})

app.get('/refresh_token', (req, res) =>{
    let refresh_token = req.query.refresh_token;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization' : 'Basic ' + (new Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    req.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200){
            let access_token = body.access_token;

            localStorage.setItem('refresh_token', res.send({
                'access_token': access_token
            }))
        }
    })
})

 
const PORT = process.env.PORT || 5000;
const service = server.listen( PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})

const io = require('socket.io')(service, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    }
})

io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData)=> {
        socket.join(userData._id);
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined room: '+ room)
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));


    socket.on('new message', (newMessage) => {
        let chat = newMessage.chat;

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach( user => {
            if(user._id == newMessage.sender._id) return;

            socket.in(user._id).emit('message received', newMessage);
        })
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
})