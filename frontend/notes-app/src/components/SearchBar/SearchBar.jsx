import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoCloseSharp } from "react-icons/io5";

const SearchBar = ({value, onChange, onClick, handleSearch, clearQuerry, darkMode}) => {

  let closeIcon = (value ? <IoCloseSharp className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} text-slate-500 text-xl`} onClick={clearQuerry}/> : null);
  return (
    <div>
      <div className= {`${darkMode ? 'bg-slate-800' : 'bg-slate-100'} max-xl:sm:w-[50vw] xl:w-[800px] h-[40px] flex items-center justify-between`}>
          <input type="text" value={value} onChange={onChange} onClick={onClick} className={`${darkMode && 'placeholder:text-slate-500'} outline-none sm:ml-4 max-sm:ml-1 w-[83%]`} placeholder='Search Notes'/>

          {closeIcon}

          <IoSearch className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} text-slate-500  mr-3 text-xl`} onClick={()=>handleSearch(value)}/>

      </div>
    </div>
  )
}

export default SearchBar