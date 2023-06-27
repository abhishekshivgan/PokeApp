import React, { useEffect, useState } from "react";
import Card from './Card';
import Pokeinfo from './Pokeinfo';
import SearchBar from "./SearchBar";
import axios from "axios";


function Main() {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [searchData, setSearchData] = useState();


    //Renders 20 pokemons list
    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        // console.log(res.data.results);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
        console.log(pokeData);
    }

    //renders each pokemon 
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            // console.log(result.data);
            setPokeData(state => {
                state = [...state, result.data];
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }

    const searchPokemon = async (query) => {
        // console.log(query);
        setLoading(true);
        const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
        await axios.get(baseUrl+query).then(foundPokemon => {
            setSearchData(foundPokemon.data);
            
        }).catch(err => {
            window.alert(err);
        })
        setLoading(false);
        console.log(searchData)
    }

    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
        <>

            <SearchBar getPoke={poke =>setPokeDex(poke)}/>


            <div className="container">

                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokeData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        {nextUrl && <button onClick={() => {
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>
                </div>

                <div className="right-content">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
        </>
    )
}

export default Main;