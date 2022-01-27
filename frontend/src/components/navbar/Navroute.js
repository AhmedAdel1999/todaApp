import React, {useState} from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logoutTodo } from "../../features/todos/userSlice";
import {Home,Clear,ViewWeekSharp,AccountCircle,Add} from '@material-ui/icons';
import { useMediaQuery } from "react-responsive";
import "./navebar.css"
import { GetUsername } from "../utils/userData";
const Navbar = () =>{
    const token = useSelector((state)=>state.user.token)
    const username = GetUsername()
    const isShowToggle = useMediaQuery({maxWidth:992})
    const[toggle,setToggle]=useState(false)

    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(logoutTodo())
        window.location.href="/"
    }

    let style={
        overflow:toggle?"visible":"hidden",
        height:isShowToggle===false?"auto":toggle===true?token?"120px":"80px":"0px"
    }
    
    return(
        <div className="navbar-section" >
           <div className="logo">
                <Link to="/">
                    <Home />
                    TODO
                </Link>
           </div>
           {
               isShowToggle&&
               <div className="toggel" onClick={()=>setToggle(!toggle)}>
                   {
                       toggle?
                       <Clear />
                       :
                       <ViewWeekSharp />
                   }
               </div>
           }
           <ul className="links" style={{...style}}>
               {
                   token?
                   <React.Fragment>
                       <li>
                            <Link to="/" className="account">
                                <AccountCircle/>{username}
                            </Link>
                       </li>
                       <li>
                            <Link to="/" onClick={logout}>
                                Logout
                            </Link> 
                       </li>
                       <li>
                            <Link to="/create" className="add">
                                <Add />
                            </Link>
                       </li>
                   </React.Fragment>
                   :
                   <React.Fragment>
                       <li>
                            <Link to="/login">
                                Login
                            </Link>
                       </li>
                       <li>
                            <Link to="/register">
                                Register
                            </Link>
                       </li>
                   </React.Fragment>
               }
           </ul>
        </div>
    )
}
export default Navbar;