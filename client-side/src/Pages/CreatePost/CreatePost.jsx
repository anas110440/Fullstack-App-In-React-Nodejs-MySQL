import React,{useEffect , useContext} from 'react'
import './style.css'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext';

const CreatePost = () => {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
useEffect(()=>{
 if(!localStorage.getItem("accessToken")){
      navigate('/login');
    }
},[]);

const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
});

const initialValues = {
    title:"",
    postText:"",
}

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/posts", data,
    {headers:{accessToken: localStorage.getItem("accessToken")}}
    ).then((response) => {
      navigate("/")
      
    });
  };

  return (
    <div className='CreatePostPage'>

    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
           
           
            <label>Title: &nbsp;</label>
            <ErrorMessage name='title'  component={'span'}/>
            <Field id="inputCreatePost" name='title' placeholder='Title'  />
            
             <label>Post: &nbsp;</label>
            <ErrorMessage name='postText' component={'span'} />
            <Field id="inputCreatePost" name='postText' placeholder='Post'  />

           

            <button className='btn btn-primary  ms-3' type='submit'>Create Post</button>


        </Form>
    </Formik>
    </div>
  )
}

export default CreatePost