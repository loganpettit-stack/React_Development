How to use endpoints:

V1: Retrieves data via network calls to https://jsonplaceholder.typicode.com/

GET /v1/allPosts - retrieves all posts from https://jsonplaceholder.typicode.com/

GET /v1/allPosts/<username> - retrieve all posts created by a specific user from https://jsonplaceholder.typicode.com/

GET /v1/posts/<postId> - retrieves all posts by the post ID from https://jsonplaceholder.typicode.com/

GET v1/profile/<username> - retrieves a users name from their username from https://jsonplaceholder.typicode.com/


V2: Implements CRUD operations using mongoDB

Generate database entries:

GET /v2/loadUsers - Takes already created users data from https://jsonplaceholder.typicode.com/ and loads it into the database. 

GET /v2/loadPosts - Takes already created post data from https://jsonplaceholder.typicode.com/ and loads it into the database. 

POST /v2/insertUser - Takes an array of user objects in the post body of request and populates the mongo database with these users .

User object: 
[
    {
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
    }
]

POST /v2/createPost - Takes an array of post objects in the post body of request and populates the mongo database with these posts

Post object:
[
    {
        userID: String,
        id: String,
        title: String,
        body: String
    }   
]

CRUD operations: 

GET /v2/allPosts - Retrieves all posts from database

GET /v2/allPosts/<username> - Retrieves all posts in database created by a specific user specified in username parameter

GET /v2/profile/<username> - Retrieves user profile data from database specified by username parameter

GET /v2/posts/<postID> - Retrieves a post from data base that is refered to by provided post ID.

PATCH /v2/posts/<postID> - Updates a post from data base that is refered to by provided post ID. 

DELETE /v2/posts/<postID> - Removes a posf from data base that is refered to by provided post ID. 