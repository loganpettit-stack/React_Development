import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Characters extends React.Component {

    state = {
        allCharacters: [],
        search: "",
        list: [],
        currentFilm: ""
    };


    baseURL = "api/";

    componentDidMount = () => {


        axios
            .get(`${this.baseURL}people`)
            .then(response => {
                // map returned json data to objects
                // console.log(response.response.parse)
                const characterJSON = JSON.parse(response.request.response);

                // console.log("character json", characterJSON);

                // const allCharacters = characterJSON.results.map(obj => obj.name);
                const allCharacters = characterJSON.results;
                const nextURL = characterJSON.next;

                // while (nextURL != null) {
                    console.log("next url", nextURL);


                    allCharacters.forEach(character => {
                        // console.log("character elements", character.homeworld);


                        axios
                            .get(character.homeworld)
                            .then(homeworldResponse => {

                                // console.log("homeworld Response", homeworldResponse)

                                character.homeworld = homeworldResponse.data.name;
                                // let homeworldJSON = JSON.parse(homeworldResponse.data);
                                // console.log("homeworld", character.homeworld);

                                let characterFilms = [];

                                character.films.forEach(flm => {

                                    axios
                                        .get(flm)
                                        .then(filmResponse => {

                                            // console.log("film Response", filmResponse);

                                            characterFilms.push(filmResponse.data.title)

                                            // console.log("character", character.name);
                                            // console.log("counter", i)
                                            // console.log("individual films", character.films[i])

                                            character.films = characterFilms
                                            console.log("all chars", allCharacters);


                                            this.setState({ allCharacters, list: allCharacters });

                                        })
                                })
                                // this.setState({ allCharacters, list: allCharacters });


                            })

                        // this.setState({ allCharacters, list: allCharacters });
                        // console.log("allcharacters", allCharacters);


                    });
                // }

            })
            .catch(error => {
                console.error(error);
            });


    };


    componentDidMount() {
        this.axiosCall();
    }


    handleSearch = event => {
        this.setState({
            searchTerm: event.target.value,
            posts: this.state.allPosts.filter(post =>
                post.title.includes(event.target.value)
            )
        });
    };



    render() {

        const allCharacters = this.state;
        // console.log("render all characters", allCharacters.list);

        // console.log("character map", this.state.allCharacters)

        return (
            <div className="characterCards">
                <h2>Star Wars Characters</h2>
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