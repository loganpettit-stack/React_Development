const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const userModel = require("../../models/userSchema");
const bcrypt = require("bcrypt");

const createUser = async(request, response) => {
    try {       
        const {firstname, lastname, username, password} = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("username: ", username);
        console.log("hashedpass: ", hashedPassword);
        console.log("first ", firstname);
        console.log("last ", lastname);

        const user = new userModel({
            firstname,
            lastname,
            username, 
            password: hashedPassword
        });

        const res = await user.save(); 
        console.log("New user created: ", res);

        response.status(201);
        response.send(res);
    } catch (err){
        response.status(500);
        response.send(err);
    }
}

const confirmUserExists = async (username) => {
    try {
        const results = await userModel.findOne({
            username,
        })

        console.log("Result: ", results);

        if (results && results.username === username){
            console.log("User found");
            return true; 
        }

        return false;
    } catch (err){
        throw new Error("Internal server error");
    }
};

const confirmUser = async (username, password) => {
    try {
        const results = await userModel.findOne({
            username,
        })

        console.log("Results: ", results);
        if (results && (await bcrypt.compare(password, results.password))){
            return true;
        }

        return false; 
    } catch (err){
        throw new Error("Internal server error");
    }
}

const userRouter = express.Router();

userRouter.route("/").post(bodyParser.json(), createUser);

module.exports = { userRouter, confirmUser, confirmUserExists };