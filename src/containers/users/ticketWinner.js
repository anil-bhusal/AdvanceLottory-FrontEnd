import { useState, useEffect } from "react"
import "../../App.css"

const TicketWinner = () => {
  const colorList = ['red', 'green', 'aqua']
  
  const [ticketList, setTicketList] = useState([])
  const [typedTicketNo, setTypedTicketNo] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [stillInTheGame, setStillInTheGame] = useState(true)
  const [colorIndex, setColorIndex] = useState(0)
  const [msg, setMsg] = useState('')

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
    console.log(tempList)
    setTicketList(tempList)
  }

  useEffect(() => {
    fetchTicketData()
  }, [])

  const drawRandom = () => {
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

  if(!stillInTheGame){
    return (<h1>hi you lost</h1>) 
  }

  const validateAndDraw = async() => {
    if(ticketList.length === 2){
      setMsg('')
      const data = await fetch(`http://localhost:3000/users/?name=${currentName}&ticketNo=${typedTicketNo}&color=${colorList[colorIndex]}`)
      const validateRes = await data.json()
      setMsg(validateRes.errMsg || validateRes.msg)
    }else{
      drawRandom()
    }
  }

  const clickTheDiv = () => {
    if(colorIndex === colorList.length -1){
       setColorIndex(0)
    }else{
      setColorIndex(colorIndex + 1)
    }
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
      <h5> {msg} </h5>
      <button style={{marginLeft: '17%'}} onClick={() => validateAndDraw()} >Next draw</button>
    </>
  );
}

export default TicketWinner;