import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {comments} from './comments';
import {promotions} from './promotions';
import {leaders} from './leaders';
import{favourites} from './favourites';
import {persistStore,persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';

export const ConfigureStore=()=>{
    const config={
        key:'root',
        storage,
        debug:true
    }
    const  store=createStore(
        //combineReducers({
        persistCombineReducers(config,{
            dishes,
            comments,
            promotions,
            leaders,
            favourites
        }),
        applyMiddleware(thunk,logger)
    );

    const persistor=persistStore(store);
    return {persistor,store};
}