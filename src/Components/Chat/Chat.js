import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, where, writeBatch } from 'firebase/firestore'
import { db } from '../../mindapp/firebase'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import Input from './Input/Input'
import Message from './Messages/Message'
import nochat from './img/chat.png'
import searchimg from './img/search-normal.png'
import mentorimg from '../../Components/Navbar/DashboardTab/img/mentor.png'
import menteeimg from '../../Components/Navbar/DashboardTab/img/student.png'
import adminimg from '../../Components/Navbar/DashboardTab/img/admin.png'
import backbtn from './back-button.png'
import DeleteChat from './DeleteChat'
function Chat() {


    const uid = localStorage.getItem("user");
    const type = localStorage.getItem("type");

    const [user, setUser] = useState()
    const [name, setName] = useState()

    const getuser = async () => {

        if (type === "student") {
            const docRef = doc(db, "User", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());

                setUser(docSnap.data().name)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (type === "mentor" || type === "admin") {
            const docRef = doc(db, "Mentors", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());

                setUser(docSnap.data().name)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }



    }


    const [studentchats, setstudentChats] = useState([])
    const [mentorchats, setmentorChats] = useState([])
    const [mentorchats2, setmentorChats2] = useState([])
    const userid = localStorage.getItem("user")
    const [id, setId] = useState()
    const getChat = async () => {
        if (type === "mentor" || type === "admin") {
            const q = query(collection(db, "messages"), orderBy("sendat", "desc"), where("mentor_id", "==", userid));

            const querySnapshot = await getDocs(q);

            const Item = [];

            querySnapshot.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const eid = { id: element.id }
                Item.push({ ...element.data(), ...eid })
            })
            setstudentChats(Item)

            const q1 = query(collection(db, "messages"), orderBy("sendat", "desc"), where("mentor1_id", "==", userid));

            const querySnapshot1 = await getDocs(q1);

            const Item1 = [];

            querySnapshot1.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const eid = { id: element.id }
                Item1.push({ ...element.data(), ...eid })
            })
            setmentorChats(Item1)

            const q2 = query(collection(db, "messages"), orderBy("sendat", "desc"), where("mentor2_id", "==", userid));

            const querySnapshot2 = await getDocs(q2);

            const Item2 = [];

            querySnapshot2.forEach(element => {
                console.log("MenteelistAlltime =>", element.data())
                const eid = { id: element.id }
                Item2.push({ ...element.data(), ...eid })
            })
            setmentorChats2(Item2)


        } else if (type === "student") {
            const q = query(collection(db, "messages"), orderBy("sendat", "desc"), where("mentee_id", "==", uid));

            const querySnapshot = await getDocs(q);

            const Item = [];


            querySnapshot.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const eid = { id: element.id }
                Item.push({ ...element.data(), ...eid })
            })
            setstudentChats(Item)
            console.log(Item)
        }


    }
    const [chatdata, setChatdata] = useState([{
        cid: "",
        student: "",
        mentor: ""
    }])

    const handleChatdata = (id, user) => {
        setChatdata([{
            id: id,
            user: user,
        }])
        console.log(chatdata[0].id)

        console.log(chatdata[0].user)
    }


    const updatechatStatus = async (chatid,sender) => {

        if(sender !== userid){
            const LastRef = doc(db, "messages", chatid);
            await updateDoc(LastRef, {
              status:true
            });
        }

       
        // const q = query(collection(db, "messages"),chatid);

        // const querySnapshot = await getDocs(q);

        // await updateDoc        

        // querySnapshot.forEach(element => {
        //     // console.log("MenteelistAlltime =>", element.data())
          

        //     const sfRef = doc(db, "messages", chatid);
        //     batch.update(sfRef, { "status": true });

        //     console.log("send at updated ",element.id)
        // })
        // await batch.commit();



    }

    useEffect(() => {
        getChat();
        getuser();
    }, [chatdata])

    const [searchterm, setsearchterm] = useState("")
    const [showchat, setshowchat] = useState(false)



    return (
        <div className='chat_tab'>
            <div className="users" id={showchat ? "hide" : "show"}>
                <div className="profile" style={{ flexDirection: "row" }}>
                    {type === 'mentor' ? <>
                        <img src={mentorimg} alt="" style={{ marginLeft: '10px', width: "38px" }} />
                        <div>
                            <span className="name">{user}</span>
                            <span className="type">mentor</span>
                        </div>
                    </> : null}

                    {type === 'student' ? <>
                        <img src={menteeimg} alt="" style={{ marginLeft: '10px', width: "38px" }} />
                        <div>
                            <span className="name">{user}</span>
                            <span className="type">student</span>
                        </div>
                    </> : null}

                    {type === 'admin' ? <>
                        <img src={adminimg} alt="" style={{ marginLeft: '10px', width: "38px" }} />
                        <div>
                            <span className="name">{user}</span>
                            <span className="type">admin</span>
                        </div>
                    </> : null}

                </div>
                <div className="user_search" style={{ flexDirection: "row" }}>
                    <img src={searchimg} alt="" style={{ position: "relative", left: "20px" }} />
                    <input type="text" name="" id="" placeholder='search people ,group and messages' onChange={(e) => setsearchterm(e.target.value)} style={{ position: "relative", left: "-10px" }} />

                </div>
                <div className="user_container" style={{ overflowY: "scroll", height: "85%" }} >


                    {type === "mentor"  || type === "admin" ? <>
                        {studentchats.filter((ch) => ch.student.toLowerCase().includes(searchterm)).sort((a, b) => b.sendat.length - a.sendat.length).map((ch) => {
                            return <>
  
                                <div className="chats"  style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}  >
                                    <DeleteChat type={"student"}  id={ch.id} />

                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }} onClick={() => { handleChatdata(ch.id, ch.student); updatechatStatus(ch.id,ch.sender); console.log(showchat); setshowchat(true) }} >
                                    {ch.status === false && ch.sender !== userid ?  <strong style={{color:"black"}} id={ch.id} >{ch.student}</strong > : <span style={{color:"black"}} id={ch.id} >{ch.student}</span > }
                                        <span style={{ fontSize: "12px" }}>student</span>
                                    </div>
                                    {ch.sendat ? <>
                                        <span style={{ fontSize: "10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',height:"100%" }}>

                                     {ch.status === false && ch.sender !== userid ? <span style={{width:'10px',height:"10px",borderRadius:'50%',background:'rgb(0, 110, 255)'}}></span>: null}   
                                            {ch.sendat.toDate().toString().slice(15, 25)}
                                            
                                        </span>

                                    </> : null}

                                </div>
                            </>
                        })}
                        {mentorchats.sort((a, b) => b.length - a.length).filter((ch) => ch.mentor1.toLowerCase().includes(searchterm) || ch.mentor2.toLowerCase().includes(searchterm)).map((ch) => {
                            return <>
                                {ch.mentor1_id !== userid ? <>

                                    <div className="chats" style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <DeleteChat type={"mentor"}  id={ch.id} />


                                        <div style={{ display: "flex", flexDirection: "column", width: "90%" }} onClick={() => { handleChatdata(ch.id, ch.mentor1); updatechatStatus(ch.id,ch.sender); console.log(showchat); setshowchat(true) }} >
                                    {ch.status === false && ch.sender !== userid ?  <strong style={{color:"black"}} id={ch.id} >{ch.mentor1} {ch.mentor1_college}</strong > : <span style={{color:"black"}} id={ch.id} >{ch.mentor1} {ch.mentor1_college}</span > }

                                            
                                            <span style={{ fontSize: "12px" }}> {ch.mentor1_id === "admin" ? <>admin</> : <>mentor</>} </span>
                                        </div>
                                        {ch.sendat ? <>
                                            <span style={{ fontSize: "10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',height:"100%" }}>
                                     {ch.status === false && ch.sender !== userid ? <span style={{width:'10px',height:"10px",borderRadius:'50%',background:'rgb(0, 110, 255)'}}></span>: null}   
                                          
                                                {ch.sendat.toDate().toString().slice(15, 25)}
                                            </span>

                                        </> : null}
                                    </div>
                                </> : null}
                                {ch.mentor2_id !== userid ? <>
                                    <div className="chats"  style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <DeleteChat type={"mentor"}  id={ch.id} />


                                        <div style={{ display: "flex", flexDirection: "column", width: "90%" }} onClick={() => { handleChatdata(ch.id, ch.mentor2); updatechatStatus(ch.id,ch.sender); console.log(showchat); setshowchat(true) }} >
                                         {ch.status === false && ch.sender !== userid ?<strong id={ch.id} >{ch.mentor2} {ch.mentor2_college} </strong> :<span id={ch.id} >{ch.mentor2} {ch.mentor2_college} </span> }   
                                            <span style={{ fontSize: "12px" }}>{ch.mentor2_id === "admin" ? <>admin</> : <>mentor</>}</span>
                                        </div>
                                        {ch.sendat ? <>
                                            <span style={{ fontSize: "10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',height:"100%" }}>
                                     {ch.status === false && ch.sender !== userid ? <span style={{width:'10px',height:"10px",borderRadius:'50%',background:'rgb(0, 110, 255)'}}></span>: null}   

                                                {ch.sendat.toDate().toString().slice(15, 25)}
                                            </span>

                                        </> : null}
                                    </div>
                                </> : null}

                            </>
                        })}


                        {mentorchats2.filter((ch) => ch.mentor1.toLowerCase().includes(searchterm) || ch.mentor2.toLowerCase().includes(searchterm)).map((ch) => {
                            return <>
                                {ch.mentor1_id !== userid ? <>

                                    <div className="chats" style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <DeleteChat type={"mentor"}  id={ch.id} />

                                        <div style={{ display: "flex", flexDirection: "column", width: "90%" }} onClick={() => { handleChatdata(ch.id, ch.mentor1); updatechatStatus(ch.id,ch.sender); console.log(showchat); setshowchat(true) }}>
                                         {ch.status === false && ch.sender !== userid ? <strong id={ch.id} >{ch.mentor1} {ch.mentor1_college} {} </strong> :<span id={ch.id} >{ch.mentor2} {ch.mentor2_college} </span> }   

                                            <span style={{ fontSize: "12px" }}>{ch.mentor1_id === "admin" ? <>admin</> : <>mentor</>}</span>
                                        </div>
                                        {ch.sendat ? <>
                                            <span style={{ fontSize: "10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',height:"100%" }}>
                                     {ch.status === false && ch.sender !== userid? <span style={{width:'10px',height:"10px",borderRadius:'50%',background:'rgb(0, 110, 255)'}}></span>: null}   

                                                {ch.sendat.toDate().toString().slice(15, 25)}
                                            </span>

                                        </> : null}
                                    </div>
                                </> : null}
                                {ch.mentor2_id !== userid ? <>
                                    <div className="chats" style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <DeleteChat type={"mentor"}  id={ch.id} />


                                        <div style={{ display: "flex", flexDirection: "column", width: "90%" }} onClick={() => { handleChatdata(ch.id, ch.mentor2); updatechatStatus(ch.id,ch.sender); console.log(showchat); setshowchat(true) }} >
                                         {ch.status === false && ch.sender !== userid ?<strong id={ch.id} >{ch.mentor2} mentor2</strong> : <span id={ch.id} >{ch.mentor2} mentor2</span> }   
                                            <span style={{ fontSize: "12px" }}>{ch.mentor2_id === "admin" ? <>admin</> : <>mentor</>}</span>
                                        </div>
                                        {ch.sendat ? <>
                                            <span style={{ fontSize: "10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',height:"100%" }}>
                                     {ch.status === false && ch.sender !== userid? <span style={{width:'10px',height:"10px",borderRadius:'50%',background:'rgb(0, 110, 255)'}}></span>: null}   

                                                {ch.sendat.toDate().toString().slice(15, 25)}
                                            </span>

                                        </> : null}
                                    </div>
                                </> : null}

                            </>
                        })}


                    </> : null}



                    {type === "student" ? <>
                        {studentchats.filter((ch) => ch.student.toLowerCase().includes(searchterm)).map((ch) => {
                            return <>
                                <div className="chats"  style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }} >
                                <DeleteChat type={"mentor"}  id={ch.id} />

                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}  onClick={() => { handleChatdata(ch.id, ch.mentor); updatechatStatus(ch.id,ch.sender); console.log(showchat); setshowchat(true) }}>
                                     {ch.status === false && ch.sender !== userid   ?  <strong id={ch.id} >{ch.mentor}</strong> : <span id={ch.id} >{ch.mentor}</span>}   
                                        <span style={{ fontSize: "12px" }}>mentor</span>
                                    </div>
                                    {ch.sendat ? <>
                                        <span style={{ fontSize: "10px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',height:"100%" }}>
                                     {ch.status === false && ch.sender !== userid ? <span style={{width:'10px',height:"10px",borderRadius:'50%',background:'rgb(0, 110, 255)'}}> </span>: null}   

                                            {ch.sendat.toDate().toString().slice(15, 25)}
                                        </span>
                                    </> : null}
                                </div>
                            </>
                        })}
                    </> : null}



                </div>
            </div>

            <div className="messages" id={showchat ? "show" : "hide"} >

                {chatdata[0].id != null ? <>
                    <div className="chat-profile">
                        {type === "mentor" ? <> <img src={menteeimg} style={{ margin: "0 10px" }} alt="" /> <div id='chat-name' style={{ color: "color: #1A1D1F", fontSize: "16px", fontFamily: "Manrope", fontWeight: "600", fontStyle: "normal" }}>{chatdata[0].user}</div > </> : null}
                        {type === "student" ? <> <img src={mentorimg} style={{ margin: "0 10px" }} alt="" /> <div id='chat-name' style={{ color: "color: #1A1D1F", fontSize: "16px", fontFamily: "Manrope", fontWeight: "600", fontStyle: "normal" }}>{chatdata[0].user} </div > </> : null}
                        {type === "admin" ? <> <img src={adminimg} style={{ margin: "0 10px" }} alt="" /> <div id='chat-name' style={{ color: "color: #1A1D1F", fontSize: "16px", fontFamily: "Manrope", fontWeight: "600", fontStyle: "normal" }}>{chatdata[0].user} </div > </> : null}
                        <div className="back" onClick={() => setshowchat(false)} ><img src={backbtn} alt="" style={{ width: "16px", height: "16px" }} /></div>
                    </div>
                    <Message chatid={chatdata[0].id} />
                    <Input chatid={chatdata[0].id} />
                </> :
                    <>
                        <div className="nochat">
                            <img src={nochat} alt="" />
                            <div>Cick on the chats to display them here ! </div>

                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Chat

