const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const initializeApp = require('firebase/app');
const { getFirestore, collection, setDoc, doc, getDoc, updateDoc } = require('firebase/firestore/lite');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const json = require("body-parser/lib/types/json");

// const firebaseConfig = {
//     apiKey: "AIzaSyAsBq7HUFQivzXrPwufbmezezPsgOFZJk4",
//     authDomain: "pamo-auth.firebaseapp.com",
//     projectId: "pamo-auth",
//     storageBucket: "pamo-auth.appspot.com",
//     messagingSenderId: "887944170654",
//     appId: "1:887944170654:web:b29c69a1774fa51683ff8f",
//     measurementId: "G-MEKYMTMJPV"
// };

const firebaseConfig = {
    apiKey: "AIzaSyC6j7D4iDpJ8UsYv0rE11xm4H5v9XZE4BQ",
    authDomain: "authsystem-d11e7.firebaseapp.com",
    projectId: "authsystem-d11e7",
    storageBucket: "authsystem-d11e7.appspot.com",
    messagingSenderId: "852881818879",
    appId: "1:852881818879:web:13a049367c396e0bab78ca",
    measurementId: "G-YYM1YGPQD9"
};

// Initialize Firebase
// const FireApp = initializeApp(firebaseConfig);
const firebaseApp = initializeApp.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);



const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/personal", function (req, res) {
    res.sendFile(__dirname + "/public/personalsite.html");
});

app.get("/cv", function (req, res) {
    res.sendFile(__dirname + "/public/cv.html");
});

app.get("/books", function (req, res) {
    res.sendFile(__dirname + "/public/books.html");
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


async function authenticateUser(userJson) {
    let user = JSON.parse(userJson)
    const usersRef = collection(db, "Users");

    const userMap = {
        "fullName": `${user.fullName}`,
        "email": `${user.email}`,
        "phoneNumber": `${user.phoneNumber}`,
        "password": `${user.password}`,
    };

    try {

        //auth
        await createUserWithEmailAndPassword(auth, user.email, user.password);

        //storing 
        await setDoc(doc(usersRef, user.email), userMap);

        userJson = {
            "fullName": `${user.fullName}`,
            "email": `${user.email}`,
            "phoneNumber": `${user.phoneNumber}`,
            "userStatus": "Saved"
        };

        return userJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }

}

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

async function registerUser(userMap) {
    let userDetails = JSON.parse(userMap)

    const usersRef = collection(db, "Users");
    const userDoc = {
        "email": `${userDetails.email}`,
        "driversExpiryDate": `${userDetails.driversExpiryDate}`,
        "driversLicense": `${userDetails.driversLicense}`,
        "vehicleType": `${userDetails.vehicleType}`,
        "nationalID": `${userDetails.nationalID}`,
    };

    try {
        await updateDoc(doc(usersRef, userDetails.email), userDoc);

        //Check if the email is valid

        let user = await getUser(db, userDetails.email);

        response = {
            "firstName": `${user.firstName}`,
            "lastName": `${user.lastName}`,
            "emergencyContact": `${user.emergencyContact}`,
            "phoneNumber": `${user.phoneNumber}`,
            "emergencyCell": `${user.emergencyCell}`,
            "address": `${user.address}`,
            "dob": `${user.dob}`,
            "gender": `${user.gender}`,
            "marriageStatus": `${user.marriageStatus}`,
            "email": `${user.email}`,
            "driversExpiryDate": `${user.driversExpiryDate}`,
            "driversLicense": `${user.driversLicense}`,
            "vehicleType": `${user.vehicleType}`,
            "nationalID": `${user.nationalID}`,
            "userStatus": "Registration Complete"
        };

        return response;
    } catch (error) {
        console.log(`Error is: ${error}`);
    }

}

async function getUser(db, userEmail) {

    //if the email isn't valid here throw an error

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

    const userJson = {
        "message": `Hello, ${req.body.fName}`,
        "firstName": `${req.body.fName}`,
        "lastName": `${req.body.lName}`,
        "email": `${req.body.email}`,
        "emergencyContact": `${req.body.eContact}`,
        "phoneNumber": `${req.body.phone}`,
        "emergencyCell": `${req.body.eCell}`,
        "address": `${req.body.address}`,
        "dob": `${req.body.dob}`,
        "gender": `${req.body.gender}`,
        "marriageStatus": `${req.body.marriageStatus}`,
        "userStatus": "Saved"
    };

    const response = await saveUser(JSON.stringify(userJson));
    res.json(response);
});

app.put("/api/complete", async function (req, res) {

    console.log(req.body);

    const userMap = {
        "email": `${req.body.userMap.email}`,
        "driversExpiryDate": `${req.body.userMap.driversExpiryDate}`,
        "driversLicense": `${req.body.userMap.driversLicense}`,
        "vehicleType": `${req.body.userMap.vehicleType}`,
        "nationalID": `${req.body.userMap.nationalID}`
    };

    const response = await registerUser(JSON.stringify(userMap));
    res.json(response);

});

app.post("/api/register", async function (req, res) {
    console.log(req.body);

    const userMap = {
        "fullname": `${req.body.fName}`,
        "email": `${req.body.email}`,
        "phoneNumber": `${req.body.phone}`,
        "password": `${req.body.password}`
    }
    const response = await authenticateUser(JSON.stringify(userMap));
    res.json(response);

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