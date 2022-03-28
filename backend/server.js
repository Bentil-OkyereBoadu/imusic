const http = require('http')
const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const server = http.createServer(app)
const connectDB = require('./config/db')
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const morgan = require('morgan');
const request = require('request')

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
// app.use(notFound)
// app.use(errorHandler)


//spotify authentication
app.get('/auth/login', (req, res) => {

    let scope = "streaming \
                 user-read-email \
                 user-read-private"
  
    let state = generateRandomString(16);
  
    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: "http://localhost:4000/auth/callback",
      state: state
    })
  
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
  })

  let access_token;

  app.get('/auth/callback', (req, res) => {

    const code = req.query.code;
  
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:4000/auth/callback",
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        res.redirect('http://localhost:3000/session')
        // res.json({ access_token: access_token })
      }
    });
  })

  app.get('/auth/token', (req, res) => {
    res.json({
          access_token: access_token
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