import React from "react";

export class Post extends React.Component {

    postURL = "posts/allPosts"
    createURL = "posts/createPost"
    deleteURL = "posts/deletePost"
    updateURL = "posts/updatePost"

    state = {
        allPosts: [],
        allUsers: [],
        token: "",
        post: "",
        newPost: "",
    }


    async getPosts() {
        const token = this.props.token
        console.log("Token in Post", token);

        const postArr = [];
        const userArr = [];

        const response = await fetch(this.postURL, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const returnedJson = await response.json().then(function (json) {
            return json;
        });

        for (const i in returnedJson) {
            console.log(returnedJson[i].post);
            const post = returnedJson[i].post;
            const user = returnedJson[i].username;
            console.log("user ", user);
            userArr.push(user);
            postArr.push(post);
        }

        this.setState({
            allPosts: postArr,
            allUsers: userArr
        });
    }


    createPost = async (event) => {
        console.log("post", this.state.post);
        const newPost = this.state.post;
        const user = this.props.user;
        const token = this.props.token

        await fetch(this.createURL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                username: user,
                post: newPost
            })
        })
            .then((response) => {
                console.log(response);

            })

        this.setState({
            post: ""
        })
        this.getPosts();
    }


    deletePost = async (index) => {
        const user = this.props.user;
        console.log(index);
        const post = this.state.allPosts[index];
        console.log("post to delete", post);

        const token = this.props.token;

        await fetch(this.deleteURL, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                username: user,
                post: post
            })
        })

        this.getPosts();
    }


    updatePost = async (index) =>{
        const user = this.props.user;
        const oldPost = this.state.allPosts[index];
        const token = this.props.token;
        const newPost = this.state.newPost; 

        await fetch(this.updateURL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                username: user,
                oldPost: oldPost,
                newPost: newPost
            })
        })

        document.getElementById(index).value = "";
        this.getPosts();
    }

    handlePostChange = event => {
        this.setState({ post: event.target.value });
    }

    handleNewPost = event => {
        this.setState({newPost: event.target.value});
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPosts();
    }

    render() {
        return (
            <div>
                <h3>User Posts</h3>
                <div class="createPost">
                    Whats on your mind?
                    <form onSubmit={this.createPost}>
                        <input
                            type="text"
                            value={this.state.post}
                            onChange={this.handlePostChange}
                        />
                    <button type="submit" >Create Post</button>
                    </form>
                    <br/>
                </div>
                <ul name="posts">
                    {this.state.allPosts.map((post, index) => (
                        <div key={index} class="post">
                            <p>{this.state.allUsers[index]}: {post}</p>
                            <button onClick={() => this.deletePost(index)}>Delete</button>
                            <br></br>
                            <button onClick={() => this.updatePost(index)}>Update</button>
                            <input
                                id={index}
                                type="text"
                                onChange={this.handleNewPost}
                            />
                            <br/><br/>
                        </div>
                    ))}

                </ul>
            </div>
        )
    }
}