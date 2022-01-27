import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  token:null,
  username:null,
  isSuccess:false,
  isError:false,
  errMessage:"",
  status: 'idle',
};

export const registerTodo =createAsyncThunk(
  "user/registerTodo",
  async(obj,{ rejectWithValue,fulfillWithValue })=>{
    try{
      const response = await axios.post("http://localhost:5001/register",{...obj})
      const data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        return rejectWithValue(error.response.data)
    }
  }
)

export const loginTodo =createAsyncThunk(
  "user/loginTodo",
  async(obj,{ rejectWithValue,fulfillWithValue })=>{
    try{
      const response = await axios.post("http://localhost:5001/login",{...obj})
      const data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        return rejectWithValue(error.response.data)
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutTodo:((state)=>{
      state.token=null;
      state.username=null
    }),
    cleanState:((state)=>{
      state.isSuccess=false;
      state.isError=false;
      state.errMessage="";
    })
  },
  extraReducers:{
    [registerTodo.rejected]:((state,action)=>{
      state.isSuccess=false
      state.isError=true
      state.errMessage=action.payload.error.message
    }),

    [loginTodo.fulfilled]:((state,action)=>{
      console.log(action.payload)
      state.isSuccess=true
      state.isError=false
      state.token=action.payload.token
      state.username=action.payload.userName
    }),
    [loginTodo.rejected]:((state,action)=>{
      state.isSuccess=false
      state.isError=true
      state.errMessage=action.payload.error.message
    }),
  }
});
export const{logoutTodo,cleanState}=userSlice.actions
export default userSlice.reducer;
