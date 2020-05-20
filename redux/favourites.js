import * as ActionTypes from './ActionTypes';

export const favourites=(
    state=[],
    action)=>{
        switch(action.type){
            case ActionTypes.ADD_FAVOURITE:
                if(state.some(el=>el === action.payload))
                    return state;
                else
                    return state.concat(action.payload);
            case ActionTypes.DELETE_FAVORITE:
                return(state.filter((favorite)=>favorite!==action.payload))
            default:
                return state;

        }

    };
