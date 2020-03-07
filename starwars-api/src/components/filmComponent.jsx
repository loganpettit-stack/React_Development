
import React from "react";
import axios from "axios";
import Collapsible from "react-collapsible";


export class Films extends React.Component {

    state = {
        allFilms: [],
        search: "",
        list: []
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
        console.log("render all characters", allCharacters.list);

        console.log("character map", this.state.allCharacters)
       
        return (
            <div className="filmDisplay">
                <h2>Star Wars Films</h2>
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