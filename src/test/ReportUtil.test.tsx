import React from 'react';
import { site } from '../../data/site';
import { calculateFuelConsumptionAndUpdateGrid } from '../utils/reports';

describe("Reports", () => {
    test('check if calculateFuelConsumptionAndUpdateGrid returns expected results - 1', () => {
        const props = {
            site: site,
            bulldozer: {
                xPos: 0,
                yPos: 1,
                facing: "EAST",
                damage: 0
            }
        }
        const transaction = calculateFuelConsumptionAndUpdateGrid(props.site, props.bulldozer, 1);
        expect(transaction).toMatchObject({
            fuel: 1,
            site: [...site]
        });
    });

    test('check if calculateFuelConsumptionAndUpdateGrid returns expected results for a tree cell', () => {
        const props = {
            site: site,
            bulldozer: {
                xPos: 0,
                yPos: 3,
                facing: "EAST",
                damage: 0
            }
        }
        const transaction = calculateFuelConsumptionAndUpdateGrid(props.site, props.bulldozer, 1);
        expect(transaction).toMatchObject({
            fuel: 2,
            site: [
                [
                    'o', 'o', 't', 'o',
                    'o', 'o', 'o', 'o',
                    'o', 'o'
                ],
                [
                    'o', 'o', 'o', 'o',
                    'o', 'o', 'o', 'T',
                    'o', 'o'
                ],
                [
                    'r', 'r', 'r', 'o',
                    'o', 'o', 'o', 'T',
                    'o', 'o'
                ],
                [
                    'o', 'r', 'r', 'r',
                    'o', 'o', 'o', 'o',
                    'o', 'o'
                ],
                [
                    'r', 'r', 'r', 'r',
                    'r', 't', 'o', 'o',
                    'o', 'o'
                ]
            ]
        });
    });


});
