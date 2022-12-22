import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const AssignWinner = () => {   
    const [ticket, setTicket] = useState([])
    const [currentWinColor, setCurrentWinColor] = useState(null)
    const [currentWinNumber, setCurrentWinNumber] = useState(null)
    const [drawResponse, setDrawResponse] = useState('')
    const navigate = useNavigate();

    const fetchUser = async() => {
      const data = await fetch('http://localhost:3000/ticket')
      const userList = await data.json()
      const allTicketList = userList.ticketList
      let tempList = []
      allTicketList.map((item, id) => {
        if(!tempList.includes(item.ticketNo)){
          tempList.push(item.ticketNo)
          // debugger;
        }
      })   
      // debugger;
      setTicket(tempList)      
    }

    useEffect(() => {
      fetchUser()
    }, [])
    
    const predictWinner = () => {
      const bcolor = ['red', 'green', 'aqua']
      const randIdColor = Math.floor(Math.random()*bcolor.length)
      const randIdNumber = Math.floor(Math.random()*ticket.length)
      setCurrentWinNumber(ticket[randIdNumber])
      setCurrentWinColor(bcolor[randIdColor])
    }

    const saveWinner = () => {
      const requestOptions = {
        method: "POST",
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({ticketNo: currentWinNumber, color: currentWinColor})
    }
    fetch('http://localhost:3000/winner/', requestOptions).then(res => res.json()).then(data => setDrawResponse(data.msg))
    // setDrawResponse(false)
    }


  return (
    <>
    {ticket.length > 0 && ticket.map((item, id) => {
      return <div style={{backgroundColor : currentWinNumber === item ? currentWinColor : null }}>{item}</div>
    })}

    {!drawResponse ? (
      <>
      <button onClick={() => predictWinner()}>Assign Winner</button>
      <button onClick={() => saveWinner()}>Save Winner</button>
      </>
    ) : drawResponse}
    <button onClick={() => navigate("/")}> back to home</button>


    
    </>
  );
}

export default AssignWinner;