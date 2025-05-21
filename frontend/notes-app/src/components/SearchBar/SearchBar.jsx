import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoCloseSharp } from "react-icons/io5";

const SearchBar = ({value, onChange, handleSearch, clearQuerry}) => {

  let closeIcon = (value ? <IoCloseSharp className='text-slate-500 hover:text-black text-xl' onClick={clearQuerry}/> : null);
  return (
    <div>
      <div className='bg-slate-100 max-xl:sm:w-[50vw] xl:w-[800px] h-[40px] flex items-center justify-between'>
          <input type="text" value={value} onChange={onChange} className='outline-none sm:ml-4 max-sm:ml-1 w-[83%]' placeholder='Search Notes'/>

          {closeIcon}

          <IoSearch className='text-slate-500 hover:text-black mr-3 text-xl' onClick={()=>handleSearch(value)}/>

      </div>
    </div>
  )
}

export default SearchBar