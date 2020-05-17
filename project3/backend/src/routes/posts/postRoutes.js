const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const postModel = require("../../models/postSchema")

const getAllPosts = async (request, response) => {
    console.log("getting posts");
    try {
        const res = await postModel.find();
        response.status(200);
        response.send(res);
    } catch (error) {
        response.status(500);
        response.send(error);
    }
}

const createPost = async (request, response) => {
    try {
        const body = request.body;
        console.log(body);

        const newPost = new postModel(body);
        const res = await newPost.save();
        const created = "New Post created: " + res;
        response.send(created);

    } catch (error) {
        response.status(500);
        response.send(error);
    }
}

const deletePost = async (request, response) => {
    try {
        console.log("deleteing posts");
        const body = request.body;
        console.log(body);
        const post = body.post;

        const deletePost = await postModel.deleteOne({post: post})
        response.send(deletePost);

    } catch (error){
        response.status(500);
        response.send(error);
    }
}

const updatePost = async (request, response) => {
    console.log("Updating post");

    try{
        const body = request.body;
        console.log(body);
        const user = body.username; 
        const oldPost = body.oldPost;
        const newPost = body.newPost;

        const post = await postModel.findOne({post: oldPost})
        const changedPost = ({
            username: user,
            post: newPost
        })

        console.log(changedPost);
        post.set(changedPost);

        console.log(post);

        const res = await post.save();
        response.send(res);

    } catch (error){
        response.status(500);
        response.send(error);
    }
}



const postRouter = express.Router();
postRouter.route("/allPosts").get(getAllPosts);
postRouter.route("/createPost").post(bodyParser.json(), createPost);
postRouter.route("/deletePost").delete(bodyParser.json(), deletePost);
postRouter.route("/updatePost").post(bodyParser.json(), updatePost);
module.exports = postRouter;