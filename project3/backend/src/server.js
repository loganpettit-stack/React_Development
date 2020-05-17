const express = require("express");
const { userRouter } = require("./routes/users/userRoutes");
const tokenRouter = require("./routes/users/token");
const postRouter = require("./routes/posts/postRoutes");
const personRouter = require("./routes/users/personRoutes")
const tokenAuth = require("./lib/middleware/tokenAuth");
const mongoose = require("mongoose");
const databaseURL = "mongodb://127.0.0.1:27017/postApp";

mongoose.connect(databaseURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('error', err => console.log(err));
mongoose.connection.once('open', () => console.log("Connected to db"));
const app = express();

app.use("/createUser", userRouter);
app.use("/getToken", tokenRouter);
app.use(tokenAuth);
app.use("/posts", postRouter);
app.use("/person", personRouter)

const port = 5000;
app.listen(port);
console.log("Now listening to port: " + port);
