import {ReduxState} from '../models';

const initialState = {
    site: [],
    bulldozer: {
        xPos: -1,
        yPos: -1,
        facing: "EAST",
    },
    fuel: 0,
    cost: 0
};

const reducer = (state: ReduxState = initialState, action: {type: string; value: any}) => {
    const newState = { ...state };
    switch (action.type) {
        case "CREATE_SITE":
            newState.site = action.value;
            break;
        case "UPDATE_BULLDOZER_LOCATION":
            console.log(action)
            newState.bulldozer = { ...action.value };
            break;
        default:
        // code block
    }
    console.log(newState)
    return newState;
};

export default reducer;