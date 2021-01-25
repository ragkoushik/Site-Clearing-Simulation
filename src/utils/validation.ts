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
                        const validateLetters = diff(cols, ["o", "r", "t", "T"]);
                        if(validateLetters && validateLetters.length > 0){
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
} {
    const bulldozer = { ...oldBulldozerLocation}
    const gridSize = {
        x: grid[0].length,
        y: grid.length
    };

    if(bulldozer.facing === "EAST") {
        bulldozer.yPos = bulldozer.yPos === -1 ? bulldozer.yPos + 1 : bulldozer.yPos;
        bulldozer.xPos = bulldozer.xPos + movePositions;
    } 
    else if(bulldozer.facing === "WEST") {
        bulldozer.xPos = bulldozer.xPos - movePositions;
    }
    else if(bulldozer.facing === "NORTH") {
        bulldozer.yPos = bulldozer.yPos - movePositions;
    }
    else if(bulldozer.facing === "SOUTH") {
        bulldozer.yPos = bulldozer.yPos + movePositions;
    }
    console.log(gridSize, movePositions)
    if (bulldozer.xPos > -1 && bulldozer.yPos > -1 && bulldozer.xPos < gridSize.x && bulldozer.yPos < gridSize.y){
        return {
            valid: true,
            bulldozer
        }
    }

    return {
        valid: false,
        bulldozer: oldBulldozerLocation
    };
}