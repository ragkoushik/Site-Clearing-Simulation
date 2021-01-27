import { BulldozerType } from "../models";

// Update bulldozer location
export const actionOnUpdateBulldozerLocation = (bulldozer: BulldozerType, command: string) => (
    { type: "UPDATE_BULLDOZER_LOCATION", value: { bulldozer, command } }
);

// protected tree found ?
export const actionOnSetReservedTreeFound = (reservedTreeFound: string) => (
    { type: "UPDATE_RESERVED_TREE_FOUND", value: { reservedTreeFound } }
);

// track simulation errors
export const actionOnBulldozerError = (error: string) => (
    { type: "ERROR", value: error }
);

// track fuel consumptions
export const actionOnUpdateFuel = (fuel: number) => (
    { type: "UPDATE_FUEL", value: fuel }
)

// end simulation
export const actionOnSimulationEnd = (data: string) => ({ type: "DESTROY", value: data });

// site actions

export const actionOnCreateSite = (data: string) => ({ type: "CREATE_SITE", value: data });

export const actionOnUpdateSite = (site: string[][]) => (
    { type: "UPDATE_SITE", value: site }
);
