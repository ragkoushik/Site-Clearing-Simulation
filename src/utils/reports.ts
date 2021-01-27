import { BulldozerType } from "../models";
import { tiles } from "./constants";

export const calculateFuelConsumptionAndUpdateGrid = (site: string[][], bulldozer: BulldozerType, movePositions: number) : {
    fuel: number;
    site: string[][]
} => {
    let transaction = {
        fuel: movePositions - 1, // exclude cell to be moved to to avoid doubling
        site: [...site]
    };

    transaction.fuel += tiles[site[bulldozer.yPos][bulldozer.xPos]].fuel;
    if(site[bulldozer.yPos][bulldozer.xPos] === "r"){
        transaction.site[bulldozer.yPos][bulldozer.xPos] = "o";
    } 
    else if(site[bulldozer.yPos][bulldozer.xPos] === "t"){
        transaction.site[bulldozer.yPos][bulldozer.xPos] = "o";
    }
    return transaction;
}
