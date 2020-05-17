import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Post } from "./components/postComponent";
import { Login } from "./components/loginComponent";
import { Register } from "./components/registrationComponent";
import { People } from "./components/peopleComponent";
import { Friend } from "./components/friendComponent"; 

const Application = () => {
    const [toggleLoginView, setLoginView] = useState(true);
    const [togglePostView, setPostView] = useState(false);
    const [toggleRegistration, setRegistrationView] = useState(false);
    const [token, setToken] = useState("");
    const [tokenStatus, setTokenStatus] = useState(true);
    const [togglePeopleView, setPeopleView] = useState(false);
    const [isRegistered, setRegistered] = useState(false);
    const [user, setUser] = useState("");
    const [toggleFriendView, setFriendView] = useState(false);

    const handleLoginView = () => {
        setLoginView(!toggleLoginView);

        if (togglePostView) {
            setPostView(!togglePostView);
        }

    }

    const handlePeopleView = () => {
        setPeopleView(!togglePeopleView);

        if (togglePostView) {
            setPostView(!togglePostView);
        }

        if(toggleFriendView){
            setFriendView(!toggleFriendView);
        }
    }

    const handlePostView = () => {
        setPostView(!togglePostView);

        if (togglePeopleView) {
            setPeopleView(!togglePeopleView);
        }

        if(toggleFriendView){
            setFriendView(!toggleFriendView);
        }
    }

    const handleRegistration = () => {
        setRegistrationView(!toggleRegistration);

        if (togglePostView) {
            setPostView(!togglePostView);
        }

        if (toggleLoginView) {
            setLoginView(!toggleLoginView);
        }
    }

    const handleFriendView = () => {
        setFriendView(!toggleFriendView);

        if (togglePeopleView) {
            setPeopleView(!togglePeopleView);
        }

        if (togglePostView) {
            setPostView(!togglePostView);
        }
    }

    return (
        <div className="mainContainer">
            <div className="header">
                <h1>
                    Post App!
                </h1>
            </div>
            <div>
                {togglePostView ? (
                    <div>
                        {!tokenStatus ? (
                            <div>
                                <ul>
                                    <li><a href="#posts" onClick={handlePostView}>Posts</a></li>
                                    <li><a href="#people" onClick={handlePeopleView}>People</a></li>
                                    <li><a href="#friends" onClick={handleFriendView}>Friends</a></li>
                                </ul>
                                {togglePeopleView ? (
                                        <People token={token} user={user}/>
                                        ) : toggleFriendView? (
                                            <Friend token={token} user={user}/>
                                        ) : (
                                            <Post token={token} user={user} setStatus={setTokenStatus} />
                                    )}
                            </div>
                        ) : (
                            <div>
                                <Login tokenValue={setToken} setStatus={setTokenStatus} setUser={setUser} />
                            
                            </div> 
                        )}
                    </div>
                ) : toggleLoginView ? (
                    <div>
                        {tokenStatus ? (
                            <div className="login">
                                <Login tokenValue={setToken} setStatus={setTokenStatus} setUser={setUser} />
                                <br/>
                                <button className="myButton" onClick={handleRegistration}>Register</button>
                            </div>
                        ) : (
                                <div>
                                    <ul>
                                        <li><a href="#posts" onClick={handlePostView}>Posts</a></li>
                                        <li><a href="#people" onClick={handlePeopleView}>People</a></li>
                                        <li><a href="#friends" onClick={handleFriendView}>Friends</a></li>
                                    </ul>
                                    {togglePeopleView ? (
                                            <People token={token} user={user}/>
                                        ) : toggleFriendView? (
                                            <Friend token={token} user={user}/>
                                        ) : (
                                            <Post token={token} user={user} setStatus={setTokenStatus} />
                                    )}
                                </div>
                            )}
                    </div>

                ) : toggleRegistration ? (
                    <div>
                        {!isRegistered ? (
                            <Register registered={setRegistered} />
                        ) : tokenStatus ? (
                            <Login tokenValue={setToken} setStatus={setTokenStatus} setUser={setUser} />
                        ) : (
                                    <div>
                                        <ul>
                                            <li><a href="#posts" onClick={handlePostView}>Posts</a></li>
                                            <li><a href="#people" onClick={handlePeopleView}>People</a></li>
                                            <li><a href="#friends" onClick={handleFriendView}>Friends</a></li>
                                        </ul>
                                        {togglePeopleView ? (
                                            <People token={token} user={user}/>
                                        ) : toggleFriendView? (
                                            <Friend token={token} user={user}/>
                                        ) : (
                                            <Post token={token} user={user} setStatus={setTokenStatus} />
                                    )}
                                    </div>
                                )}
                    </div>

                ) : (

                        <div>
                            <ul>
                            <li><a href="#posts" onClick={handlePostView}>Posts</a></li>
                            <li><a href="#people" onClick={handlePeopleView}>People</a></li>
                            <li><a href="#friends" onClick={handleFriendView}>Friends</a></li>
                            </ul>
                            <p>Welcome to postApp</p> 
                        </div>
                    
                    )}
            </div>
        </div>
    )
}

ReactDOM.render(<Application />, document.querySelector("#root"));