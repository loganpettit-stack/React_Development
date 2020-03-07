import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Characters } from "./components/characterComponent"
import { Films } from "./components/filmComponent"
import { Planets } from "./components/planetComponent";

const Application = () => {
    const [toggleCharacterView, setCharacterView] = useState(false);
    const [toggleFilmView, setFilmView] = useState(false);
    const [togglePlanetView, setPlanetView] = useState(false);

    const handleCharacterView = () => {
        setCharacterView(!toggleCharacterView);

        if (togglePlanetView) {
            setPlanetView(!togglePlanetView);
        }
        if (toggleFilmView) {
            setFilmView(!toggleFilmView);
        }
    };

    const handleFilmView = () => {
        setFilmView(!toggleFilmView);

        if (togglePlanetView) {
            setPlanetView(!togglePlanetView);
        }
        if (toggleCharacterView) {
            setCharacterView(!toggleCharacterView);
        }
    };

    const handlePlanetView = () => {
        setPlanetView(!togglePlanetView);

        if (toggleCharacterView) {
            setCharacterView(!toggleCharacterView);
        }
        if (toggleFilmView) {
            setFilmView(!toggleFilmView);
        }
    }

    return (
        <div className="mainBody">
            <div className="topHeader">
                <h1>
                    STAR WARS ARCHIVE
                </h1>
            </div>
            <h2>
                <ul className="mainButtons">
                    <li><a href="#characters" onClick={handleCharacterView}>Characters</a></li>
                    <li><a href="#films" onClick={handleFilmView}>Films</a></li>
                    <li><a href="#planets" onClick={handlePlanetView}>Planets</a></li>
                </ul>
            </h2>
            <div>
                {toggleCharacterView ? (
                    <Characters />
                ) : toggleFilmView ? (
                    <div>
                        <Films />
                    </div>
                ) : togglePlanetView ? (
                    <div>
                        <Planets />
                    </div>
                ) : (
                     <div className="default">
                        <p>Welcome to the Star Wars information archive
                            Select a tab above in order to discover the troves
                            of information this website contains on the series. 
                        </p>
                    </div>
                )}
            </div>
        </div>

    )
};


ReactDOM.render(<Application />, document.querySelector("#root"));