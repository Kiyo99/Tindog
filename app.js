const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/apple", function (req, res) {
    console.log(req);
    res.send("<h1>Waiting to download apple app...")
});

app.post("/play", function (req, res) {
    console.log(req);
    res.send("<h1>Waiting to download Google play app...")
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000");
});