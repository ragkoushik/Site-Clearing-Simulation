export interface BulldozerType {
    xPos: number;
    yPos: number;
    facing: string;
    damage: number;
};

export interface History {
    bulldozer: BulldozerType,
    command: string
};

export interface ReduxState {
    site: string[][];
    bulldozer: BulldozerType;
    fuel: number;
    transactionalCost: number;
    error: string | null;
    history: History[];
    reservedTreeFound: boolean;
}

export interface ReportTableInterface {
    quantity: number;
    cost: number;
    item: string;
}

export interface ReportPropsInterface {
    site: string[][];
    fuel: number;
    transactionalCost: number;
    bulldozer: BulldozerType;
    history: History[];
    error: string;
    reservedTreeFound: boolean;
}
export interface CommandStateInterface {
    bulldozer: BulldozerType,
    site: string[][],
    error: string,
    history: History[];
    onUpdateBulldozerLocation: Function;
    onSetReservedTreeFound: Function;
    onBulldozerError: Function;
    onUpdateSite: Function;
    onUpdateFuel: Function;
};

export interface UploadPropsInterface {
    onCreateSite: Function;
    site: string[][];
}

export interface UploadStateInterface {
    files: any;
    accept: string[];
    timePassed: boolean;
    redirect: string | null;
    error: string | null;
    open: boolean;
}

export interface DropzonePropsInterface {
    filesAdded: any;
    accept: string[];
}

export interface DropzoneStateInterface { 
    hightlight: boolean;
}

export interface SimulatorPropsInterface {
    site: string[][];
    bulldozer: BulldozerType;
    error: String;
    onSimulationEnd: Function;
};

export interface SimulatorStateInterface {
    redirect: string;
}

export interface SiteStateInterface {
    site: string[][];
    bulldozer: BulldozerType;
};