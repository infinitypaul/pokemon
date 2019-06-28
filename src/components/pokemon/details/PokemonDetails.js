import React, {useState, useEffect, useMemo} from 'react';
import axios from "axios/index";

import PokemonData from "./data/PokemonData";
import PokemonStat from "./data/PokemonStat";

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

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
        themeColor: '#EF5350'
    });
    const [species, setSpecies] = useState({
        eggGroup:'',
        genderRatioMale:'',
        genderRatioFemale:'',
        hatchSteps:'',
        catchRate: '',
        description:''
    });
    useEffect(() => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${props.match.params.pokemonIndex}`;

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
                        themeColor
                    });

                     axios
                        .get(res.data.species.url)
                        .then((result)=>{
                            // console.log(result.data);
                            let description = '';
                            result.data.flavor_text_entries.some(flavor => {
                                if(flavor.language.name === 'en'){
                                    description = flavor.flavor_text;
                                    return;
                                }
                            });
                            const femaleRate = result.data['gender_rate'];
                            const genderRatioFemale = 12.5 * femaleRate;
                            const genderRatioMale = 12.5 * (8 - femaleRate);

                            const catchRate = Math.round((100/225) * result.data['capture_rate']);

                            const eggGroup = result.data['egg_groups'].map(group=>{
                                return group.name
                                    .toLowerCase()
                                    .split('-')
                                    .map(s => s.charAt(0)
                                        .toUpperCase()+ s.substring(1))
                                    .join(" ")
                            }).join(", ");

                            const hatchSteps = 255 * (result.data['hatch_counter'] + 1);

                            setSpecies({
                                description,
                                genderRatioFemale,
                                genderRatioMale,
                                eggGroup,
                                catchRate,
                                hatchSteps,
                            })
                        })

            });





        }
        fetchPokemonDetails();
    }, [props.match.params.pokemonIndex]);

  return (
      <div className='col'>
          <div className="card ">
              <div className="card-header">
                  <div className="row">
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
                                      { type.toLowerCase()
                                          .split('-')
                                          .map(s => s.charAt(0)
                                              .toUpperCase() + s.substring(1))
                                          .join(" ") }
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
                              pokemon={pokemonsDetail}
                              specy={species} />
                          />
                          <hr/>
                          <PokemonData
                              pokemon={pokemonsDetail}
                              specy={species} />
                      </React.Fragment>
                  ),
                  [pokemonsDetail]
              )}

          </div>
      </div>
  );
};

export default PokemonDetails;