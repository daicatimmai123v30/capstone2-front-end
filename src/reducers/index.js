import { combineReducers} from 'redux'
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    user:userReducer,
    chat:chatReducer
})
const persistConfig = {
    key:'root',
    storage,
    whitelist:['user','chat']
}
export default persistReducer(persistConfig,rootReducer);