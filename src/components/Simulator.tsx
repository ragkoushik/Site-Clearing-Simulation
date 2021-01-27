import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import '../css/Simulator.css';
import Site from './Site';
import Command from './Command';
import Bulldozer from './Bulldozer';
import Report from './Report';
import React from 'react';
import { actionOnSimulationEnd } from '../store/actions';
import { SimulatorPropsInterface, SimulatorStateInterface } from '../models';

function Simulator(props: SimulatorPropsInterface, state: SimulatorStateInterface): JSX.Element {
    const [redirect, setRedirect] = React.useState('');
    const handleClose = () => {
        props.onSimulationEnd('destroy');
        setRedirect("/");
    };

    if (!props.site || props.site.length <= 0 || redirect !== '') {
        return <Redirect to={redirect ? redirect : "/"} />
    }
    else {
        return (
            <div className="center">
                <div className="simulator">
                    <label className="label">Simulator</label>
                    {props.bulldozer.xPos === -1 && props.bulldozer.yPos === -1 ?
                        <Grid container spacing={3}>
                            <Grid item xs={1}>
                                <div className="bulldozer">
                                    <Bulldozer />
                                </div>
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
                    {props.error &&
                        <div>
                            <Dialog onClose={handleClose} open={true}>
                                <DialogTitle>Simulator ended</DialogTitle>
                                <DialogContent>
                                    <Report />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    }
                </div>
            </div>)
    }
}

const mapStateToProps = (state: any) => {
    return {
        site: state.site,
        bulldozer: state.bulldozer,
        error: state.error
    };
};

const mapDispachToProps = (dispatch: any) => {
    return {
        onSimulationEnd: (data: string) => dispatch(actionOnSimulationEnd(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Simulator);