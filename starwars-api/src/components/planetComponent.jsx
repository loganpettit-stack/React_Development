import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Planets extends React.Component {



    state = {
        allPlanets: [],
        search: "",
        list: [],
        _isMounted: false
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
        this.setState({ planetsArr, list: planetsArr });
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCall();
    }


    handleSearch = event => {
        this.setState({
            search: event.target.value,
            allPlanets: this.state.allPlanets.filter(planet =>
                planet.name.includes(event.target.value)
            )
        });
    };


    clearSearch = event => {
        console.log("this state", this.state)
        const allPlanets = this.state.list
        const search = ""

        this.setState({
            allPlanets,
            search
        });

        console.log("this state after", this.state);

    }

    render() {
        return (
            <div className="planetsDisplay">
                <h2>Star Wars Planets</h2>
                <div className="inputField">
                    <input
                        id="input"
                        type="text"
                        value={this.state.search}
                        onChange={this.handleSearch}
                    />
                    <button className="resetButton" type="reset" onClick={this.clearSearch}>Clear</button>
                </div>
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
