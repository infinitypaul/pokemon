import React, {useState, useEffect} from 'react';
import axios from "axios";

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
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${props.match.params.pokemonIndex}`;

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
                    console.log(res.data.weight);
                const height = Math.round((res.data.height * 0.328084 + 0.00001) * 100) / 100;
                const weight = Math.round((res.data.weight * 0.220462 + 0.00001) * 100) / 100;
                const types = res.data.types.map(type => type.type.name);
                    console.log(weight);
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
                        evs
                    });

            });



            await axios
                .get(pokemonSpeciesUrl)
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

        }
        fetchPokemonDetails();
    }, [props.match.params.pokemonIndex]);

  return <div className='col'>
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
          <div className="card-body">
              <div className="row align-items-center">
                  <div className="col-md-3">
                      <img src={ pokemonsDetail.imageUrl } className='card-img-top rounded mx-auto mt-2' alt=""/>
                  </div>
                  <div className="col-md-9">
                      <h4 className="mx-auto">
                          { pokemonsDetail.name.toLowerCase()
                              .split('-')
                              .map(s => s.charAt(0)
                                  .toUpperCase() + s.substring(1))
                              .join(" ") }
                      </h4>

                      <div className="row align-item-center">
                          <div className="col-12 col-md-4">HP</div>
                          <div className="col-12 col-md-8">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressBar"
                                      style={ {
                                          width: `${ pokemonsDetail.stats.hp }%`
                                      } }
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ pokemonsDetail.stats.hp }%</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row align-item-center">
                          <div className="col-12 col-md-4">Attk</div>
                          <div className="col-12 col-md-8">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressBar"
                                      style={ {
                                          width: `${ pokemonsDetail.stats.attack }%`
                                      } }
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ pokemonsDetail.stats.attack }%</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row align-item-center">
                          <div className="col-12 col-md-4">Def</div>
                          <div className="col-12 col-md-8">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressBar"
                                      style={{
                                          width: `${ pokemonsDetail.stats.defence }%`
                                      }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ pokemonsDetail.stats.defence }%</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row align-item-center">
                          <div className="col-12 col-md-4">SP Atk</div>
                          <div className="col-12 col-md-8">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressBar"
                                      style={ {
                                          width: `${pokemonsDetail.stats.specialAttack}%`
                                      } }
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{pokemonsDetail.stats.specialAttack}%</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row align-item-center">
                          <div className="col-12 col-md-4">Sp Def</div>
                          <div className="col-12 col-md-8">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressBar"
                                      style={ {
                                          width: `${ pokemonsDetail.stats.specialDefence }%`
                                      } }
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ pokemonsDetail.stats.specialDefence }%</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row align-item-center">
                          <div className="col-12 col-md-4" title="Speed">Spd</div>
                          <div className="col-12 col-md-8">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressBar"
                                      style={ {
                                          width: `${ pokemonsDetail.stats.speed }%`
                                      } }
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ pokemonsDetail.stats.speed }%</small>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
                  <div className="row mt-2">
                      <div className="col">
                          <p className="p-1">{species.description}</p>
                      </div>
                  </div>
              </div>

          </div>
          <hr/>
          <div className="card-body">
              <h5 className="card-title text-center">
                  Data
              </h5>
              <div className="row">
                  <div className="col-md-12">
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Height:</h6>
                          </div>
                          <div className="col-md-7">
                              <h6 className="float-left">{pokemonsDetail.height} ft.</h6>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Weight:</h6>
                          </div>

                          <div className="col-md-7">
                              <h6 className="float-left">{pokemonsDetail.weight} lbs.</h6>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Cache Rate:</h6>
                          </div>

                          <div className="col-md-7">
                              <h6 className="float-left">{species.catchRate} %.</h6>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Gender Ratio:</h6>
                          </div>

                          <div className="col-md-7">
                              <div className="progress">
                                  <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={ {
                                          width: `${ species.genderRatioFemale }%`,
                                          backgroundColor: '#c2185b'
                                      } }
                                      aria-valuenow="15"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ species.genderRatioFemale }</small>
                                  </div>
                                  <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={ {
                                          width: `${ species.genderRatioMale }%`,
                                          backgroundColor: '#1976d2'
                                      } }
                                      aria-valuenow="30"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                  >
                                      <small>{ species.genderRatioMale }</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Egg Groups:</h6>
                          </div>

                          <div className="col-md-7">
                              <h6 className="float-left">{species.eggGroup}</h6>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Hatch Steps:</h6>
                          </div>

                          <div className="col-md-7">
                              <h6 className="float-left">{species.hatchSteps}</h6>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">Abilities:</h6>
                          </div>

                          <div className="col-md-7">
                              <h6 className="float-left">{pokemonsDetail.abilities}</h6>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-5">
                              <h6 className="float-right">EVS:</h6>
                          </div>

                          <div className="col-md-7">
                              <h6 className="float-left">{pokemonsDetail.evs}</h6>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>;
};

export default PokemonDetails;