const express = require("express")
const app = express()
const router = require("./routers/router")
const http = require("http").createServer(app)
const io = require("socket.io")(http)
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/views"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router)
const port = process.env.port || 3000;

io.on("connection", (socket) => {
    console.log("client connected")
    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
    const color_palette = ["indigo", "red", "pink", "purple", "green", "orange"]
    i = 0
    color = {"old": "", "new": ""}
    socket.on("change_color", () => {
        if (i >= color_palette.length - 1)
        {
            color.old = color_palette[i]
            color.new = color_palette[i % (color_palette.length - 1)]
            i = 0
        }
        else
        {
            color.old = color_palette[i]
            color.new = color_palette[i % color_palette.length + 1]
            i++
        }
        io.emit("change_color", color)
    })
    socket.on("limit_characters", (value) => {
        const maxLength = 8
        var newValue = value
        if (value.length > maxLength)
        {
            newValue = value.substr(0, maxLength)
        }
        io.emit("limit_characters", newValue)
    })
})

http.listen(port, () => {
    console.log(port)
})
module.exports = app