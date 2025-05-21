import React, {useState, useEffect} from 'react'
import { IoMdClose } from "react-icons/io";
import { addHandler, editHandler } from '../../utils/helper';
import { useParams } from 'react-router';

const AddEditNotes = ({openEditNotes, setOpenEditNotes, setDocs}) => {

  const { userName } = useParams(); // ✅ Move useParams() outside useEffect
  // console.log(userName)
  const [valTitle, setValTitle] = useState("")
  const [valContent, setValContent] = useState("")

  useEffect(()=>{
    setValTitle(openEditNotes.data.title)
    setValContent(openEditNotes.data.content)
  }, [openEditNotes.isShown])


  return (
    <div className='mainAddEdit w-[40%] max-sm:w-[100%] max-h-3/4 bg-white p-1 rounded-md m-1'>
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className="input-lable">TITTLE</label>
                <IoMdClose className='text-xl cursor-pointer' onClick={(e)=>{setOpenEditNotes({isShown:false, type: "add", data: {title: "", content: ""}, id: ""})}}/>
            </div>
            <input type="text" className='text-2xl text-slate-950 outline-none input-title' placeholder='Go to Gym at 5' value={valTitle} onChange={e=>setValTitle(e.target.value)} />
        </div>

        <div className="flex flex-col mt-4">
            <label className='input-lable'>CONTENT</label>
            <textarea type="text" className='text-sm text-slate-950 outline-none input-content' placeholder='Content' value={valContent} onChange={e=>setValContent(e.target.value)} rows={10}></textarea>
        </div>

        <p className='inputError text-red-600 mt-2 mb-0'></p>

        <button className={`${openEditNotes.type == 'add' ? 'bg-blue-600 hover:bg-blue-800' : 'bg-green-600 hover:bg-green-800'} text-white font-medium mt-2 p-3 w-full rounded-md`} onClick={e=>{(openEditNotes.type == 'add' ? addHandler(userName, valTitle, valContent, setDocs, setOpenEditNotes) : editHandler([openEditNotes.data.title, openEditNotes.data.content], [valTitle, valContent], openEditNotes.id, setDocs, setOpenEditNotes, userName))}}>{openEditNotes.type.toUpperCase()}</button>

    </div>
  )
}

export default AddEditNotes