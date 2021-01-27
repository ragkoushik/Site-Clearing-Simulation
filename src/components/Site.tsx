import { Table, TableBody, TableCell, TableContainer, TableRow, Box } from '@material-ui/core';
import React from 'react';
import { connect } from "react-redux";
import '../css/Simulator.css';
import Bulldozer from './Bulldozer';
import { tiles } from '../utils/constants'
import { SiteStateInterface } from '../models';

function Site(props: SiteStateInterface): JSX.Element  {
    const defaultProps = {
        m: 1,
        style: {
            width: '3rem',
            height: '3rem'
        },
    };
    return (
        <TableContainer className="site">
            <Table>
                <TableBody>
                    {props.site.map((rows: string[], rowIdx: number) => (
                        <TableRow key={rowIdx}>
                            {rows.map((col: string, colIdx: number) => (
                                <TableCell style={{ backgroundImage: `url(${tiles[col].iconUrl})`, backgroundSize: "contain" }} key={colIdx} align="center">
                                    { props.bulldozer.xPos === colIdx && props.bulldozer.yPos === rowIdx &&
                                        <Box  {...defaultProps}> <Bulldozer /></Box>
                                    }
                                    { !(props.bulldozer.xPos === colIdx && props.bulldozer.yPos === rowIdx) &&
                                        <Box  {...defaultProps}> </Box>
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = (state: any) => {
    return {
        site: state.site,
        bulldozer: state.bulldozer
    };
};

export default connect(
    mapStateToProps
)(Site);