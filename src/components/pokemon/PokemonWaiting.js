import React from 'react';
import classes from './PokemonWaiting.module.css';


const PokemonWaiting = (props) => {
    console.log(props);
    return (
        <div className={classes.eevee} style={{ display: 'none'}}>
            <div className={classes.body}>
                <div className={classes.head}>
                    <div className={classes.ears}>
                        <div className={classes.ear}>
                            <div className={classes.lobe}></div>
                        </div>
                        <div className={classes.ear}>
                            <div className={classes.lobe}></div>
                        </div>
                    </div>
                    <div className={classes.face}>
                        <div className={classes.eyes}>
                            <div className={classes.eye}>
                                <div className={classes.eyelid}></div>
                            </div>
                            <div className={classes.eye}>
                                <div className={classes.eyelid}></div>
                            </div>
                        </div>
                        <div className={classes.nose}></div>
                        <div className={classes.mouth}></div>
                    </div>
                </div>
                <div className={classes.chest}>
                    <div className={classes.fur}>
                        <div className={classes.patch}></div>
                    </div>
                    <div className={classes.fur}>
                        <div className={classes.patch}></div>
                    </div>
                    <div className={classes.fur}>
                        <div className={classes.patch}></div>
                    </div>
                </div>
                <div className={classes.legs}>
                    <div className={classes.leg}>
                        <div className={classes.innerLeg}></div>
                    </div>
                    <div className={classes.leg}>
                        <div className={classes.innerLeg}></div>
                    </div>
                    <div className={classes.leg}>
                        <div className={classes.innerLeg}></div>
                    </div>
                    <div className={classes.leg}>
                        <div className={classes.innerLeg}></div>
                    </div>
                </div>
                <div className={classes.tail}>
                    <div className={classes.tail}>
                        <div className={classes.tail}>
                            <div className={classes.tail}>
                                <div className={classes.tail}>
                                    <div className={classes.tailEnd}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PokemonWaiting;