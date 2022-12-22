import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../App.css'
import { Navigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    ticketNo: Yup.number()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const RegisterUser = (props) => {
  const [isThere, setIsThere] = useState('')

return(
  <div className='register'>
    <h1>{props.editForm ? "Edit users" : " Register for Lottory"}</h1>
    <Formik
      initialValues={ props.editForm ? props.userDetail : {
        name: '',
        ticketNo: null,
      }}
      validationSchema={SignupSchema}

      onSubmit={values => {   
        console.log(values)
          const requestOptions = {
            method: props.editForm ? "PUT" : "POST",
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(values)            
        }

       fetch('http://localhost:3000/register', requestOptions)
       .then(res => res.json())
       .then(data => setIsThere(data.msg))
      }}
      
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" placeholder="Enter the name" />
          {errors.name && touched.name ? (
            <div>{errors.name}</div>
          ) : null} <br/> <br/>
          <Field name="ticketNo" placeholder="Enter the tiketnumber"/>
          {errors.ticketNo && touched.ticketNo ? (
            <div>{errors.ticketNo}</div>
          ) : null} <br/> <br/>
          <button type="submit">Register</button>

          <h5>{isThere}</h5>

        </Form>
      )}
    </Formik>
  </div>
)};

export default RegisterUser;