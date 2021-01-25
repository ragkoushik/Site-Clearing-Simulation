export interface Bulldozer {
    xPos: number;
    yPos: number;
    facing: string;
};

export interface ReduxState {
    site: string[][];
    bulldozer: Bulldozer;
    fuel: number;
    cost: number;
}
