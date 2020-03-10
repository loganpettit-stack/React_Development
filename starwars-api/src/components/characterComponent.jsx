import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Characters extends React.Component {

    state = {
        allCharacters: [],
        search: "",
        list: [],
        currentFilm: "",
        _isMounted: false
    };


    baseURL = "api/";

    async axiosCall() {

        let url = `${this.baseURL}people`;
        let charArr = [];
        while (url) {

            let response = await fetch(url);
            let json = await response.json();

            url = json.next;

            if (url != null) {
                url = url.replace("https://swapi.co/", "");
            }
            else {
                url = null;
            }

            let allCharacters = json.results;


            allCharacters.forEach(character => {
                // console.log("character elements", character.homeworld);

                axios
                    .get(character.homeworld)
                    .then(homeworldResponse => {

                        character.homeworld = homeworldResponse.data.name;

                        let characterFilms = [];

                        character.films.forEach(flm => {

                            axios
                                .get(flm)
                                .then(filmResponse => {

                                    characterFilms.push(filmResponse.data.title)

                
                                    character.films = characterFilms
                                    console.log("all chars", allCharacters);
                                
                                    this.setState({ charArr, allPlanets: charArr});
                                })
                        })

                    })

            })

            charArr.push(...allCharacters);

        }
        
        this.setState({charArr, allCharacters: charArr});
        this.setState({ charArr, list: charArr });

    };


    componentDidMount() {
        this._isMounted = true;
        this.axiosCall();
    }


    handleSearch = event => {
        this.setState({
            search: event.target.value,
            allCharacters: this.state.allCharacters.filter(character =>
                character.name.includes(event.target.value)
            )
        });
    };


    clearSearch = event => {
        console.log("this state", this.state)
        const allCharacters = this.state.list
        const search = ""

        this.setState({
            allCharacters,
            search
        });

        console.log("this state after", this.state);

    }


    render() {
        return (
            <div className="characterCards">
                <h2>Star Wars Characters</h2>
                <div className="inputField">
                    <input
                        type="text"
                        value={this.state.search}
                        onChange={this.handleSearch}
                    />
                    <button className="resetButton" type="reset" onClick={this.clearSearch}>Clear</button>
                </div>
                <ul name="characterDisplay">
                    {this.state.allCharacters.map((character, index) => (
                        <div key={index}>
                            <Collapsible trigger={character.name}>

                                <p>Gender: {character.gender}</p>
                                <p>Height: {character.height}</p>
                                <p>Homeworld: {character.homeworld} </p>
                                <p>Films: </p>
                                {character.films.map((flm, indx) => (
                                    <div key={indx}>
                                        <p>{flm}</p>
                                    </div>
                                ))}
                            </Collapsible>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }

}