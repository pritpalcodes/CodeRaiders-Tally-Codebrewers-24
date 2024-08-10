/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import auth from '../firebase.init'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    // const [errorMessage, setError] = useState('')

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const navigate = useNavigate();

    if(user || googleUser) {
        navigate('/')
        // console.log(user)
        // console.log(googleUser)
    }

    if(error) {
        console.log(error.message)
    }

    if(loading) {
        // console.log('loading ...')
    }  


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email, password)
        createUserWithEmailAndPassword(email, password)

        const user = {
            username: username,
            name: name,
            email: email,
        }

        axios.post("http://localhost:5000/register", user);
        // the same code which we would have to do in multiple lines by defined headers, body etc is done by axios in one line
    }


    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

  return (
    <div className='h-screen w-screen bg-[#0f0e0e] flex flex-col overflow-x-hidden'>
        <div className='h-[85vh] w-screen flex justify-around items-start mt-5'>
            {/* RIGHT SIDE */}
            <div className='mr-[5vw] w-[32%]'>
                <div className='flex flex-col p-[50px] item-center bg-[#1b1b1b] rounded-[30px] mb-10'>
                    <div className="justify-start items-inherit row-auto ">
                        <h2 className='text-[#D9D9D9] text-[24px]' style={{fontFamily: "Gilroy"}}>Sign Up</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col justify-between gap-5'>
                            <input type="text" className="w-full p-3 rounded-[5px] bg-[#D9D9D9] placeholder:text-gray-500" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                            <input type="text" className="w-full p-3 rounded-[5px] bg-[#D9D9D9] placeholder:text-gray-500" placeholder='Enter Full Name' onChange={(e) => setName(e.target.value)}/>
                            <input required type="email" className="w-full p-3 rounded-[5px] bg-[#D9D9D9] placeholder:text-gray-500" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
                            <input required type="password" className="w-full mt-0 p-3 rounded-[5px] bg-[#D9D9D9] placeholder:text-gray-500" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                            <button type='submit' className="w-full p-3 mb-[15px] rounded-[5px] bg-[#4285F4] text-white">Sign Up</button>
                        </form>
                    </div>
                    {/* <hr /> */}
                    {/* <Divider className='flex items-center w-2/3 text-[24px] text-[#D9D9D9]' sx={{ "&::before, &::after": { borderColor: "secondary.light", }, }}>or</Divider> */}
                    <div className="w-full relative flex py-3 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-[20px]">or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className='w-full mt-3'>
                        {/* <GoogleButton classroom='g-btn' type="light" onClick={handleGoogleSignIn}/> */}
                        <div className="px-6 sm:px-0 max-w-sm ">
                            <button onClick={handleGoogleSignIn} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign Up with Google<div></div></button>
                        </div>
                    </div>
                    <div className='flex mt-5 '>
                        <span className='text-[#D9D9D9]' style={{fontFamily: "Gilroy"}}>already have an account?</span>
                        <Link to='/login' className='' style={{ textDecoration:'none', color: 'skyblue', fontWeight: '600', marginLeft: '5px' }} > Sign in </Link>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Signup