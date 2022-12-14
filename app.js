const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const initializeApp = require('firebase/app');
const { getFirestore, collection, getDocs, setDoc, doc, getDoc } = require('firebase/firestore/lite');
const json = require("body-parser/lib/types/json");

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


async function saveUser(userJson) {
    let user = JSON.parse(userJson)
    console.log(`User is ${user.firstName}`);
    const usersRef = collection(db, "Users");

    const userMap = {
        "firstName": `${user.firstName}`,
        "lastName": `${user.lastName}`,
        "email": `${user.email}`,
        "emergencyContact": `${user.emergencyContact}`,
        "phoneNumber": `${user.phoneNumber}`,
        "emergencyCell": `${user.emergencyCell}`,
        "address": `${user.address}`,
        "dob": `${user.dob}`,
        "gender": `${user.gender}`,
        "marriageStatus": `${user.marriageStatus}`,
    };

    try {
        await setDoc(doc(usersRef, user.email), userMap);

        userJsonn = {
            "message": `Hello, ${user.firstName}`,
            "firstName": `${user.firstName}`,
            "lastName": `${user.lastName}`,
            "email": `${user.email}`,
            "emergencyContact": `${user.emergencyContact}`,
            "phoneNumber": `${user.phoneNumber}`,
            "emergencyCell": `${user.emergencyCell}`,
            "address": `${user.address}`,
            "dob": `${user.dob}`,
            "gender": `${user.gender}`,
            "marriageStatus": `${user.marriageStatus}`,
            "userStatus": "Saved"
        };

        return userJsonn;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }

}

// Get a list of cities from your database
async function getUser(db, userEmail) {

    const docRef = doc(db, "Users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return;
    }


    // const usersCollection = collection(db, 'Users');//Goes to Users collection
    // const usersSnapshot = await getDocs(usersCollection);//Goes to Specific Document
    // const usersList = usersSnapshot.docs.map(doc => doc.data());
    // console.log(usersList);
    // return usersList;
}


app.post("/api/save", async function (req, res) {

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

    userJson = {
        "message": `Hello, ${fName}`,
        "firstName": `${fName}`,
        "lastName": `${lName}`,
        "email": `${email}`,
        "emergencyContact": `${eContact}`,
        "phoneNumber": `${phone}`,
        "emergencyCell": `${eCell}`,
        "address": `${address}`,
        "dob": `${dob}`,
        "gender": `${gender}`,
        "marriageStatus": `${marriageStatus}`,
        "userStatus": "Saved"
    };

    // let user = await getUser(db, email);

    const userJsonn = await saveUser(JSON.stringify(userJson));
    res.json(userJsonn);
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