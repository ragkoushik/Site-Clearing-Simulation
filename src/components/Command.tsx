import React, { Component } from 'react'
import Terminal from 'terminal-in-react';
import '../css/Simulator.css';
import { connect } from "react-redux";
import { vIsNewPosOnSite } from '../utils/validation';
import { Bulldozer } from '../models';
import { Redirect } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Grid } from '@material-ui/core';

class Command extends Component<any, { redirect: string | null; }> {
    constructor(props: any) {
        super(props);
        this.state = {
            redirect: null
        };

        this.advance = this.advance.bind(this);
        this.leftTurn = this.leftTurn.bind(this);
        this.rightTurn = this.rightTurn.bind(this);
        this.quit = this.quit.bind(this);
    }
    render(): JSX.Element {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect ? this.state.redirect : "/"} />
        } else {
            return (
                <div>
                    <label className="label">Controls</label>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <div className="command">
                                <Terminal
                                color='green'
                                backgroundColor='black'
                                barColor='black'
                                style={{ fontWeight: "bold", fontSize: "1em" }}
                                commands={{
                                    advance: this.advance,
                                    left: this.leftTurn,
                                    right: this.rightTurn,
                                    quit: this.quit
                                }}
                                description={{
                                    advance: 'this command takes a positive integer parameter to define the number of squares the bulldozer should move forwards (in whatever direction it is currently facing)',
                                    left: 'turn the bulldozer (on the spot) 90 degrees to the left of the direction it is facing',
                                    right: 'turn the bulldozer 90 degrees to the right',
                                    quit: 'end the simulation'
                                }}
                                msg='Enter commands to operate bulldozer'
                            />
                            </div>
                            
                        </Grid>
                        <Grid item xs={4}>
                            <div className="controls">
                                <Grid item xs={12}>
                                    <IconButton  onClick={e => this.advance(['advance', "1"]) } aria-label="up" >
                                        <KeyboardArrowUpIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <IconButton  onClick={e => this.leftTurn()} className="controls-left" aria-label="left"  >
                                        <KeyboardArrowLeftIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton  onClick={e => this.rightTurn() } className="controls-right" aria-label="right"  >
                                        <KeyboardArrowRightIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <IconButton  onClick={e => this.quit() } aria-label="down">
                                        <ExitToAppIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                            </div>

                        </Grid>
                    </Grid>

                </div>
            );
        }
    }

    advance(params: string[]): void {
        const value = params[1] ? params[1] : null;
        const result = vIsNewPosOnSite(this.props.site, this.props.bulldozer, Number(value));

        console.log(this.props, result)
        if (result.valid) {
            this.props.onUpdateBulldozerLocation(result.bulldozer);
        }
    }

    leftTurn(): void {
        const bulldozer = this.props.bulldozer;
        console.log(bulldozer.facing)
        switch (bulldozer.facing) {
            case "EAST":
                bulldozer.facing = "NORTH";
                break;
            case "NORTH":
                bulldozer.facing = "WEST";
                break;
            case "WEST":
                bulldozer.facing = "SOUTH";
                break;
            case "SOUTH":
                bulldozer.facing = "EAST";
                break;
            default:
                bulldozer.facing = "EAST";
        };

        this.props.onUpdateBulldozerLocation(bulldozer);
    }

    rightTurn(): void {
        const bulldozer = this.props.bulldozer;
        switch (bulldozer.facing) {
            case "EAST":
                bulldozer.facing = "SOUTH";
                break;
            case "SOUTH":
                bulldozer.facing = "WEST";
                break;
            case "WEST":
                bulldozer.facing = "NORTH";
                break;
            case "NORTH":
                bulldozer.facing = "EAST";
                break;
            default:
                bulldozer.facing = "EAST";
        };

        this.props.onUpdateBulldozerLocation(bulldozer);
    };

    quit(): void {
        this.setState({ redirect: "/" });
    };


}

const mapStateToProps = (state: any) => {
    return {
        bulldozer: state.bulldozer,
        site: state.site
    };
};

const mapDispachToProps = (dispatch: any) => {
    return {
        onUpdateBulldozerLocation: (bulldozer: Bulldozer) => {
            dispatch({ type: "UPDATE_BULLDOZER_LOCATION", value: bulldozer })
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Command);