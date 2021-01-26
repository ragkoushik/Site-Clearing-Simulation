import {Bulldozer} from '../models';

export function vSite(site: string): { valid: boolean; grid: string[][]; error: string; } {
    let valid = true;
    const grid: string[][] = [];
    let error = '';
    try {
        if (!site) {
            valid = false;
            error = "Invalid site file format";
        } else {
            const rows = site.split("\n");
            let length = 0;
            rows.forEach((row: string, idx: number): void => {
                const cols = row.trim().split('');
                if(valid){
                    if (length === 0 || length === cols.length) {
                        // first cell can never have an unremovable tree, validate
                        if(idx === 0 && cols[0] === 'T'){
                            error = `Failed validation on line ${idx} column 0, square can't contain an unremovable tree`;
                            valid = false;
                        }

                        const validateLetters = diff(cols, ["o", "r", "t", "T"]);
                        if(valid && validateLetters && validateLetters.length > 0){
                            error = `Failed validation on line ${idx}, ${validateLetters.join(',')} ${validateLetters.length === 1 ? 'is not a valid input' : 'are not valid inputs'}`;
                            valid = false;
                        } else {
                            grid[idx] = cols;
                            length = grid[idx].length;
                        }
                    } else {
                        error = `Failed validation on line ${idx}, length mismatch. All rows should be of equal length`;
                        valid = false;
                    }
                }
            });
        }
    } catch (e) {
        valid = false;
        error = JSON.stringify(e);
    }


    return {
        valid,
        grid,
        error
    };
}

function diff (arr1: string[], arr2: string[]): string[]  {
    return arr1.filter(x => !arr2.includes(x));
}

export function vAdvanceInput(input: string): boolean {
    if(!isNaN(Number(input))){
        return true;
    }

    return false;
}

export function vIsNewPosOnSite(grid: string[][], oldBulldozerLocation: Bulldozer, movePositions: number): {
    valid: Boolean;
    bulldozer: Bulldozer;
    error: string | null;
    end: boolean;
    reservedTreeFound: boolean;
} {
    if(movePositions <= 0) {
        return {
            valid: false,
            bulldozer: oldBulldozerLocation,
            error: 'Cant advance backwords with negative values from cmd',
            end: false,
            reservedTreeFound: false
        };
    }

    const bulldozer = { ...oldBulldozerLocation}
    const gridSize = {
        x: grid[0].length,
        y: grid.length
    };

    let gridsBetween: string[] = [];
    if(bulldozer.facing === "EAST") {
        bulldozer.yPos = bulldozer.yPos === -1 ? bulldozer.yPos + 1 : bulldozer.yPos;
        bulldozer.xPos = bulldozer.xPos + movePositions;
        gridsBetween = simulatePassingThrough(grid, oldBulldozerLocation.xPos, bulldozer.xPos, 'x', bulldozer.yPos);
    } 
    else if(bulldozer.facing === "WEST") {
        bulldozer.xPos = bulldozer.xPos - movePositions;
        gridsBetween = simulatePassingThrough(grid, oldBulldozerLocation.xPos, bulldozer.xPos, 'x', bulldozer.yPos);
    }
    else if(bulldozer.facing === "NORTH") {
        bulldozer.yPos = bulldozer.yPos - movePositions;
        gridsBetween = simulatePassingThrough(grid, oldBulldozerLocation.yPos, bulldozer.yPos, 'y', bulldozer.xPos);
    }
    else if(bulldozer.facing === "SOUTH") {
        bulldozer.yPos = bulldozer.yPos + movePositions;
        gridsBetween = simulatePassingThrough(grid, oldBulldozerLocation.yPos, bulldozer.yPos, 'y', bulldozer.xPos);
    }

    if (bulldozer.xPos > -1 && bulldozer.yPos > -1 && bulldozer.xPos < gridSize.x && bulldozer.yPos < gridSize.y){
        if(gridsBetween && gridsBetween.length > 0 && gridsBetween.includes("T")){
            return {
                valid: false,
                bulldozer: bulldozer,
                error: 'An attempt was made pass through a protected square.',
                end: true,
                reservedTreeFound: true
            };

        } else {
            if(gridsBetween && gridsBetween.length > 0){
                // exclude the last cell that we are moving to
                const considerGrids = gridsBetween.splice(gridsBetween.length, 1);
                bulldozer.damage += considerGrids.filter(grid => grid === 't').length;
            }

            return {
                valid: true,
                bulldozer,
                error: null,
                end: false,
                reservedTreeFound: false
            };
        }
       
    }
    
    return {
        valid: false,
        bulldozer: oldBulldozerLocation,
        error: 'An attempt was made to move the bulldozer out of site, ending simulation.',
        end: true,
        reservedTreeFound: false
    };
}

function simulatePassingThrough(grid: string[][], startPos: number, end: number, direction: string, fixedPos: number): string[] {

    // simulate passing through squares
    const gridsBetween = [];
    if(end >= startPos) {
        const i = startPos > 0 ? startPos : 1;
        for(let start = i; start <= end ; start++){
            if(direction === 'x' && grid[fixedPos] && grid[fixedPos][start]){
                gridsBetween.push(grid[fixedPos][start]);
            } 
            else if(direction === 'y' && grid[start] && grid[start][fixedPos] ){
                gridsBetween.push(grid[start][fixedPos]);
            }
        }    
    } else {
        for(let start = startPos; start >= end ; start--){
            if(direction === 'x' && grid[fixedPos] && grid[fixedPos][start]){
                gridsBetween.push(grid[fixedPos][start]);
            } 
            else if(direction === 'y' && grid[start] && grid[start][fixedPos] ){
                gridsBetween.push(grid[start][fixedPos]);
            }
        } 
    }
    console.log(gridsBetween)
    return gridsBetween;
}