export function validateEmail(email) {
    if (typeof email !== "string") return false;
  
    // Must contain one "@" and not at the start or end
    const atIndex = email.indexOf("@");
    if (atIndex <= 0 || atIndex !== email.lastIndexOf("@") || atIndex === email.length - 1) {
      return false;
    }
  
    // Must contain a "." after the "@"
    const dotIndex = email.indexOf(".", atIndex);
    if (dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
      return false;
    }
  
    return true;
}

export const getInitials = (name) =>{
    if(!name) return ''

    const words = name.split(" ")
    let initials = ""

    for(let i = 0; i < 2; i++){
        initials = initials + words[i][0]
    }

    return initials.toUpperCase()
}

export const emailRegistered = async(email, user) =>{ //it will verify that the email is registered or not
    let registered = await fetch(`${import.meta.env.VITE_LOGIN_API}/signup/check/${email}/${user}`)
    registered = await registered.json()
    // console.log(value)
    return registered
}

export const saveSignUpData = async(user, email, password)=>{
    
    const options = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'user': user,
            'email': email,
            'password': password
        })
    }
    // console.log(options)
    let saved = await fetch(`${import.meta.env.VITE_LOGIN_API}/signup/save`, options)

    return ""
    // console.log(saved)
}

export const fetchDataOfUserName = async(user) =>{
    let notes = await fetch(`${import.meta.env.VITE_LOGIN_API}/dashboard/${user}`)
    notes = await notes.json()
    // console.log(notes)

    return notes
} 

export const notesDelete = async(id, user, setDocs) => {
    // console.log(id)

    const options = {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': id
        })
    }

    const del = await fetch(`${import.meta.env.VITE_LOGIN_API}/dashboard/delete`, options)

    // console.log(user)
    let newNotes = await fetchDataOfUserName(user)
    // console.log(newNotes)

    setDocs(newNotes)

}

export const pinNoteHandler = async(id, user, setDocs, isPinned) =>{
    // console.log('hey')
    // console.log(isPinned)

    const options = {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            'id': id,
            'isPinned': isPinned
        })
    }
    
    let result = await fetch(`${import.meta.env.VITE_LOGIN_API}/dashboard/pin`, options)
    // result = await result.text()
    // console.log(result)

    let newNotes = await fetchDataOfUserName(user)
    setDocs(newNotes)
}



// user: String,
//   title: String,
//   date: String,
//   content: String,  // schema
//   isPinned: Boolean
export const addHandler = async(userName, title, content, setDocs, setOpenEditNotes) =>{  // handles the add functionality of the code
    let errContainer = document.querySelector('.inputError')
    if(!title){ // these two conditions will make sure that the title and content gets filled
        errContainer.innerHTML = 'Please enter title.'
        return
    }
    if(!content){
        errContainer.innerHTML = 'Please enter content.'
        return
    }
    errContainer.innerHTML = ''

    // finding date
    let tempDate = new Date()
    tempDate = tempDate.toString().split(" ")
    let date = [tempDate[2], tempDate[1], tempDate[3]].join(" ")
    // console.log(date)

    const isPinned = false

    // creating option parameter
    const options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            'user': userName,
            'title': title,
            'date': date,
            'content': content,
            'isPinned': isPinned
        })
    }

    // req to API
    let adding = await fetch(`${import.meta.env.VITE_LOGIN_API}/dashboard/add`, options)
    let text = await adding.text()

    // closing the add tab
    setOpenEditNotes({
        isShown: false,
        type: "add",
        data: {  // empty for add,  data and id are for edit
          title: '',
          content: ''
        }, 
        id: "" //empty string for add
      })

    // refreshing the screen
    let newNotes = await fetchDataOfUserName(userName)
    setDocs(newNotes)
    // console.log(text)
}

export const editHandler = async(oldData, newData, id, setDocs, setOpenEditNotes, userName) =>{ // it wil send reqs for edits
    let errContainer = document.querySelector('.inputError')
    // console.log(oldData)
    // console.log(newData)
    if(oldData[0] == newData[0] && oldData[1] == newData[1]){ // checks change
        errContainer.innerHTML = "Please add a change to edit."
        return
    }
    errContainer.innerHTML = ''
    // console.log(id)

    const options = {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            'id': id,
            'title': newData[0],
            'content': newData[1]
        })
    }

    let editing = await fetch(`${import.meta.env.VITE_LOGIN_API}/dashboard/edit`, options)
    let response = await editing.text()
    // console.log(response)

    setOpenEditNotes({
        isShown: false,
        type: "add",
        data: {  // empty for add,  data and id are for edit
          title: '',
          content: ''
        }, 
        id: "" //empty string for add
      })

    // refreshing the screen
    let newNotes = await fetchDataOfUserName(userName)
    setDocs(newNotes)
    // console.log(text)

}



