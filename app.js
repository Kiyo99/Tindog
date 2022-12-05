const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
});

/**
 * 2:15 take down shit and buy soaps and drink
 * 2:30 to 3: Wash freezer
 * 3 - 4:30pm - Wash clothes for tomorrow, Clean
 * 4:45 go and bathe
 * 5:15 go to school
 * 
 * 5:30pm start looking at Kaleb's project again - Picture upload, other features
 * 7pm start Theo's project 
 * 7 to 8 Theo
 * 8 to 9 Documents
 * 9pm start heading back
 */