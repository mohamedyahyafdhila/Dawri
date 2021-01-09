const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const mongoose = require('mongoose')
const app = express();

//Connect to DB
mongoose.connect(
    'mongodb+srv://dawri:dawri@cluster0.op6r5.mongodb.net/dawri?retryWrites=true&w=majority',
    {useNewUrlParser: true},
    ()=>console.log('connetcted to DB!'));


var corsOptions = {
    origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

/*
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });*/
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Connected Succefully ." });
});
app.get("/user", (req, res) => {
    res.json({ message: "Connected user ." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
app.use('/rooms', require("./app/routes/rooms.routes"));
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "proUser"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'proUser' to roles collection");
            });
        }
    });
}