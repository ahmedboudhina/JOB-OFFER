import {GET_JOBS,GET_JOBS_SUCCESS,GET_JOBS_FAIL,LOGIN_SUCCESS,LOGIN_FAIL} from "../constants"
import axios from 'axios'
import { returnErrors, clearErrors } from "./errorActions";

/*------------------------------------------- GETTING ALL DOCTOR LIST ------------------------------------*/

export const getJobs = ()=>async dispatch=>{
dispatch({
    type : GET_JOBS
})
try {
    const Jobs = await  axios.get('http://localhost:5000/entrepreneur')
    dispatch({
        type : GET_JOBS_SUCCESS,
        payload : Jobs.data
    })

} catch (error) {
    dispatch({
        type : GET_JOBS_FAIL
    })
}
}

/*----------------------------------------- LOGiN A ENTREPRENEUR USER ------------------------------------*/

export const loginEntrepreneur = ({ email, password }) => async (dispatch) => {
    try {
      const loginUser = await axios.post("http://localhost:5000/entrepreneur/login_entrepreneur", {
        email,
        password,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: loginUser.data,
        userType : "Entrepreneur"
      });
      dispatch(clearErrors());
    } catch (err) {
      dispatch(
        returnErrors({
          msg: err.response.data,
          status: err.response.status,
          id: "LOGIN_FAIL",
        })
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };