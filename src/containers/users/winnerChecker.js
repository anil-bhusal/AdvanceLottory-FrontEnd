import { useState, useEffect } from "react"
import "../../App.css"

const WinnerChecker = () => {
  const colorList = ['red', 'green', 'aqua']
  
  const [ticketList, setTicketList] = useState([])
  const [typedTicketNo, setTypedTicketNo] = useState('')
  const [currentName, setCurrentName] = useState([])
  const [stillInTheGame, setStillInTheGame] = useState(true)
  const [colorIndex, setColorIndex] = useState(0)
  const [validUser, setVaildUser] = useState('')
  const [userList, setUserList] = useState([])

  const fetchTicketData = async() => {
    const data = await fetch('http://localhost:3000/ticket/')
    const tktList = await data.json()
    const allTicketList = tktList.ticketList

    const tempList = []
    // console.log(allTicketList)
    allTicketList.map((item, id) => {      
      if(!tempList.includes(item.ticketNo)){
        tempList.push(item.ticketNo)
      }
    })
    setTicketList(tempList)

    const tempUser = []
    allTicketList.map((item, id) => {      
      if(!tempUser.includes(item.name)){
        tempUser.push(item.name)
      }
    })
    console.log(tempUser)
    setUserList(tempUser)
  }

  useEffect(() => {
    fetchTicketData()
  }, [])

  const clickTheDiv = () => {
    if(colorIndex === colorList.length -1){
       setColorIndex(0)
    }else{
      setColorIndex(colorIndex + 1)
    }
  }


  const drawRandom = async() => {
    let checkTicket
    const a = ticketList.filter((item, id) => {
        return item ==typedTicketNo
    })

    console.log(a.length>0)

    if(userList.includes(currentName)){
        // if()
      const randomID = Math.floor(Math.random()*ticketList.length)
      const tempTicket = [...ticketList]
      tempTicket.splice(randomID, 1)
      const typedNumInt = Number(typedTicketNo)
      if(tempTicket.includes(typedNumInt)){
          setStillInTheGame(true)
      }else{
          setStillInTheGame(false)
      }
      setTicketList(tempTicket)
    }
    else{
      const list = await fetch('http://localhost:3000/getUser/')
      const user1 = await list.json()
      const user2 = user1.msg
      setVaildUser(user2)
    }   
  }

  if(!stillInTheGame){
    return (<h1>hi you lost</h1>) 
  }

  return (
    <>
    hi{ currentName}
    {/* {JSON.stringify(ticketList)} */}
    {/* {console.log(JSON.stringify(ticketList))} */}
      {ticketList.length > 0 && ticketList.map((item, id) => {
        return <div className="ticket" 
        style={{backgroundColor: typedTicketNo.toString() === item.toString() ? colorList[colorIndex] : null}}
        onClick = {() => clickTheDiv()}
        > {item} </div>  
      })}
      <input placeholder="enter your ticket number" onKeyUp={(e) => setTypedTicketNo(e.target.value)} style={{marginLeft: '17%'}}/> <br/> <br/>
      <input placeholder="enter your name" onKeyUp={(e) => setCurrentName(e.target.value)} style={{marginLeft: '17%'}}/> <br/><br/>
      <h5> {validUser} </h5>
      <button style={{marginLeft: '17%'}} onClick={() => drawRandom()}>Next draw</button>
    </>
  );
}

export default WinnerChecker;