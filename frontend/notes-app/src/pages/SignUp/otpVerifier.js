import {saveSignUpData} from '../../utils/helper'

export let getOTP = async(setOtpCheckBox, email) =>{
    console.log('TIME FOR OTP VERIFICATION')
    setOtpCheckBox(true)

    // console.log(email)

    let fetchOTP = await fetch(`${import.meta.env.VITE_LOGIN_API}/signup/otp/${email}`)
    let OTP = await fetchOTP.text()

    // console.log(OTP)
    return OTP
}

let signUP = async(name, email, password) =>{
    // api call to save all the data
    let response = await saveSignUpData(name.toLowerCase(), email.toLowerCase().trim(), password);
    // console.log('helo')
    window.location.replace('/login');

}

export let verifyOTP = async(otp, mainOtp, name, email, password)=>{
    // console.log(otp, mainOtp)
    if(otp == mainOtp){
        console.log('CORRECT OTP')
        signUP(name, email, password)
    }
    else{
        let errHolder = document.querySelector('.signUperr')
        errHolder.innerHTML = 'Wrong OTP'
    }

}