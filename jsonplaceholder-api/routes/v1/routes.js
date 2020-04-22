const fetch = require("node-fetch");
const express = require("express");

const baseURL = 'https://jsonplaceholder.typicode.com/';

const getAllPosts = async (request, response) => {
    const URL = baseURL + 'posts';
    try {
        const res = await fetch(URL);
        const posts = await res.json();
        response.send(posts);
    } catch (err) {
        response.status(500);
        response.send(err);
    }
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
            response.send(posts);
        }
    }

    if (!found) {
        const notFound = "Username not found";
        response.status(500);
        response.send(notFound);
    }
}


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
        response.send(postsById);
    }
    else {
        const notFound = "Post not found"
        response.send(notFound);
    }

}

const getUsersNameByUsername = async (request, response) => {
    const username = request.params.username;
    const URL = baseURL + 'users';
    const userchunk = [];
    var found = 0; 

    const res = await fetch(URL);
    const users = await res.json();

    // console.log(users);
    for (user in users) {
        let uname = users[user].username;
        let name = users[user].name;


        if (uname === username) {
            uname = "username: " + users[user].username;
            name = "name: " + users[user].name;
            userchunk.push(uname);
            userchunk.push(name);
            found = 1; 
            break;
        } else {
            found = 0;
        }

    }
    
    if(found){
        response.send(userchunk);
    } else {
        const notfound = "Username not found";
            response.send(notfound);
    }



}

const router = express.Router();

router.get("/allPosts", getAllPosts);
router.get("/allPosts/:username", getAllPostsByUser);
router.get("/posts/:postId", getPostsById)
router.get("/profile/:username", getUsersNameByUsername);

module.exports = router; 