import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Navbar.css'
import chart from './img/chart.png'
import chat from './img/chat.png'
import user from './img/user.png'
import shape from './img/shape.png'
import contact from './img/help-circle.png'
import book from './img/book.png'
import logoutimg from './img/logout.png'
import Logout from '../Logout/Logout';
import { useState } from 'react';
import { collection, doc, getDoc, getDocs, where ,query, onSnapshot} from 'firebase/firestore';
import { db } from '../../mindapp/firebase';

function Navbar({}) {
  const navigate = useNavigate();

  const usertype = localStorage.getItem('type')
  const mentorid = localStorage.getItem('mentorid')
  const userid = localStorage.getItem('user')




  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const [toggle, setToggle] = useState(false)


    const [loader, setloader] = useState(false)
    const [Users, setUsers] = useState([])
  const LoginUser = async () => {

    //gets the logged in user using localstorage userid 
    if(usertype === "mentor" || usertype === "admin"){
      const UserdocRef = doc(db, "Mentors", userid);
      const UserdocSnap = await getDoc(UserdocRef);
  
      const item = []
      if (UserdocSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        item.push(UserdocSnap.data())
  
        setUsers(item)
        setloader(true)
  
        // console.log(" hahaha hehe");
  
      } else {
          
        console.log("some error occured  hahaha ");
      }
    }
    if(usertype === "student"){
      const UserdocRef = doc(db, "User", userid);
      const UserdocSnap = await getDoc(UserdocRef);
  
      const item = []
      if (UserdocSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        item.push(UserdocSnap.data())
  
        setUsers(item)
        setloader(true)
  
        // console.log(" hahaha hehe");
  
      } else {
          
        console.log("some error occured  hahaha ");
      }
    }
   
  }

    const navRef = useRef(); 

  useEffect(() => {
    LoginUser();

    document.addEventListener("mousedown", (e) => {
      if (!navRef.current.contains(e.target)) {
        setToggle(false)
      };

    });

  }, [loader])



  //  chat 

  const [studentchats, setstudentChats] = useState([])
  const [mentorchats, setmentorChats] = useState([])
  const [mentorchats2, setmentorChats2] = useState([])  

      const type = localStorage.getItem("type")

    const getchat = async()=>{
      if (type === "mentor" || type === "admin") {
        const q = query(collection(db, "messages"),where("mentor_id", "==", userid),where("status","==",false),where("sender","!=",userid));

        const querySnapshot = await getDocs(q);

        const Item = [];

        querySnapshot.forEach(element => {
            const eid = { id: element.id }
            Item.push({ ...element.data(), ...eid })
        })
        setstudentChats(Item)

        const q1 = query(collection(db, "messages"), where("mentor1_id", "==", userid),where("status","==",false),where("sender","!=",userid));


        const Item1 = [];
        onSnapshot(q1,(querySnapshot1)=>{
          querySnapshot1.forEach(element => {
            // console.log("MenteelistAlltime =>", element.data())
            const eid = { id: element.id }
            Item1.push({ ...element.data(), ...eid })
        })
        setmentorChats(Item1)
        } )
       

        const q2 = query(collection(db, "messages"), where("mentor2_id", "==", userid),where("status","==",false),where("sender","!=",userid));


        const Item2 = [];
        onSnapshot(q2, (querySnapshot2)=>{
       
        querySnapshot2.forEach(element => {
            console.log("MenteelistAlltime =>", element.data())
            const eid = { id: element.id }
            Item2.push({ ...element.data(), ...eid })
        })
        setmentorChats2(Item2)
      })

    } else if (type === "student") {
        const q = query(collection(db, "messages"), where("mentee_id", "==", userid),where("status","==",false),where("sender","!=",userid));


        const Item = [];

          onSnapshot(q,(querySnapshot)=>{

          
        querySnapshot.forEach(element => {
            // console.log("MenteelistAlltime =>", element.data())
            const eid = { id: element.id }
            Item.push({ ...element.data(), ...eid })
        })
        setstudentChats(Item)
        console.log(Item)
      })

    }
    }


      useEffect(()=>{
        getchat();
      },[])

  return (
    <>

      {loader === true ? <>


        <div id='menu-icon' style={{ margin: "20px", fontWeight: "bold", fontSize: "28px", position: 'fixed', top: "-1.%", zIndex: '100', cursor: "pointer" }} onClick={() => { setToggle(!toggle) }} >
        {studentchats.length > 0 ?  <span style={{color:"white",float:"right",background:"red",borderRadius:"50%",fontSize:"10px", width:"15px",height:"15px",textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center',marginLeft:"-5px"}} >{studentchats.length} </span>  : null }
                                                        {mentorchats.length > 0 ?  <span style={{color:"white",float:"right",background:"red",borderRadius:"50%",fontSize:"10px", width:"15px",height:"15px",textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center',marginLeft:"-5px"}} >{mentorchats.length} </span>  : null }
                                                        {mentorchats2.length > 0 ?  <span style={{color:"white",float:"right",background:"red",borderRadius:"50%",fontSize:"10px", width:"15px",height:"15px",textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center',marginLeft:"-5px"}} >{mentorchats2.length} </span>  : null }
          ☰</div>

        <div className='Navbar' id={toggle ? "" : "navbar"} ref={navRef} >




          <ul>

            <Link onClick={() => { }} className={splitLocation[2] === undefined ? "link active" : "link"} to='/dashboard'> <img src={chart} alt="" /> Home</Link>
            <Link onClick={() => { console.log(splitLocation[2]) }} className={splitLocation[2] === "studyresources" ? "link active" : "link"} to='/dashboard/studyresources'> <img src={book} alt="" /> Study Resources</Link>
            <Link onClick={() => { }} className={splitLocation[2] === "chat" ? "link active" : "link"} to="/dashboard/chat"><img src={chat} alt="" />Messages  
                                                        {studentchats.length > 0 ?  <span style={{color:"white",float:"right",background:"red",borderRadius:"50%", width:"20px",height:"20px",textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center',marginLeft:"10px"}} >{studentchats.length} </span>  : null }
                                                        {mentorchats.length > 0 ?  <span style={{color:"white",float:"right",background:"red",borderRadius:"50%", width:"20px",height:"20px",textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center',marginLeft:"10px"}} >{mentorchats.length} </span>  : null }
                                                        {mentorchats2.length > 0 ?  <span style={{color:"white",float:"right",background:"red",borderRadius:"50%", width:"20px",height:"20px",textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center',marginLeft:"10px"}} >{mentorchats2.length} </span>  : null }
                                                        
                                                        </Link>
            {usertype == "student" ? <Link onClick={() => { setToggle(false) }} className={splitLocation[2] === "about" ? "link active" : "link"} to={`/dashboard/profile/mentor/${mentorid}`}><img src={user} alt="" />Mentor Details</Link> : null}
            {usertype == "mentor" ? <Link onClick={() => { setToggle(false) }} className={splitLocation[2] === "Mymentees" ? "link active" : "link"} to='/dashboard/Mymentees'><img src={user} alt="" />My Mentee</Link> : null}
            {usertype == "student" ? <Link onClick={() => { setToggle(false) }} className={splitLocation[2] === "planDetails" ? "link active" : "link"} to='/dashboard/planDetails'><img src={shape} alt="" />Plan Details</Link> : null}
            {usertype == "student" ? <Link onClick={() => { setToggle(false) }} className={splitLocation[2] === "contact" ? "link active" : "link"} to='/dashboard/contact'><img src={contact} alt="" />Contact us</Link> : null}
            {usertype == "student" ? <a href='https://drive.google.com/file/d/1DxczkY6acyMPV7AF4ocplZgrA6wqhF99/view' target="_blank" className='link'><img src={user} alt="" />  Download Apk </a> : null}
            {usertype == "admin" ? <Link onClick={() => { setToggle(false) }} className={splitLocation[2] === "AssignMentor" ? "link active" : "link"} to='/dashboard/AssignMentor'><img src={user} alt="" />New Mentees</Link> : null}
            <div to='/' id='logout' style={{ display: "flex", padding: "4%", width: "80%" }} onClick={() => { setToggle(false) }} ><img src={logoutimg} alt="" /> <Logout /> </div>
          </ul>
        </div>
      </> : null}

    </>

  )
}

export default Navbar