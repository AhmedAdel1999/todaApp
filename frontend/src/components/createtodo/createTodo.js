import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Message from "../utils/message";
import { createTodo, updataTodo } from "../../features/todos/todoSlice"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useDispatch,useSelector } from "react-redux"
import { GetConfig } from "../utils/userData";
import "./createtodo.css"
import ErrorMsg from "../utils/errorMsg";

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + '-' + month + '-' + day;
  }
const CreateTodoItem = () =>{
    const config = GetConfig()
    const [todo,setTodo]=useState({
        label:'Personal',
        title:"",
        discription:"",
        date:new Date(),
        complete:false,
        archive:false
    })
    const[open,setOpen] = useState(false)
    const[Edit,setEdit] = useState(false)
    const[error,setError]=useState(null)
    const dispatch = useDispatch();
    const {id} = useParams()
    const todos = useSelector((state)=>state.todo.todos)
    const currentTodo = id && todos.filter((ele)=>ele._id===id)[0]

    useEffect(()=>{
      if(id){
          setTodo({...currentTodo})
          setEdit(true)
      }
    },[id])
     const handelChange = (e) =>{
        const{name,value}=e.target
        setTodo({...todo,[name]:value})
     }
     const handleClose = () => {
        setOpen(false)
      };
     const handelSubmit = async (e) =>{
        e.preventDefault();
        try {
            if(Edit){
                await dispatch(updataTodo({todo,config}))
                setOpen(!open)
            }
            else{
                if(todo.discription==="" || todo.title===""){
                    setError("You have to fill all parameters first")
                }else{
                    await dispatch(createTodo({todo,config}))
                    setTodo({...todo,discription:"",title:""})
                    setError(null)
                    setOpen(!open)
                }
            }
        } catch (error) {
            setError(error)
        }
     }
    return(
        <div className="create-todos">
            <div className="create-box">
                {
                    error&&<ErrorMsg msg={error} />
                }
                <form onSubmit={handelSubmit}>
                    <div>
                        <label>Label</label>
                        <select onChange={handelChange} name="label" value={todo.label}>
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>
                    <div>
                        <label>Title</label>
                        <input type="text" placeholder="Title" name="title" value={todo.title} onChange={handelChange} />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea placeholder="Task Description" name="discription" value={todo.discription} onChange={handelChange} />
                    </div>
                    <div>
                    <label>task compeletion data</label>
                        <input type="date" name="date" value={getFormattedDate(new Date(todo.date))} onChange={handelChange} />
                    </div>
                    <div><button type="submit">{Edit?"Update Todo":"Create Todo"}</button></div>
                </form>
                <button><Link to={'/'}><KeyboardBackspaceIcon /></Link></button>
                
            </div>
            <div>
            {open?(
                <Message open={open} handleClose = {handleClose} />
            ):(null)}
            </div>
        </div>
    )
}
export default CreateTodoItem;
