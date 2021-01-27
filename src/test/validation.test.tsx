import React from 'react';
import { site } from '../../data/site';
import { vAdvanceInput, vIsNewPosOnSite, vSite } from '../utils/validation';

describe("validation", () => {

    test('site should be setup without errors', () => {
        const passSite = `ootooooooo
                        oooooooToo
                        rrrooooToo
                        rrrroooooo
                        rrrrrtoooo`;

        expect(vSite(passSite).valid).toEqual(true);
    });

    test('site is invalid due to unequal dimentions', () => {
        const failDueToUnequalLength = `ootooooooo
                                        oooooooToo
                                        rrrooooToo
                                        rrrroooooo
                                        rrrrro`;
        const result = vSite(failDueToUnequalLength);
        expect(result.valid).toEqual(false);
        expect(result.error).toEqual("Failed validation on line 4, length mismatch. All rows should be of equal length");
    });

    test('site is invalid due to invalid characters in site map', () => {
        const failSiteDueToInvalidChars = `ootooooooo
                                            oosooooToo
                                            rrrooooToo
                                            rrrroooooo
                                            rrrrrtooow`;
        const result = vSite(failSiteDueToInvalidChars);
        expect(result.valid).toEqual(false);
        expect(result.error).toEqual("Failed validation on line 1, s is not a valid input");
    });

    test('advance command is invalid', () => {
        expect(vAdvanceInput('0')).toEqual(false);
    });

    test('advance command is valid', () => {
        expect(vAdvanceInput('1')).toEqual(true);
    });

    test('next step is invalid', () => {
        const props = {
            site: site,
            bulldozer: {
                xPos: 0,
                yPos: 0,
                facing: "EAST",
                damage: 0
            }
        }
        const result = vIsNewPosOnSite(props.site, props.bulldozer, -1);
        expect(result.valid).toEqual(false);
        expect(result.error).toEqual("Cant advance backwords with negative values from cmd");
    });

    test('next step is valid', () => {
        const props = {
            site: site,
            bulldozer: {
                xPos: 0,
                yPos: 0,
                facing: "EAST",
                damage: 0
            }
        }
        const result = vIsNewPosOnSite(props.site, props.bulldozer, 1);
        expect(result).toMatchObject({
            valid: true,
            bulldozer: {
                xPos: 1,
                yPos: 0,
                facing: "EAST",
                damage: 0
            },
            error: null,
            end: false,
            reservedTreeFound: false
        });
    });


});
