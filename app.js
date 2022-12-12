const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const initializeApp = require('firebase/app');
const getAnalytics = require('firebase/analytics');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyAsBq7HUFQivzXrPwufbmezezPsgOFZJk4",
    authDomain: "pamo-auth.firebaseapp.com",
    projectId: "pamo-auth",
    storageBucket: "pamo-auth.appspot.com",
    messagingSenderId: "887944170654",
    appId: "1:887944170654:web:b29c69a1774fa51683ff8f",
    measurementId: "G-MEKYMTMJPV"
};

// Initialize Firebase
// const FireApp = initializeApp(firebaseConfig);
const firebaseApp = initializeApp.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



// Get a list of cities from your database
async function getUser(db) {
    const usersCOl = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    console.log(usersList);
    return usersList;
}






app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/apple", function (req, res) {
    // res.send("<h1>Waiting to download apple app...")
    res.json({
        "Operating system": "ios",
        "User": req.ip
    });
});

app.post("/api/play", function (req, res) {
    res.json({
        "Operating system": "Android"
    });
});


app.post("/api/save", function (req, res) {

    console.log(req.body);

    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;
    let eContact = req.body.eContact;
    let phone = req.body.phone;
    let eCell = req.body.eCell;
    let address = req.body.address;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let marriageStatus = req.body.marriageStatus;

    getUser();


    res.json({
        "Message": `Hello, ${fName}`,
        "First Name": `${fName}`,
        "Last Name": `${lName}`,
        "Email": `${email}`,
        "Emergency Contact": `${eContact}`,
        "Phone Number": `${phone}`,
        "Emergency cell": `${eCell}`,
        "Address": `${address}`,
        "dob": `${dob}`,
        "gender": `${gender}`,
        "Marriage Status": `${marriageStatus}`,
        "UserStatus": "Saved"
    });
});

app.get("/api/user/:id", function (req, res) {
    if (req.params.id == 7) {
        res.json({
            "User": "Kio",
            "Status": true,
            "color": `${req.query.color}`
        });
    }
    else {
        res.send(`You entered Id of ${req.params.id}`);
    }
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000");
});