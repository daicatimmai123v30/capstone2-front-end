import {ADD_PET, HIDE_LOADING, LOAD_PETS, SHOW_LOADING, USER_ERROR, USER_LOAD, USER_LOGIN, USER_LOGOUT,ACCEPT_CALLING, REFUSE_CALLING, WAIT_CALLING} from '../actions/types'
const intitalState ={
    isAuthentication:false,
    user:null,
    pets:[],
    loading:false,
    isCalling:false
}
const userReducer = (state=intitalState,action)=>{
    switch(action.type){
        case USER_LOGIN:{
            return state={...state,isAuthentication:true,user:action.payload}
        }
        case USER_LOGOUT:{
            return state={
                isAuthentication:false,
                user:null,
                pets:[]
            }
        }
        case USER_LOAD:{
            return state={
                ...state,
                isAuthentication:true,
                user:action.payload,
            }
        }
        case USER_ERROR:{return state={isAuthentication:false,user:null}}
        case SHOW_LOADING:{
            return state={
                ...state,loading:true
            }
        }
        case HIDE_LOADING:{
            return state={
                ...state,loading:false
            }
        }
        case LOAD_PETS:{
            return state={
                ...state,pets:action.payload
            }
        }
        case ADD_PET:{
            const newPets = state.pets;
            newPets.push(action.payload)
            return state={
                ...state,pets:newPets
            }
        }
        case ACCEPT_CALLING:{
            return state = {...state,isCalling:false}
        }
        case REFUSE_CALLING :{
            return state = {...state,isCalling:false}
        }
        case WAIT_CALLING :{
            return state ={...state,isCalling:true}
        }
        default:return state
    }
}
export default userReducer;