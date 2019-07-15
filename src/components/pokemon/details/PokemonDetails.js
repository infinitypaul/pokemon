import React, {useState, useEffect, useMemo} from 'react';
import axios from "../../../axios-pokemon";

import PokemonData from "./data/PokemonData";
import PokemonStat from "./data/PokemonStat";
import {TYPE_COLORS} from '../../../shared/utility'
import withErrorHandler from '../../../error/withErrorHandler';


const PokemonDetails = (props) => {
    const [pokemonsDetail, setPokeMonDetail] = useState({
        name:'',
        imageUrl:'',
        types:[],
        stats: {
            hp: '',
            attack: '',
            defence: '',
            speed: '',
            specialAttack: '',
            specialDefence: ''
        },
        height: '',
        weight:'',
        abilities:'',
        evs:'',
        themeColor: '#EF5350',
        url:''
    });
    useEffect(() => {
        const pokemonUrl = `pokemon/${props.match.params.pokemonIndex}`;

        async function fetchPokemonDetails() {
            await axios
                .get(pokemonUrl)
                .then((res)=>{
                    let {hp, attack, defence, speed, specialAttack, specialDefence} = '';
                res.data.stats.map(stat => {
                    switch (stat.stat.name) {
                        case 'hp':
                            hp = stat['base_stat'];
                            break;
                        case 'attack':
                            attack = stat['base_stat'];
                            break;
                        case 'defense':
                            defence = stat['base_stat'];
                            break;
                        case 'speed':
                            speed = stat['base_stat'];
                            break;
                        case 'special-attack':
                            specialAttack = stat['base_stat'];
                            break;
                        case 'special-defense':
                            specialDefence = stat['base_stat'];
                            break;
                        default:
                            return null;

                    }
                });
                const height = Math.round((res.data.height * 0.328084 + 0.00001) * 100) / 100;
                const weight = Math.round((res.data.weight * 0.220462 + 0.00001) * 100) / 100;
                const types = res.data.types.map(type => type.type.name);
                const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
                const abilities = res.data.abilities.map(ability => {
                    return ability.ability.name
                        .toLowerCase()
                        .split('-')
                        .map(s => s.charAt(0)
                            .toUpperCase()+ s.substring(1))
                        .join(" ")
                }).join(", ");
                const evs = res.data.stats.filter(stat => {
                    if(stat.effort > 0) {
                        return true;
                    }
                    return false;
                }).map(stat=>{
                    return `${stat.effort} ${stat.stat.name.toLowerCase()
                        .split('-')
                        .map(s => s.charAt(0)
                            .toUpperCase()+ s.substring(1))
                        .join(" ")}`

                })
                    .join(", ");
                const url = res.data.species.url;
                    setPokeMonDetail({
                        name: res.data.name,
                        imageUrl: res.data.sprites.front_default,
                        types,
                        stats: {
                            hp,
                            attack,
                            defence,
                            speed,
                            specialAttack,
                            specialDefence
                        },
                        height,
                        weight,
                        abilities,
                        evs,
                        themeColor,
                        url
                    });

            });

        }
        fetchPokemonDetails();
    }, [props.match.params.pokemonIndex]);

  return (
      <div className='col-md-5'  >
          <div className="card overflow-auto" style={{
              position: 'fixed',
              top: '9%',
              bottom: 0,
              width: '40%', }} >
              <div className="card-header"   >
                  <div className="row" >
                      <div className="col-5">
                          <h5>{ props.match.params.pokemonIndex }</h5>
                      </div>
                      <div className="col-7">
                          <div className="float-right">
                              { pokemonsDetail.types.map(type => (
                                  <span
                                      key={ type }
                                      className="badge badge-primary badge-pill mr-1"
                                      style={ {
                                          backgroundColor: `#${ TYPE_COLORS[type] }`,
                                          color: 'white'
                                      } }
                                  >
                                      { type
                                          .toLowerCase()
                                          .split('-')
                                          .map(s => s.charAt(0)
                                              .toUpperCase() + s.substring(1))
                                          .join(" ")
                                      }
                                  </span>
                              )) }
                          </div>
                      </div>
                  </div>
              </div>

              {useMemo(
                  () => (
                      <React.Fragment>
                          <PokemonStat
                              pokemon={pokemonsDetail} />
                          <hr/>
                          <PokemonData url={pokemonsDetail.url} />
                      </React.Fragment>
                  ),
                  [pokemonsDetail]
              )}

          </div>
      </div>
  );
};

export default withErrorHandler(PokemonDetails, axios);