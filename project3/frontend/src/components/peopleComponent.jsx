import React from "react";

export class People extends React.Component {
    
    peopleURL = "person"
    addFriendURL = "person/addFriend"

    state = {
        allUsers: []
    }

    async getPeople() {
        const token = this.props.token;
        console.log("token ", token);

        const userArr = []; 

        const response = await fetch(this.peopleURL, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const returnedJson = await response.json().then(function (json) {
            return json;
        });

        console.log(returnedJson);
        this.setState({
            allUsers: returnedJson
        })

    }

    addFriend = async (index) => {
        const token = this.props.token; 
        const user = this.props.user; 
        const friend = this.state.allUsers[index].username; 

        console.log(friend);
        await fetch(this.addFriendURL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                username: user,
                friends: friend
            })
        })

    }


    componentDidMount(){
        this._isMounted = true;
        this.getPeople();
    }

    render(){
        return( 
            <div>
                <h3>Everyone</h3>
                <ul name="people">
                    {this.state.allUsers.map((user, index) => (
                        <div key={index} class="post">
                            <p>{user.username}: {user.firstname} {user.lastname}</p>
                            <button onClick={() => this.addFriend(index)}>Add</button>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}