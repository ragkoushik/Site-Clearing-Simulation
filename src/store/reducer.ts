import {ReduxState} from '../models';
import { costs } from '../utils/constants';

const initialState = {
    site: [],
    bulldozer: {
        xPos: -1,
        yPos: -1,
        facing: "EAST",
        damage: 0
    },
    fuel: 0,
    transactionalCost: 0,
    error: null,
    history: [],
    reservedTreeFound: false
};

const reducer = (state: ReduxState = initialState, action: {type: string; value: any}) => {
    let newState = { ...state };
    switch (action.type) {
        case "CREATE_SITE":
            newState.site = action.value;
            break;
        case "UPDATE_SITE":
            newState.site = action.value;
            break;
        case "UPDATE_FUEL":
            newState.fuel += action.value;
            break;
        case "UPDATE_BULLDOZER_LOCATION":
            newState.bulldozer = { ...action.value.bulldozer };
            newState.transactionalCost += costs.transaction;            // transaction costs
            newState.history = [...newState.history, {bulldozer: action.value.bulldozer, command: action.value.command}];
            break;
        case "ERROR":
            newState.error = action.value;
            break;
        case "UPDATE_RESERVED_TREE_FOUND":
            newState.reservedTreeFound = action.value;
            break;
        case "DESTROY":
            newState = { ...initialState };
            break;
        default:
        // code block
    }
    return newState;
};

export default reducer;