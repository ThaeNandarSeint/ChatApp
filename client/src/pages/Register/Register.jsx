import React, { useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import {registerRoute} from '../../utils/APIRoutes'

// css
import './Register.css'

export const Register = () => {
    const [isShow, setIsShow] = useState(false)
    const handleShow = ()=>{        
        setIsShow(!isShow)
    }

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: ''
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
        const { name, email, password, cPassword } = values;
        if (password !== cPassword) {
            toast.error('Password and Confirm Password do not match!', toastOptions);
            return false;
        }
        if (name === '') {
            toast.error('Username is required!', toastOptions);
            return false;
        }
        if (email === '') {
            toast.error('Email is required!', toastOptions);
            return false;
        }
        if (password === '') {
            toast.error('Password is required!', toastOptions);
            return false;
        }
        if (cPassword === '') {
            toast.error('Confirm Password is required!', toastOptions);
            return false;
        }
        if (name.length < 3) {
            toast.error('Username should be greater than 3 characters!', toastOptions);
            return false;
        }
        if (password.length < 5) {
            toast.error('Password should be greater than 5 characters!', toastOptions);
            return false;
        }
        if (email === password) {
            toast.error('Email and Password should not be equal', toastOptions);
            return false;
        }
        return true;
    }
    // send data
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(handleValidation()){
          const {name, email, password} = values;
          try{
            const {data} = await axios.post(registerRoute , {
                name,
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
            <div className='wrapper'>
                <div className="title"><span>Register Form</span></div>
                <form onSubmit={handleSubmit} >
                    <div className="row">
                        <i className="fas fa-user row-i"></i>
                        <input className='register-input' type="text" name='name' placeholder="Username" onChange={handleChange} />
                    </div>
                    <div className="row">
                        <i class="fa-solid fa-envelope row-i"></i>
                        <input className='register-input' type="email" name='email' placeholder="Email" onChange={handleChange} />
                    </div>
                    <div className="row">
                        <i className="fas fa-lock row-i"></i>
                        <input className='register-input' type={isShow ? "text" : "password"} name='password' placeholder="Password" onChange={handleChange} />
                        <div className='row-eye' onClick={handleShow}>
                            {
                                isShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                            }
                        </div>                        
                    </div>                    
                    <div className="row">
                        <i class="fa-solid fa-key row-i"></i>
                        <input className='register-input' type={isShow ? "text" : "password"} name='cPassword' placeholder="Confirm Password" onChange={handleChange} />
                        <div className='row-eye' onClick={handleShow}>
                            {
                                isShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                            }
                        </div>
                    </div>
                    <div className="row btn">
                        <button className='register-btn' type="submit" >Create User</button>
                    </div>
                    <div className="signup-link">Already a user? <Link to='/login'>LOGIN</Link></div>
                </form>
            </div>
            <ToastContainer />         
        </>
    )
}