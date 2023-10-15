import React from 'react'
import './style.css'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


const Registration = () => {
  
  const initialValues = {
    username:"",
    password:"",
  }
  
  const validationSchema = Yup.object().shape({
      username: Yup.string().min(3).max(15,'most have 15').required(),
      password: Yup.string().min(4).max(20).required(),
  });

    const onSubmit = (data) => {
    Axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log("Success");
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
           
           
  
             <label>User Name: &nbsp;</label>
            <ErrorMessage name='username' component={'span'} />
            <Field id="inputusername" name='username' placeholder='User Name'  />


             <label>Password: &nbsp;</label>
            <ErrorMessage name='password' component={'span'} />
            <Field id="inputpassword" name='password' placeholder='Password' type='password' />

            <button className='btn btn-primary  ms-3' type='submit'>Register</button>


        </Form>
    </Formik>

    </div>
  )
}

export default Registration