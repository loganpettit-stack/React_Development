const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../../models/userSchema");

const getUsersRoute = async (request, response) => {
    console.log("getting users");

    try {
        const res = await userModel.find();
        response.status(200);
        response.send(res);
    } catch (error) {
        response.status(500);
        response.send(error);
    }
}

const addFriendRoute = async (request, response) => {
    console.log("adding friend");
    const friendArr = [];
    try {
        const body = request.body;
        const user = body.username;
        const newFriend = body.friends;

        const userprf = await userModel.findOne({ username: user })
        console.log(userprf.friends);

        for (friend in userprf.friends) {
            friendArr.push(userprf.friends[friend]);
        }

        friendArr.push(newFriend);

        console.log(friendArr)
        const person = ({
            friends: friendArr
        })

        userprf.set(person);
        const res = await userprf.save();
        response.send(res);
    }
    catch (error) {
        response.status(500);
        response.send(error);
    }
}

const getFriends = async (request, response) => {
    console.log("getting friends");
    try {
        const body = request.body; 
        const user = body.username; 

        const res = await userModel.findOne({username: user})
        console.log(res.friends);

        response.json({friends: res.friends});
    } catch (error) {
        response.status(500);
        response.send(error);
    }
}

const removeFriend = async (request, response) => {
    console.log("removing friend");
    try {
        const body = request.body;
        const user = body.username; 
        const friend = body.friend; 
        let friendArr = [];
    
        const res = await userModel.findOne({username: user})
        friendArr = res.friends; 

        for(const i in friendArr){
            if(friendArr[i] === friend){
                friendArr.splice(i, 1);
            }
        }

        const newFriends = ({
            friends: friendArr
        })

        res.set(newFriends);
        const resp = await res.save();
        response.send(resp);

    } catch (error) {
        response.status(500);
        response.send(error);
    }
}

const personRouter = express.Router();
personRouter.get("/", getUsersRoute);
personRouter.post("/addFriend", bodyParser.json(), addFriendRoute)
personRouter.post("/getFriends", bodyParser.json(), getFriends);
personRouter.post("/removeFriend", bodyParser.json(), removeFriend);
module.exports = personRouter;