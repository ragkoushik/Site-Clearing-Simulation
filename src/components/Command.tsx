import React from 'react'
// import Terminal from 'terminal-in-react';
import '../css/Simulator.css';
import { connect } from "react-redux";
import { vIsNewPosOnSite } from '../utils/validation';
import { Bulldozer } from '../models';

import { Grid, IconButton, Snackbar, TextField } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { calculateFuelConsumptionAndUpdateGrid } from '../utils/reports'

function Command(props: any, state: {}): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [commandError, setcommandError] = React.useState('');

    const processCommand = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') {
            const values = (e.target as any).value.trim().split(' ');
            setcommandError('');
            setOpen(false);
            if (values.length > 1 && values[0].toLowerCase() === 'a') {
                advance(values);
            }
            else {
                if (values.length > 0 && values[0].toLowerCase() === 'l') {
                    leftTurn();
                } 
                else if (values.length > 0 && values[0].toLowerCase() === 'r') {
                    rightTurn();
                } 
                else if (values.length > 0 && values[0].toLowerCase() === 'q') {
                    quit();
                } 
                else {
                    setcommandError('Unknown command');
                    setOpen(true);
                }
            } 
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const advance = (params: string[]): void => {
        const value = params[1] ? params[1] : null;
        const result = vIsNewPosOnSite(props.site, { ...props.bulldozer }, Number(value));
        console.log(result)
        if (result.valid) {
            // calculate fuel
            const transaction = calculateFuelConsumptionAndUpdateGrid(props.site, result.bulldozer, props.history);
            // update location
            props.onUpdateBulldozerLocation(result.bulldozer, `advance ${params[1]}`);
            // update grid
            props.onUpdateSite(transaction.site);
            // update fuel
            props.onUpdateFuel(transaction.fuel);
        } else {
            // update location
            props.onUpdateBulldozerLocation(result.bulldozer, `advance ${params[1]}`);
            props.onBulldozerError(result.error);
            if(result.reservedTreeFound){
                props.onSetReservedTreeFound(result.reservedTreeFound);
            }
            setOpen(true);
        }

    }

    const leftTurn = (): void => {
        switch (props.bulldozer.facing) {
            case "EAST":
                props.bulldozer.facing = "NORTH";
                break;
            case "NORTH":
                props.bulldozer.facing = "WEST";
                break;
            case "WEST":
                props.bulldozer.facing = "SOUTH";
                break;
            case "SOUTH":
                props.bulldozer.facing = "EAST";
                break;
            default:
                props.bulldozer.facing = "EAST";
        };

        props.onUpdateBulldozerLocation({ ...props.bulldozer }, `turn left`);
    }

    const rightTurn = (): void => {
        console.log(props.bulldozer.facing)
        switch (props.bulldozer.facing) {
            case "EAST":
                props.bulldozer.facing = "SOUTH";
                break;
            case "SOUTH":
                console.log('in')
                props.bulldozer.facing = "WEST";
                break;
            case "WEST":
                props.bulldozer.facing = "NORTH";
                break;
            case "NORTH":
                props.bulldozer.facing = "EAST";
                break;
            default:
                props.bulldozer.facing = "EAST";
        };

        console.log(props.bulldozer)
        props.onUpdateBulldozerLocation({ ...props.bulldozer }, `turn right`);
    };

    const quit = (): void => {
        props.onUpdateBulldozerLocation(props.bulldozer, `q`);
        props.onBulldozerError(`The simulation has ended at your request`);
        setOpen(true);
    };

    return (
        <div>
            <label className="label">Controls</label>
            <Grid container direction="row" justify="center" alignItems="center">
                <div className="command">
                    <Grid item xs={12}>
                        <TextField label="Enter commands here"  onKeyDown={processCommand} variant="filled" />
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton onClick={e => advance(['a', "1"])} aria-label="up" >
                            <KeyboardArrowUpIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton onClick={e => leftTurn()} className="controls-left" aria-label="left"  >
                            <KeyboardArrowLeftIcon fontSize="large" />
                        </IconButton>
                        <IconButton onClick={e => rightTurn()} className="controls-right" aria-label="right"  >
                            <KeyboardArrowRightIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton onClick={e => quit()} aria-label="down">
                            <ExitToAppIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </div>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error">
                    <IconButton style={{ float: 'right' }} size="small" aria-label="close" color="inherit" onClick={e => handleClose()}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    {props.error? props.error : commandError}
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    console.log(state.bulldozer.facing)
    return {
        bulldozer: state.bulldozer,
        site: state.site,
        error: state.error,
        history: state.history
    };
};

const mapDispachToProps = (dispatch: any) => {
    return {
        onUpdateBulldozerLocation: (bulldozer: Bulldozer, command: string): void => {
            dispatch({ type: "UPDATE_BULLDOZER_LOCATION", value: { bulldozer, command } });
        },
        onSetReservedTreeFound: (reservedTreeFound: string): void => {
            dispatch({ type: "UPDATE_RESERVED_TREE_FOUND", value: { reservedTreeFound } });
        },
        onBulldozerError: (error: string) => {
            dispatch({ type: "ERROR", value: error });
        },
        onUpdateSite: (site: string[][]) => {
            dispatch({ type: "UPDATE_SITE", value: site });
        },
        onUpdateFuel: (fuel: number) => {
            dispatch({ type: "UPDATE_FUEL", value: fuel });
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Command);