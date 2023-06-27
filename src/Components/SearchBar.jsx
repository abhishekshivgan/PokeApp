import React, { useState } from 'react';
import axios from 'axios';

function SearchBar(props) {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState();
    const [loading1, setLoading1] = useState(false);

    const searchPokemon = async () => {
        // console.log(query);
        console.log(search);
        setLoading1(true);
        const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
        await axios.get(baseUrl + search).then(foundPokemon => {
            setSearchData(foundPokemon.data);
        }).catch(err => {
            window.alert(err);
        });
        setLoading1(false);
        console.log(searchData);
    }

    return (
        <>
            <div className="search-group">
                <input placeholder='Search Pokemon' onChange={(event) => { setSearch(event.target.value) }}></input>
                <button type="Search" onClick={searchPokemon}>Search</button>
            </div>

            {
                !loading1 && searchData ?
                    <div className="search-card" onClick={(event)=>props.getPoke(searchData)}>
                        <h2>{searchData.id}</h2>
                        <img src={searchData.sprites.front_default} alt="" />
                        <h2>{searchData.name}</h2>
                    </div> :
                    <h1>Pokemon not found</h1>
            }


        </>
    )
}

export default SearchBar; 