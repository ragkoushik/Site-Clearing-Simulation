import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import '../css/Simulator.css';
import Site from './Site';
import Command from './Command';
import Bulldozer from './Bulldozer';
import React, { useState, useEffect } from "react"

// local state
interface SimulatorState {
    redirect: string | null;
}

function Simulator(props: any, state: SimulatorState) {
    state = {
        redirect: null
    };
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        const loadImage = (image: string) => new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = image;
            // wait 2 seconds to simulate loading time
            loadImg.onload = () => setTimeout(() => {
                resolve(image);
            }, 2000);

            loadImg.onerror = err => reject(err);
        })

        loadImage('https://www.iconshock.com/image/RealVista/Construction/bulldozer')
            .then(() => setImgLoaded(true))
            .catch(err => console.log("Failed to load images", err))
    }, [])

    if (!props.site || props.site.length <= 0) {
        return <Redirect to={state.redirect ? state.redirect : "/"} />
    }
    else {
        if (!imgLoaded) {
            return <div className="center"><CircularProgress disableShrink /></div>
        }
        else {
            return (
                <div className="center">
                    <div className="simulator">
                        <label className="label">Simulator</label>
                        {props.bulldozer.xPos === -1 && props.bulldozer.yPos === -1 ?
                            <Grid container spacing={3}>
                                <Grid item xs={1}>
                                    <Bulldozer />
                                </Grid>
                                <Grid item xs={11}>
                                    <Site />
                                </Grid>
                                <Grid item xs={12}>
                                    <Command />
                                </Grid>
                            </Grid> :
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Site />
                                </Grid>
                                <Grid item xs={12}>
                                    <Command />
                                </Grid>
                            </Grid>
                        }
                    </div>
                </div>)
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        site: state.site,
        bulldozer: state.bulldozer
    };
};

export default connect(
    mapStateToProps
)(Simulator);