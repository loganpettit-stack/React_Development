import React from "react";

export class Friend extends React.Component {

    friendURL = "person/getFriends"
    deleteFriendURL = "person/removeFriend"

    state = {
        allFriends: []
    }

    async getFriends(){
        const token = this.props.token;
        const user = this.props.user; 
        console.log(token);
        console.log(user);

       const response = await fetch(this.friendURL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                username: user,
            })
        })

        const returnedJson = await response.json().then(function (json) {
            return json;
        });

        this.setState({
            allFriends: returnedJson.friends
        })
        
    }

    removeFriend = async(index) => {
        const user = this.props.user;
        const friend = this.state.allFriends[index];
        const token = this.props.token;

        await fetch(this.deleteFriendURL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                username: user,
                friend: friend
            }) 
        })

        this.getFriends();
    }


    componentDidMount() {
        this._isMounted = true; 
        this.getFriends();
    }

    render() {
        return (
            <div>
                <h3>My Friends!</h3>
                <ul name="people">
                    {this.state.allFriends.map((friend, index) => (
                        <div class="post" key={index}>
                            <p>{friend}</p>
                            <button onClick={() => this.removeFriend(index)}>Remove</button>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }

}