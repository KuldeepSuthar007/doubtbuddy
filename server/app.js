const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const doubtRoutes = require('./routes/doubt')
const studentRoutes = require('./routes/student')
const tutorRoutes = require('./routes/tutor')
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config()

const app = express();
const httpServer = http.createServer(app);
const corsOptions = {
    origin: 'http://localhost:3000',  // Replace with your React app's origin
    methods: ['GET', 'POST'],
    credentials: true,
    transports: ['websocket', 'polling'],
};

const io = new Server(httpServer, { cors: corsOptions });


const tutorConnections = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send("All Good!");
})

app.get('/health', (req, res) => {
    res.status(200).json("Server is up and running");
})

app.use("/api/auth", authRoutes)
app.use("/api/doubt", doubtRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/tutor", tutorRoutes)



io.on('connection', (socket) => {
    socket.on('joinTutorRoom', (tutorId) => {
        socket.join(tutorId);
    });


    socket.on('doubtRequest', (doubtData) => {

        io.emit('doubtNotification', doubtData);
    });

    let isDoubtAccepted = false;

    socket.on('acceptDoubt', ({ studentId, tutorId }) => {
        tutorConnections[tutorId] = studentId;
        io.to(tutorId).emit('doubtAccepted', { studentId });

        isDoubtAccepted = true;
    });


    // setTimeout(() => {
    //     if (!isDoubtAccepted) {

    //         io.to(studentSocketId).emit('doubtNotAccepted', { message: 'No tutor accepted the request' });
    //     }
    // }, 60000);

    socket.on('chatMessage', (data) => {

        const recipientSocketId = getRecipientSocketId(data.sender, data.recipient);
        io.to(recipientSocketId).emit('chatMessage', data);
    });
});

httpServer.listen(process.env.PORT || 4000, () => {
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log(`Server running on http://localhost:${process.env.PORT} and also connected to MongoDB`);
        })
        .catch((err) => {
            console.log("Failed to connect to MongoDB", err);
        });
});