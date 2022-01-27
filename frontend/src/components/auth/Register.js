import React,{useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field , ErrorMessage } from 'formik';
import LockIcon from '@material-ui/icons/Lock';
import * as Yup from "yup"
import { registerTodo,cleanState } from "../../features/todos/userSlice";
import ErrorMsg from "../utils/errorMsg";
import "./auth.css"

const Register = () => {

  const {isSuccess,isError,errMessage} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const onSubmit = async(values)=>{
    await dispatch(registerTodo(values))
  }

  useEffect(() => {
      dispatch(cleanState());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(cleanState());
      window.location.href="/";
    }
  }, [isSuccess, isError]);
  
  const schema = () =>{
    const schema = Yup.object().shape({
      userName:Yup.string().min(2, 'Too Short!').required("required"),
      password:Yup.string().min(6, 'Too Short!').required("required"),
    })
    return schema
  }
  return (
    <div className="auth">
        <div className="auth-content">
          <div className="auth-header">
            <span><LockIcon /></span>
            <span>Register</span>
          </div>
          {
            isError&&
            <ErrorMsg msg={errMessage} />
          }
          <Formik 
            initialValues={{
            userName:"",
            password:"",
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            <Form>
              <div>
                <Field type="text" name="userName" placeholder="Username*" />
                <ErrorMessage name="userName" component="span" />
              </div>

              <div>
                <Field type="password" name="password" placeholder="Password*" />
                <ErrorMessage name="password" component="span" />
              </div>

              <button type="submit">Register</button>
            </Form>
          </Formik>
        </div>
    </div>
  );
}

export default Register;
