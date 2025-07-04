import React, { useState, useRef, useEffect } from 'react'
import ProfileInfo from './Cards/profileInfo'
import SearchBar from './SearchBar/SearchBar'

const Navbar = ({loggedIn = false, docs, setDocs, user, darkMode}) => {
  let mainDocsBeforeSearch = useRef()  // it will store the docs and won't change on render
  const [searchQuery, setSearchQuery] = useState("");
  const [newDocs, setNewDocs] = useState([]) // will store the new docs after the search

  useEffect(()=>{ // this will reset the value on re-renders for pin or delete etc
    if(docs != newDocs){
      setSearchQuery('')
    }
    if(docs?.length > newDocs.length){
      mainDocsBeforeSearch.current = docs 
    }
  }, [docs])
  

  const handleSearch = (value) => { // value prop means the search bar value
    // console.log('helo')
    // console.log(docs) 

    // mainDocsBeforeSearch.current = docs 

    let searchedDocs = docs.filter((arrVal, index)=>{ // this is the value of array
      return arrVal.title.toLowerCase().includes(value.toLowerCase())
    })
    
    // console.log(mainDocsBeforeSearch.current)

    // console.log(searchedDocs)
    setNewDocs(searchedDocs)
    setDocs(searchedDocs)
  }

  const forLoggedIn = [<SearchBar key={1} value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}  handleSearch={handleSearch} clearQuerry={()=>{setSearchQuery(''); setDocs(mainDocsBeforeSearch.current)}} darkMode={darkMode} />,
                      <ProfileInfo key={2} user={user} darkMode={darkMode} />]
  
  if(!loggedIn){
    return (
      <div className='flex justify-center items-center'>
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow w-full max-w-[2000px]">
          <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className={`${darkMode && 'bg-black'} flex justify-center items-center min-w-full max-w-full fixed top-0`}>
        <div className={`${darkMode ? 'bg-black text-white' : 'bg-white'} flex items-center justify-between px-4 sm:py-2 max-sm:py-1 drop-shadow w-full max-w-[1900px] sm:gap-4 max-sm:gap-2`}>
          <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-xl font-medium sm:py-2 max-sm:py-1`}>Notes</h2>

          {forLoggedIn}

        </div>
      </div>
    )
  }

}

export default Navbar