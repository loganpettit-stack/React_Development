
import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Films extends React.Component {

    state = {
        allFilms: [],
        search: "",
        list: [],
        _isMounted: false
    };


    baseURL = "api/";

    axiosCall = () => {
        axios
            .get(`${this.baseURL}films`)
            .then(response => {
                // map returned json data to objects
                const characterJSON = JSON.parse(response.request.response);

                console.log("character json", characterJSON);

                const allFilms = characterJSON.results

                this.setState({ allFilms, list: allFilms }); 
            })
            .catch(error => {
                console.error(error);
            });

       
    };


    componentDidMount() {
        this._isMounted = true;
        this.axiosCall();
    }


    handleSearch = event => {
        this.setState({
            search: event.target.value,
            allFilms: this.state.allFilms.filter(film =>
                film.title.includes(event.target.value)
            )
        });
    };

    
    clearSearch = event => {
        console.log("this state", this.state)
        const allFilms = this.state.list
        const search = ""

        this.setState({
            allFilms,
            search
        });

        console.log("this state after", this.state);

    }




    render() {       
        return (
            <div className="filmDisplay">
                <h2>Star Wars Films</h2>
                <div className="inputField">
                    <input
                        type="text"
                        value={this.state.search}
                        onChange={this.handleSearch}
                        // onKeyDown={this.handleSearch}
                    />
                    <button className="resetButton" type="reset" onClick={this.clearSearch}>Clear</button>
                </div>
                <ul name="filmList">
                    {this.state.allFilms.map((film, index) => (
                        <div key={index}>
                            <Collapsible trigger={film.title}>
                                <p>Episode Number: {film.episode_id}</p>
                                <p>Director: {film.director}</p>
                                <p>Release Date: {film.release_date}</p>
                                <p>Opening Crawl: {film.opening_crawl}</p>
                            </Collapsible>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }

}