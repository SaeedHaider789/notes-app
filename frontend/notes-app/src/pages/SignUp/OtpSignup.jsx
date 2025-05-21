import React from 'react'
import { IoMdClose } from "react-icons/io";
import { MdOutlineDomainVerification } from "react-icons/md";

const Otp = ({otpBox ,setOtpBox}) => {
  // console.log(setOtpBox)
  
  return (
    
    <div className='w-[40%] max-sm:w-[100%] max-h-3/4 bg-white p-1 rounded-md m-1'>
      <div className="flex justify-end">
        <IoMdClose className='text-xl cursor-pointer' onClick={() => setOtpBox(false)} />
      </div>

      <div className='flex justify-center items-center gap-1'>
        <MdOutlineDomainVerification className='text-6xl'/>
        <p>OTP Verification</p>
      </div>

      <div className="flex justify-center items-center">
        <h1>OPT has been sent to your email</h1>
      </div>

      <div className='flex justify-center mt-5'>
        <div className="border-2">
          <input type="number" placeholder='Enter OTP' className='outline-none' />
        </div>
      </div>

      <div className='flex justify-center'>
        <button className='bg-blue-600 hover:bg-blue-800 text-white font-medium mt-5 p-1 w-full rounded-md'>Submit</button>
      </div>
      
    </div>)
    
}

export default Otp