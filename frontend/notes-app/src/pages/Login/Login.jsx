import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Password from '../../components/Inputs/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  document.querySelector('body').classList.remove('bg-gray-900')  // it will finish the dark mode

  const handleLogin = async(e) => {
    e.preventDefault()
    if(!validateEmail(email)){
      setError("Please enter a valid email addressl");
      return;
    }

    if(!password){
      setError("Please enter the password.");
      return;
    }

    setError("")

    // login api call
    const options = {
      'method': "POST",
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'email': email.toLowerCase().trim(),
        'password': password
      })
    }

    const fetchLink = import.meta.env.VITE_LOGIN_API + '/login'
    let loggingIn = await fetch(fetchLink, options)
    let response = await loggingIn.json()

    // console.log(response.userName.toLowerCase())

    if(response.authentication){
      // console.log('helo')
      navigate(`/dashboard/${response.userName.toLowerCase()}`)
    }
    else{
      setError("Your email or password is invalid.")
    }
    // console.log(email)

  }

  return (
    <>
      <div className='h-screen overflow-hidden'>
        
        <Navbar />

        <div className='h-[100vh] flex justify-center items-center'>
          <div className='mb-16 border border-gray-300 rounded-lg p-8 max-sm:px-4'>
            <form onSubmit={handleLogin}>
              
              <h2 className='text-2xl font-medium text-black'>Login</h2>
              <div className='email mt-4 p-3 w-[320px] border rounded-md'>
                <input type="text" className='email w-[90%] bg-blue-50 rounded-sm outline-none' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <Password value={password} onChange={(e)=>setPassword(e.target.value)} />

              <p className='text-xs mt-2 text-red-500'>{error}</p>

              <button type='submit' className='submit mt-3 p-1 w-[320px] border rounded-md bg-blue-700 text-white'>Log in</button>
              
              <div className="signUpOption flex justify-center gap-1 mt-1">
                <p className="text-xs font-semibold">Not registered yet? </p>
                <Link to="/signUp" className='text-xs font-semibold text-blue-600 underline'>Create an Account</Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}


export default Login