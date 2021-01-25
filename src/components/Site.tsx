import { Table, TableBody, TableCell, TableContainer, TableRow, Box, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from "react-redux";
import '../css/Simulator.css';
import Bulldozer from './Bulldozer';
import {tileColors} from '../utils/constants'

function Site(props: any) {
    const defaultProps = {
        m: 1,
        style: {
            width: '3rem',
            height: '3rem',
            'text-align': 'center'
        },
    };
    return (
        <div>
            {/* <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Box bgcolor='#a1aab3' {...legendProps} > Rocky Land</Box>
                </Grid>
                <Grid item xs={3}>
                    <Box bgcolor='#a1aab3' {...legendProps} > Rocky Land</Box>
                </Grid>
                <Grid item xs={3}>
                    <Box bgcolor='#a1aab3' {...legendProps} > Rocky Land</Box>
                </Grid>
                <Grid item xs={3}>
                    <Box bgcolor='#a1aab3' {...legendProps} > Rocky Land</Box>
                </Grid>
            </Grid> */}

            <TableContainer className="site">
                <Table>
                    <TableBody>
                        {props.site.map((rows: string[], rowIdx: number) => (
                            <TableRow key={rowIdx}>
                                {rows.map((col: string, colIdx: number) => (
                                    <TableCell style={{background: tileColors[col]}} key={colIdx} align="center">
                                        { props.bulldozer.xPos === colIdx && props.bulldozer.yPos === rowIdx &&
                                            <Box bgcolor={tileColors[col]} {...defaultProps}> <Bulldozer /></Box> 
                                        }
                                        { !(props.bulldozer.xPos === colIdx && props.bulldozer.yPos === rowIdx) &&
                                            <Box bgcolor={tileColors[col]} {...defaultProps}> </Box>
                                        }
                                        
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        site: state.site,
        bulldozer: state.bulldozer
    };
};

export default connect(
    mapStateToProps
)(Site);