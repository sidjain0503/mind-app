import React, { useEffect, useRef, useState } from 'react'
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../mindapp/firebase';





function Message({ chatid }) {

  const [message, setMessage] = useState([]);


  const getAllmsg = async () => {

    const q = query(collection(db, `messages/${chatid}/message`), orderBy("sendat", "asc"));
    onSnapshot(q, (querySnapshot) => {
      const storemsg = [];
      querySnapshot.forEach((doc) => {
        storemsg.push(doc.data())


      });
      console.log("Current cities in CA: ", storemsg);
      setMessage(storemsg)
      
    });
  }


  const ref = useRef();




  useEffect(() => {
    getAllmsg();
    console.log("message", message)

    console.log("Messagelast", message[message.length - 1])

    // getmessage();
  }, [chatid])

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

  }, [message])


  const user = localStorage.getItem("user")

  return (
    <div className="messages-container">
      {message.length > 0 ? <>
        {message.slice(-100).map((m) => {
          return <>
            {m.sender == user ?
              <div style={{ marginLeft: "auto", background: "#D7F5E7", marginRight: "10px" }}>
                {m.img ? <>
                  <a href={m.img} target="_blank">
                    <img src={m.img} style={{ width: "100%" }} />
                  </a>
                </> : null}
                {m.text.includes("https") ? <a href={m.text} target="_blank"> {m.text}</a> : <>{m.text}</>} <br/>
                <span style={{fontSize:"8px",float:"right",margin:"5px 0px"}}>
                {m.sendat.toDate().toString().slice(15,25)} {new Date(m.sendat.seconds * 1000).toLocaleDateString("en-US")}
                  </span>
                </div> : 
                
                <div style={{ marginRight: "auto", marginLeft: "10px", background: "#EFEFEF" }}>
                  {m.img ? <>
                  <a href={m.img} target="_blank">
                    <img src={m.img} style={{ width: "100%" }} />
                  </a>
                </> : null}
                   {m.text.includes("https:")? <a href={m.text} target="_blank">{m.text}</a> : <>{m.text}</>} <br/>
                  <span style={{fontSize:"8px",float:"right",margin:"5px 0px"}}>
                {m.sendat.toDate().toString().slice(15,25)}{new Date(m.sendat.seconds * 1000).toLocaleDateString("en-US")}
                  </span>
                  </div>}
          </>
        })}
      </> : <>
        <div style={{ background: "rgba(133, 134, 136, 0.1)", borderRadius: "5px", fontSize: "12px", textAlign: "center", position: "absolute", left: "20%" }}>No messages, send a new message to start the conversation.</div>
      </>}

      <span ref={ref} />
    </div>
  )
}

export default Message