import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Planets extends React.Component {

    state = {
        allPlanets: [],
        next: "",
        search: "",
        list: []

    };


    baseURL = "api/";

    async axiosCall() {


        let url = `${this.baseURL}planets`;
        let planetsArr = [];
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
        

            let allPlanets = json.results;
            console.log("allplanets", allPlanets);

            allPlanets.forEach(planet => {

               let allFilms = [];

                planet.films.forEach(flm => {

                    axios
                        .get(flm)
                        .then(filmResponse => {

                            allFilms.push(filmResponse.data.title)

                            planet.films = allFilms
                            console.log("allfims", allFilms, planet);


                            this.setState({ planetsArr, allPlanets: planetsArr });
                        })
                })


            })

            planetsArr.push(...allPlanets);

        }

        this.setState({ planetsArr, allPlanets: planetsArr });

    }

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
