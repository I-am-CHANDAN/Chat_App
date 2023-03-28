const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 8000;

http.listen(PORT, (err) => {
    if (err) {
        console.log("Something Went Wrong !!");
    }
    else {
        console.log(`Server listening at port ${PORT}`)
    }
})

//server HTML file 
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get("*", (req, res) => {
    res.send("oops!! Page not Found.")
})


const io = require('socket.io')(http)

io.on('connection', (Socket) => {
    Socket.on('message', (msg) => {
        // recieve message/data from client side
        Socket.broadcast.emit("message", msg);
    })
})
