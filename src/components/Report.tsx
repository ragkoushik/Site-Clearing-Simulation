import {TableContainer, Table, TableHead,TableBody, TableRow, TableCell } from '@material-ui/core';
import React from 'react';
import { connect } from "react-redux";
import '../css/Simulator.css';
import { History, ReportTableInterface, ReportPropsInterface } from '../models';
import { costs } from '../utils/constants';

function Report(props: ReportPropsInterface): JSX.Element {
    const totalCosts = (arr: ReportTableInterface[]) => {
        return arr.reduce((a, b) => a + (b['cost'] || 0), 0);
    }

    const unclearedSquares = (): ReportTableInterface => {
        let unclearedCells: string[] = [];
        props.site.forEach((row: string[]) => {
            unclearedCells = unclearedCells.concat(row.filter((col: string) => {
                return ["r", "t"].includes(col);
            }))
        });
        // console.log(unclearedCells)
        return {
            item: 'Uncleared squares',
            quantity: unclearedCells.length,
            cost: unclearedCells.length * costs.unclearedPerSq
        }
    }

    const damageCost = (): ReportTableInterface => {
        return {
            quantity: props.bulldozer.damage,
            cost: props.bulldozer.damage * costs.damage,
            item: 'Damage cost'
        }
    }

    const protectedTreeDamagesCost = (): ReportTableInterface => {
        if(props.reservedTreeFound){
            // there can ever be 1 protected entry
            return {
                quantity: 1,
                cost: costs.protectedTreeDamage,
                item: 'Destruction of protected tree'
            }
        }
        else {
           // there can ever be 1 protected entry
           return {
                quantity: 0,
                cost: 0,
                item: 'Destruction of protected tree'
            }     
        }
       
    }

    const buildHistoryList = () => {
        if (props.history.length <= 0) {
            return
        }
        let cmdHistory: string[] = [];
        props.history.forEach((history: History) => {
            cmdHistory.push(history.command);
        })

        return cmdHistory.join(', ');
    }

    const rows = (): ReportTableInterface[] => {
        return [
            {
                item: 'Communication overhead',
                quantity: props.transactionalCost,
                cost: props.transactionalCost * costs.transaction
            },
            {
                item: 'Fuel usage',
                quantity: props.fuel,
                cost: props.fuel * costs.fuelPerSq
            },
            protectedTreeDamagesCost(),
            unclearedSquares(),
            damageCost()
        ];
    }

    return (
        <TableContainer>
            <p style={{marginBottom: '20px'}}>Commands run: {buildHistoryList()}</p> 
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows().map((row, idx) => (
                        <TableRow key={row.item}>
                            <TableCell component="th" scope="row">
                                {row.item}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <p className="report">Total cost: {totalCosts(rows())}</p> 
        </TableContainer>
    );
}

const mapStateToProps = (state: any) => {
    return {
        site: state.site,
        fuel: state.fuel,
        transactionalCost: state.transactionalCost,
        bulldozer: state.bulldozer,
        history: state.history,
        error: state.error,
        reservedTreeFound: state.reservedTreeFound
    };
};

export default connect(
    mapStateToProps
)(Report);