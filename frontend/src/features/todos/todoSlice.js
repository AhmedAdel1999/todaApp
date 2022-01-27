import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


//creating todos
export const createTodo =createAsyncThunk(
  "todo/createTodo",
  async(obj,{rejectWithValue})=>{
    const{todo,config}=obj
   let data = axios.post("http://localhost:5001/api/create",todo,{...config}).then((res)=>{
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
)
//updating todos
export const updataTodo =createAsyncThunk(
  "todo/updatetodo",
  async(obj)=>{
    const{todo,config}=obj
   let data = axios.post(`http://localhost:5001/api/${todo._id}`,todo,{...config}).then((res)=>{
     console.log(res.data)
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
) 
//deleting todos
export const deleteTodo =createAsyncThunk(
  "todo/deleteTodo",
  async(obj)=>{
    const{id,config}=obj
   let data = axios.delete(`http://localhost:5001/api/${id}`,{...config}).then((res)=>{
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
)
//getting todos
export const catchTodo =createAsyncThunk(
  "todo/catchTodo",
  async(config)=>{
   let data = axios.get(`http://localhost:5001/api/get`,{...config}).then((res)=>{
     console.log(res.data)
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
)
const initialState = {
  todos: [],
  status: 'idle',
};
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    logoutTodo:((state)=>{
      state.todos=[]
    })
  },
  extraReducers:{
    [createTodo.fulfilled]:((state,action)=>{
       state.todos.push(action.payload)
       console.log(action.error)
    }),
    [catchTodo.fulfilled]:((state,action)=>{
       state.todos=[...action.payload]
    }),
    [updataTodo.fulfilled]:((state,action)=>{
       state.todos=[...action.payload]
    }),
    [deleteTodo.fulfilled]:((state,action)=>{
       state.todos=[...action.payload]
    }),
  }
});
export const {logoutTodo} = todoSlice.actions
export default todoSlice.reducer;
