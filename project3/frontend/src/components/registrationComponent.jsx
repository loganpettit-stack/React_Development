import React from "react";


export class Register extends React.Component {

    registerUrl = "createUser";

    state = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        registered: true,
        logged: false,
        authorization: ""
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleFirstChange = event => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastChange = event => {
        this.setState({
            lastname: event.target.value
        })
    }

    handleRegister = async (event) => {
        console.log("Username: ", this.state.username);
        console.log("password: ", this.state.password);
        const username = this.state.username;
        const password = this.state.password;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;

        await fetch(this.registerUrl, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname
            })
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    registered: false,
                    logged: true
                })

                if (response.status !== 201) {
                    console.log("user exists")
                }
            })

        this.props.registered(true);
    }

    render() {
        return (
            <div className="content">
                <div>
                    <h3>Please register as a user</h3>
                    <form onSubmit={this.handleRegister}>
                        Firstname:
                    <input
                            type="text"
                            value={this.state.handleFirstChange}
                            onChange={this.handleFirstChange}
                        />
                        <br /><br />
                        Lastname:
                    <input
                            type="text"
                            value={this.state.handleLastChange}
                            onChange={this.handleLastChange}
                        />
                        <br /><br />
                        Username:
                     <input
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                        <br /><br />
                        Password:
                    <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                        <br /><br />
                        <button className="myButton" type="submit" value="Submit">Register</button>
                    </form>
                </div>
            </div>

        )
    }
}