import React, {useState} from "react";

import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const Password = ({value, onChange, placeholder}) =>{
    const [isShowPassword, setIsShowPassword] = useState(false)
    const toggleShowPassword = () =>{
        setIsShowPassword(!isShowPassword);
    }

    return(
        <div className='password mt-4 p-3 w-[320px] border rounded-md flex justify-between'>
            <input value={value} onChange={onChange} type={isShowPassword ? "text": "password"} className='w-[90%] bg-blue-50 rounded-sm outline-none' placeholder={placeholder || "Password"}/>

            <FaRegEye
                size={22}
                className="text-blue-500 cursor-pointer"
                onClick={()=>toggleShowPassword()}
            />
        </div>
    )
}

export default Password