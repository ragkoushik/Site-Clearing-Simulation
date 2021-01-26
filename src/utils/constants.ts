export const facingAngle: { [key: string]: {
    angle: number;
    scaleX: number;
    scaleY: number;
}} = {
    "NORTH": {
        angle: 90,
        scaleX: -1,
        scaleY: -1
    },
    "SOUTH": {
        angle: -90,
        scaleX: -1,
        scaleY: -1
    },
    "EAST": {
        angle: 0,
        scaleX: 1,
        scaleY: 1
    },
    "WEST": {
        angle: 180,
        scaleX: 1,
        scaleY: -1
    }
};

export const tiles: { [key: string]: {
    fuel: number;
    iconUrl: string;
}} = {
    "o": {
        fuel: 1,
        iconUrl: "o.png"
    },
    "r": {
        fuel: 2,
        iconUrl: "r.png"
    },
    "t": {
        fuel: 2,
        iconUrl: "t.png"
    },
    "T": {
        fuel: 0,
        iconUrl: "T.jpg"
    }
};

export const costs: { [key: string]: number } =  {
    transaction: 1,
    fuelPerSq: 1,
    unclearedPerSq: 3,
    protectedTreeDamage: 10,
    damage: 2
}

export const commands: string[] = ["a", "r", "l", "q"];