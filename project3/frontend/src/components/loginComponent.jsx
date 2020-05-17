import React from "react";

export class Login extends React.Component {
    loginUrl = "getToken";

    state = {
        username: "",
        password: "",
        token: "",
        logged: true
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


    handleLogin = async (event) => {
        const username = this.state.username;
        const password = this.state.password;

        const response = await fetch(this.loginUrl, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const returnedToken = await response.json().then(function (json) {
            console.log(json.token);
            return json.token;
        });

        this.setState({
            token: returnedToken,
            logged: false
        })

        this.props.tokenValue(this.state.token)
        this.props.setStatus(false);
        this.props.setUser(username);

        if (response.status !== 201) {
            console.log("User does not exist")
        }
    }


    render() {
        return (
            <div>
                <div>
                    <h3>Please Login</h3>
                    <form onSubmit={this.handleLogin}>
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
                        <button className="myButton" type="submit" value="Submit">Login</button>
                        <br/>
                    </form>
                </div>
            </div>
        )
    }
}