const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");

const baseURL = 'https://jsonplaceholder.typicode.com/';

const getAllPosts = (request, response) => {
    const URL = baseURL + 'posts';
    fetch(URL)
        .then(res => res.json())
        .then(json => response.send({ json }));
}

const getAllPostsByUser = async (request, response) => {
    const URL = baseURL + 'users';
    const username = request.params.username;
    console.log(username);
    let userID = 0;
    let found = 0;

    const res = await fetch(URL);
    const users = await res.json();

    for (user in users) {
        let uname = users[user].username;
        let id = users[user].id;
        console.log(uname);
        console.log(id);

        if (uname === username) {
            userID = id;

            console.log("id found ", userID);

            const postsByUserURL = baseURL + "posts?userId=" + userID;
            console.log(postsByUserURL);


            const res2 = await fetch(postsByUserURL);
            const posts = await res2.json();
            found = 1;
            response.send(
                posts
            )
        }
    }

    if (!found) {
        const notFound = "Username not found";
        response.send(
            notFound
        )
    }
}

// async version of the call
const getPostsById = async (request, response) => {
    const postId = request.params.postId;
    const URL = baseURL + 'posts/' + postId;

    console.log("Post to get is: ", postId);

    const res = await fetch(URL);
    const postsById = await res.json();

    console.log(postsById);
    let postCount = 0;
    for (posts in postsById) {
        postCount++;
    }

    if (postCount > 0) {
        response.send(
            postsById
        )
    }
    else {
        const notFound = "Post not found"
        response.send(
            notFound
        )
    }

}

const getUsersNameByUsername = async (request, response) => {
    const username = request.params.username;
    const URL = baseURL + 'users';

    const res = await fetch(URL);
    const users = await res.json();

    for (user in users) {
        let uname = users[user].username;
        let name = users[user].name;

        if (uname === username) {
            response.send(
                name
            )
        } else {
            const notfound = "Username not found";
            response.send(
                notfound
            )
        }
    }

}

const router = express.Router();

router.get("/allPosts", getAllPosts);
router.get("/allPosts/:username", getAllPostsByUser);
router.get("/posts/:postId", getPostsById)
router.get("/profile/:username", getUsersNameByUsername);

module.exports = router; 