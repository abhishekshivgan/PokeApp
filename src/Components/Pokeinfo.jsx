import React from 'react';

const Pokeinfo = ({ data }) => {
    // console.log(data);
    return (
        <>
            {
                (!data) ? "" : (
                    <>
                        <h1>{data.name}</h1>
                        <img src={data.sprites.other.dream_world.front_default} alt="" />
                        <div className='abilities'>
                            {
                                data.abilities.map((poke, key) => {
                                    return (
                                        <>
                                            <div key={key}className='group'>
                                                <h2>{poke.ability.name}</h2>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </div>

                        <div className='base-stat'>
                            {
                                data.stats.map(poke=>{
                                    return (
                                        <>
                                            <h3>{poke.stat.name} : {poke.base_stat}</h3>
                                        </>
                                    )
                                })
                            }

                        </div>
                    </>
                )
            }
        </>
    )
}

export default Pokeinfo;