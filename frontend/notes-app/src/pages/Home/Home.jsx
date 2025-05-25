import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import { useParams } from 'react-router';
import { fetchDataOfUserName } from '../../utils/helper';
import { notesDelete } from '../../utils/helper';
import { pinNoteHandler } from '../../utils/helper';
import { LuSunMedium } from "react-icons/lu";
import { MdOutlineModeNight } from "react-icons/md";

const Home = () => {

  const [docs, setDocs] = useState([]);
  const [renderArr, setRenderArr] = useState([]) // will render not pinned arr
  const [renderPinnedArr, setRenderPinnedArr] = useState([]) // will render pinned arr
  const { userName } = useParams(); // ✅ Move useParams() outside useEffect
  let lowerCaseUserName = userName.toLowerCase()
  const [darkMode, setDarkMode] = useState(false) // it will turn on the dark mode

  
  const [openEditNotes, setOpenEditNotes] = useState({
    isShown: false,
    type: "add",
    data: {  // empty for add,  data and id are for edit
      title: '',
      content: ''
    }, 
    id: "" //empty string for edit
  })

  useEffect(() => { // it will fetch the user's notes
    const fetchingNotes = async () => {
      try {
        let documents = await fetchDataOfUserName(lowerCaseUserName);
        setDocs(documents || []); // ✅ Ensure it's always an array
        // console.log("Fetched documents:", documents); // ✅ Log inside the async function
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (lowerCaseUserName) fetchingNotes(); // ✅ Fetch only if userName exists

  }, [lowerCaseUserName]); // ✅ Add userName as a dependency

  // console.log("Current docs state:", docs); // ❌ Won't log the latest value immediately

  useEffect(() => { // it will arrange the notes into jsx components
    let arr = docs.filter(obj=>!obj.isPinned).map((obj) => { // will render not pinned arr
        return <NoteCard key={obj._id} userName={lowerCaseUserName} id={obj._id} title={obj.title} date={obj.date} content={obj.content} isPinned={obj.isPinned} onEdit={()=>{}} onDelete={notesDelete} onPinNote={pinNoteHandler} setDocs={setDocs} setOpenEditNotes={setOpenEditNotes} darkMode={darkMode} index={docs.indexOf(obj)} />
    });
    setRenderArr(arr); // ✅ Runs only when `docs` changes

    arr = docs.filter(obj=>obj.isPinned).map((obj) => { // will render pinned arr
      return <NoteCard key={obj._id} userName={lowerCaseUserName} id={obj._id} title={obj.title} date={obj.date} content={obj.content} isPinned={obj.isPinned} onEdit={()=>{}} onDelete={notesDelete} onPinNote={pinNoteHandler} setDocs={setDocs} setOpenEditNotes={setOpenEditNotes} darkMode={darkMode} index={docs.indexOf(obj)} />
    });
    setRenderPinnedArr(arr)

  }, [docs, darkMode]); // ✅ Effect runs only when `docs` updates
  
  // console.log('arr', renderArr)

  useEffect(()=>{ //this will turn the main body black on darkMode
    if(darkMode){
      document.querySelector('body').classList.add('bg-gray-900')
    }
    else{
      document.querySelector('body').classList.remove('bg-gray-900')
    }
  }, [darkMode])

  return (
    <>
      <Navbar loggedIn={true} docs={docs} setDocs={setDocs} user={userName} darkMode={darkMode} />

      <div className={`${darkMode && 'bg-gray-900'} container mx-auto`}>
        <div className="grid query1 md:grid-cols-3 max-md:grid-cols-2 gap-2 mt-20 max-sm:mb-20 mb-3">
          {/* <NoteCard 
           id={22}
           title={(docs[0]?.title ? docs[0].title : 'loading')}
           date={"27th Aprill 2024"}
           content={'Meeting on 7th April Meeting on 7th April'}
           isPinned={true}
           onEdit={()=>{}}
           onDelete={()=>{}}
           onPinNote={()=>{}}/> */}

           {renderPinnedArr ? renderPinnedArr : "loading"}
           {renderArr ? renderArr : "loading"}
            
        </div>
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-800 fixed right-10 max-sm:right-4 bottom-3'  onClick={()=>{setOpenEditNotes({isShown:true, type: "add", data: {title: "", content: ""}})}}>
        <MdAdd className='text-[32px] text-white'/>
      </button>

      <div className={`${!openEditNotes.isShown ? 'hidden' : 'fixed'} AddEditContainer w-[100%] h-[100%] rounded-md top-0 flex overflow-auto justify-center items-center`} style={{backgroundColor: "rgba(0,0,0,0.2)"}}>
          <AddEditNotes openEditNotes={openEditNotes} setOpenEditNotes={setOpenEditNotes} setDocs={setDocs} darkMode={darkMode} />
      </div>

      {/* the below given btn is for day and night mode*/}
      <button className={`${darkMode ? 'border-white text-white hover:border-black hover:bg-white hover:text-black' : 'border-black hover:text-white'} w-16 h-16 flex items-center justify-center rounded-2xl border-2  max-sm:right-24 max-sm:bottom-3  hover:bg-black fixed right-10 bottom-22`} onClick={()=>setDarkMode(!darkMode)}>
        {!darkMode && <MdOutlineModeNight className='text-3xl'/>} {/*work when dark is diabled */}
        {darkMode && <LuSunMedium className='text-3xl'/>} {/*work when dark is enabled */}
      </button>

    </>
  )
}

export default Home
