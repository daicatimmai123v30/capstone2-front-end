
import { ACTIVE_USER, CLOSE_CHAT, OPEN_CHAT, ACTIVE_ROOM,LOAD_MESSAGE, ADD_MESSAGE, CLEAR_MESSAGES,CLEAR_SESSION_MESSAGES} from "../actions/types";

const intitalState ={
    activeUser:null,
    activeRoom:null,
    user:null,
    messages:[],
    activeRoomMessages:[],
    visibleChat:false,
}
const chatReducer =(state=intitalState,action)=>{
    switch(action.type){
        case OPEN_CHAT: return state={...state,visibleChat:true,user:action.payload};
        case CLOSE_CHAT:return state={
            ...state,
            activeRoom:null,
            user:null,
            messages:[],
            activeRoomMessages:[],
            visibleChat:false,
        };
        case ACTIVE_USER:return state ={...state,activeUser:action.payload};
        case ACTIVE_ROOM:return state={...state,activeRoom:action.payload};
        case LOAD_MESSAGE: return state ={...state,messages:action.payload};
        case ADD_MESSAGE: return state ={...state,messages:[...state.messages,action.payload]}
        case CLEAR_MESSAGES :return state={...state,messages:[]}
        case CLEAR_SESSION_MESSAGES :return state={
            activeUser:null,
            activeRoom:null,
            user:null,
            messages:[],
            activeRoomMessages:[],
            visibleChat:false,}
        default:return state
    }

}
export default chatReducer;