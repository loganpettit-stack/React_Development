import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Planets extends React.Component {

    state = {
        allPlanets: [],
        search: "",
        list: []
    };


    baseURL = "api/";

    axiosCall = () => {
        axios
            .get(`${this.baseURL}planets`)
            .then(response => {
                // map returned json data to objects
                const characterJSON = JSON.parse(response.request.response);

                console.log("character json", characterJSON);

                const allPlanets = characterJSON.results;

                allPlanets.forEach(planet => {

                    let planetFilms = []
                    planet.films.forEach(flm => {
                        axios
                            .get(flm)
                            .then(filmResponse => {

                                planetFilms.push(filmResponse.data.title);

                                planet.films = planetFilms;


                                this.setState({ allPlanets, list: allPlanets });


                            })
                    })


                })
                // this.setState({ allPlanets, list: allPlanets });

                console.log("all planets list", this.state);
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

        return (
            <div className="planetsDisplay">
                <h2>Star Wars Planets</h2>
                <ul name="planetsList">
                    {this.state.allPlanets.map((planet, index) => (
                        <div key={index}>
                            <Collapsible trigger={planet.name}>
                                <p>Climate: {planet.climate}</p>
                                <p>Terrain: {planet.terrain}</p>
                                <p>Population: {planet.population}</p>
                                <p>Films: </p>
                                {planet.films.map((flm, indx) => (
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
