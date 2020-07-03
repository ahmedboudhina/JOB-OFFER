import {GET_JOBS,GET_JOBS_SUCCESS,GET_JOBS_FAIL} from "../constants"
const initialeState = {
    JobsList :[],
    isLoading:false
}

const jobsReducer=(state=initialeState,action)=>{
    switch(action.type){
        case GET_JOBS:
            return {...state,isLoading : true}
        case GET_JOBS_SUCCESS:
            return {...state,isLoading:false,JobsList:action.payload}
        case GET_JOBS_FAIL:
            return{...state,isLoading:false}
        default:
            return state
    }
}
export default jobsReducer