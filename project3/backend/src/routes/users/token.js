const express = require("express");
const bodyParser = require("body-parser");
const { confirmUser } = require("./userRoutes");
const jsonwebToken = require("jsonwebtoken");

const tokenSignature = "uniqueToken";

const createToken = (userId) => {
    console.log("creating token for: ", userId);

    return jsonwebToken.sign(
        {userId},
        tokenSignature,
        {expiresIn: "5m"}
    );
};

const createTokenRoute = async (request, response) => {
    const {username, password } = request.body;
    console.log("Looking for user")

    const userExists = await confirmUser(username, password);
    console.log("user exists", userExists);

    if(userExists){
        const token = createToken(username);

        console.log("Token: ", token);
        response.status(201)
        response.json({token: token});
    
    } else {
        response.sendStatus(422);
    }
};

const tokenRouter = express.Router();

tokenRouter.post("/", bodyParser.json(), createTokenRoute);

module.exports = tokenRouter;