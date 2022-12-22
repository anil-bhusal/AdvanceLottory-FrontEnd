import { useState, useEffect } from "react"
import "../../App.css"
import RegisterUser from "../admin/registerUser"

const UserList = () => {
    const [usersList, setUsersList] = useState([])
    const [editId, setEditId] = useState(null)

    const fetchUserstData = async() => {
        const data = await fetch('http://localhost:3000/ticket/')
        const userLst = await data.json()    
        const allUsersList = userLst.ticketList
        setUsersList(allUsersList)
      }

    useEffect(() =>{
        fetchUserstData()
    }, [])

  return (
    <>
    {usersList.length>0 && usersList.map((item, id) => {
        return (
        <>
            <div style={{margin: "20px"}}>{item.name}</div>
            <button onClick={() => setEditId(id)}>Edit</button>
            {id ===editId && <RegisterUser editForm = {true} userDetail = {item}/> }
        </>        
        )
    })}

    </>
  );
}

export default UserList;