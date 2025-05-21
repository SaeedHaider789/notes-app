import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import Password from '../../components/Inputs/PasswordInput'
import { Link } from 'react-router'
import { validateEmail } from '../../utils/helper'
import {emailRegistered} from '../../utils/helper'
import { useNavigate } from 'react-router'
import {saveSignUpData} from '../../utils/helper'

const SignUp = () => {

  let navigate = useNavigate()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [otpBox, setOtpBox] = useState(false)

  const handleSignUp = async(e) =>{
    e.preventDefault()

    if(!name){
      setError("Please enter your name.");
      return;
    }

    if(!validateEmail(email)){
          setError("Please enter a valid email address.");
          return;
    }

    if(!password){
      setError("Please enter the password.");
      return;
    }

    setError('')

    //SignUp Api call
    

    let emailValue = await emailRegistered(email, name)  // will verify that the email is registered before or not
    // console.log('user registered: ', emailValue.userRegistered)

    if(emailValue.emailRegistered && emailValue.userRegistered){
      setError("Your user name is registered.")
    }
    else if(emailValue.emailRegistered){
      setError("Your email is registered before.")
    }
    else{
      setError("")
      // api call to save all the data
      let response = await saveSignUpData(name.toLowerCase(), email, password);
      // console.log('helo')
      navigate('/login')
    }


  }

  return (
    <>
      <div className='h-screen overflow-hidden'>
        
        <Navbar />

        <div className='h-[100vh] flex justify-center items-center'>
          <div className='mb-16 border border-gray-300 rounded-lg p-8'>
            <form onSubmit={handleSignUp}>
              
              <h2 className='text-2xl font-medium text-black'>Sign Up</h2>

              <div id='uname' className='uname mt-4 p-3 w-[320px] border rounded-md'>
                <input type="text" className='uname w-[90%] bg-blue-50 rounded-sm outline-none' placeholder='User Name' value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>

              <div className='email mt-4 p-3 w-[320px] border rounded-md'>
                <input type="text" className='email w-[90%] bg-blue-50 rounded-sm outline-none' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <Password value={password} onChange={(e)=>setPassword(e.target.value)} />

              <p className='text-xs mt-2 text-red-500'>{error}</p>

              <button type='submit' className='submit mt-3 p-1 w-[320px] border rounded-md bg-blue-700 text-white'>Create Account</button>
            
              <div className="logInOption flex justify-center gap-1 mt-1">
                <p className="text-xs font-semibold">Already have an account? </p>
                <Link to="/login" className='text-xs font-semibold text-blue-600 underline'>Login</Link>
              </div>

            </form>
          </div>
        </div>  
      </div>
    </>  
  )
}

export default SignUp