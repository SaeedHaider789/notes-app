import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import { pinNoteHandler } from '../../utils/helper';

const NoteCard = ({
    userName,
    id,
    title,
    date,
    content,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
    setDocs,
    setOpenEditNotes
}) => {
  
  return (
    <div id={id} className="card border-2 border-slate-300 max-sm:m-2 max-sm:p-2 p-4 flex justify-between items-center">
      <div className="card-details max-sm:w-72 w-80 overflow-hidden">
        <p className="text-title font-semibold break-words whitespace-normal">{title}</p>
        <div className="body">
          <p className="date text-slate-600 my-1 text-xs">{date}</p>
          <p className="content break-words whitespace-normal">{content}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttons flex flex-col items-center justify-between h-full">
        <MdOutlinePushPin className={`text-xl ${isPinned ? `text-blue-600` : `text-slate-700`} mb-2 cursor-pointer`} onClick={obj=>{onPinNote((obj.target.closest('.card').id), userName, setDocs, isPinned)}} />

        <div className="flex gap-2"> {/* set all the elements for edit and add now I just have to work on backend*/}
          <MdCreate className="text-xl text-slate-700 cursor-pointer" onClick={obj=>{setOpenEditNotes({isShown:true, type: "edit", data: {title: obj.target.closest('.card').querySelector('.text-title').innerHTML, content: obj.target.closest('.card').querySelector('.content').innerHTML}, id: obj.target.closest('.card').id})}} />
          
          <MdDelete className="text-xl text-red-600 cursor-pointer" onClick={obj=>{onDelete((obj.target.closest('.card').id), userName, setDocs)}} />
        </div>
      </div>
    </div>

  )
}

export default NoteCard