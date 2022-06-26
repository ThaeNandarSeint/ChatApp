import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import {loginRoute} from '../../utils/APIRoutes'

// css
import './Login.css'

export const Login = () => {
    const [isShow, setIsShow] = useState(false)
    const handleShow = (e)=>{        
        setIsShow(!isShow)
    }
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    // validation
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }
    const handleValidation = () => {
        const { email, password } = values;
        
        if (email === '') {
            toast.error('Email is required!', toastOptions);
            return false;
        }
        if (password === '') {
            toast.error('Password is required!', toastOptions);
            return false;
        }   

        return true;
    }
    // send data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const {email, password} = values;
            try{                
                const {data} = await axios.post(loginRoute, {
                    email,
                    password
                })
                if(data.status === true){
                    toast.error(data.msg, toastOptions)
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                    navigate('/')
                }           
            }catch(err){
                if(err.response.data.status === false){
                    toast.error(err.response.data.msg, toastOptions)
                }
            }            
        }
    }

  return (
    <>
        <div className="wrapper">
            <div className="title"><span>Login Form</span></div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <i className="fas fa-user row-i"></i>
                    <input type="email" name='email' placeholder="Email" onChange={handleChange} />
                </div>
                <div className="row">
                    <i className="fas fa-lock row-i"></i>
                    <input type={isShow ? "text" : "password"} name='password' placeholder="Password" onChange={handleChange} />
                    <div className='row-eye' onClick={handleShow}>
                        {
                            isShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                        }
                    </div>                    
                </div>
                <div className="pass"><a href="#">Forgot Password?</a></div>
                <div className="row btn">
                    <button className='login-btn' type="submit" >Login</button>         
                </div>
                <div className="signup-link">Need an account? <Link to='/register'>SIGN UP</Link></div>
            </form>
        </div>
        <ToastContainer />
    </>
  )
}
