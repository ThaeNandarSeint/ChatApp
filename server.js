const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io')
const morgan = require('morgan')

const app = express();
require('dotenv').config();

// routes
const userRoutes = require('./routes/userRoute')
const messagesRoutes = require('./routes/messageRoute');

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth/', userRoutes);
app.use('/api/messages/', messagesRoutes);

// protect node app crashed when occur error
// app.use(morgan('dev'))

// app.use((req, res, next)=>{
//     const error = new Error('Not Found')
//     error.status(404);
//     next(error);
// })
// app.use((error, req, res, next)=>{
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

// mongodb connect & server setup
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(()=>console.log('Mongodb is connected')).catch((err)=>console.log(err.message))

const server = app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`))

// socket setup
const ORIGIN = process.env.ORIGIN
const io = socket(server, {
    cors:{
        origin: `${ORIGIN}`,
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on('connection', (socket)=>{
    global.chatSocket = socket;
    socket.on('add-user', (userId)=>{
        onlineUsers.set(userId, socket.id)
    })
    socket.on('send-msg', (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive', data.message)
        }
    })
});

// ----------------- Deployment -------------------------
if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/', (req, res)=>{
        app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}