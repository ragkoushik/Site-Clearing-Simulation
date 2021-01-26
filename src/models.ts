export interface Bulldozer {
    xPos: number;
    yPos: number;
    facing: string;
    damage: number;
};

export interface History {
    bulldozer: Bulldozer,
    command: string
};

export interface ReduxState {
    site: string[][];
    bulldozer: Bulldozer;
    fuel: number;
    transactionalCost: number;
    error: string | null;
    history: History[];
    reservedTreeFound: boolean;
}

export interface ReportInterface {
    quantity: number;
    cost: number;
    item: string;
}