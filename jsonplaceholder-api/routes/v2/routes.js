const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const databaseURL = "mongodb://127.0.0.1:27017/v2"
const baseURL = 'https://jsonplaceholder.typicode.com/';


const user = mongoose.model("users", {
    id: String,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
});

const post = mongoose.model("posts", {
    userID: String,
    id: String,
    title: String,
    body: String
})

const loadPostsToDatabase = async (request, response) => {
    try {
        const URL = baseURL + 'posts';
        const postsSaved = [];

        const res = await fetch(URL);
        const posts = await res.json();
        mongoose.connect(databaseURL);

        for (i in posts){
            const newPost = new post(posts[i]);
            const res2 = await newPost.save();
            postsSaved.push(res2);
        }

        mongoose.disconnect();
        const created = "New posts created: " + postsSaved;
        response.send(created);
    } catch (err){
        response.status(500);
        response.send(err);
    }
}

const loadUsersToDatabase = async (request, response) => {
    try {
        const URL = baseURL + 'users';
        const usersSaved = [];

        const res = await fetch(URL);
        const users = await res.json();
        mongoose.connect(databaseURL);

        for (i in users) {
            const newUser = new user(users[i]);
            const res2 = await newUser.save();
            usersSaved.push(res2);
        }

        mongoose.disconnect();
        const created = "New users created: " + usersSaved;
        response.send(created);
    } catch (err) {
        response.status(500);
        response.send(err);
    }
}


// Create users to populate database
const createUserProfile = async (request, response) => {
    const usersCreated = [];
    try {
        mongoose.connect(databaseURL);
        const newUsers = request.body;

        for (i in newUsers) {
            const newUser = new user(newUsers[i]);
            const res = await newUser.save();
            usersCreated.push(res);
        }

        mongoose.disconnect();
        const created = "New users created: " + usersCreated;
        response.send(created);

    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

// Create posts in database
const createPost = async (request, response) => {
    const postsCreated = [];
    try {
        mongoose.connect(databaseURL);
        const newPosts = request.body;
        console.log(newPosts);

        for (i in newPosts) {
            const newPost = new post(newPosts[i]);
            console.log(newPost);

            const res = await newPost.save();
            postsCreated.push(res);
        }

        mongoose.disconnect();
        const created = "New post created: " + postsCreated;
        response.send(created);

    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const getAllPosts = async (request, response) => {
    try {
        console.log("gonna exe");
        mongoose.connect(databaseURL);
        const res = await post.find().exec();
        mongoose.disconnect();
        response.send(res);
    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const getAllPostsByUsername = async (request, response) => {
    try {
        mongoose.connect(databaseURL);
        const username = request.params.username;
        const users = await user.find({ username: username }).exec();
        console.log(users);
        const userId = users[0].id;
        console.log(userId);

        const res = await post.find({ id: userId }).exec();
        mongoose.disconnect();
        response.send(res);
    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const getProfileByUsername = async (request, response) => {
    try {
        mongoose.connect(databaseURL);
        const username = request.params.username;
        console.log(username);
        const res = await user.find({ username: username }).exec();
        console.log(res);
        mongoose.disconnect();
        response.send(res);

    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const getPostByPostID = async (request, response) => {
    try {
        mongoose.connect(databaseURL);
        const postId = request.params.postId;
        const posts = await post.find({ id: postId }).exec();
        console.log(posts);

        mongoose.disconnect();
        response.send(posts);

    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const updatePostById = async (request, response) => {
    try {
        mongoose.connect(databaseURL);
        const postId = request.params.postId;
        const posts = await (await post.findOne({ id: postId })).execPopulate();
        console.log(posts);
        console.log(request.body);

        posts.set(request.body);
        console.log(posts);
        const res = await posts.save();
        mongoose.disconnect();
        response.send(res);
    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const deletePostByPostID = async (request, response) => {
    try {
        mongoose.connect(databaseURL);
        const postId = request.params.postId;
        const res = await post.deleteOne({ id: postId }).exec();
        mongoose.disconnect();
        response.send(res);
    } catch (err) {
        response.status(500);
        response.send(err);
    }
}

const router = express.Router();

router.get("/allPosts", getAllPosts);
router.get("/allPosts/:username", getAllPostsByUsername);
router.get("/profile/:username", getProfileByUsername);
router.post("/createPost", bodyParser.json(), createPost);
router.post("/insertUser", bodyParser.json(), createUserProfile);
router.get("/loadUsers", loadUsersToDatabase);
router.get("/loadPosts", loadPostsToDatabase);
router.route("/posts/:postId")
    .get(getPostByPostID)
    .patch(bodyParser.json(), updatePostById)
    .delete(deletePostByPostID);

module.exports = router;