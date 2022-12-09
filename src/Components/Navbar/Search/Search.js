import React, { useState } from 'react'
import './Search.css'
import calander from '../DashboardTab/img/calander.png'
import notification from '../DashboardTab/img/notification.png'
import Homecalander from './Homecalander/Homecalander'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from '../../../mindapp/firebase'
import { useEffect } from 'react'
import { useRef } from 'react'
import { async } from '@firebase/util'
import mentorimg from '../DashboardTab/img/mentor.png'
import adminimg from '../DashboardTab/img/admin.png'
import studentimg from '../DashboardTab/img/student.png'
import Navbar from '../Navbar'

function Search() {

  const [showcalander, setshowcalander] = useState(false)
  const [search, setsearch] = useState(false)
  const username = localStorage.getItem('username');
  const [AllMentee, setAllMentee] = useState([])
  const [loader, setloader] = useState(false)
  const userid = localStorage.getItem('user');
  const type = localStorage.getItem('type');
  const navigate = useNavigate();
  const [User, setUser] = useState([])
  const menteeList = async () => {

    //gives the mentee list where the logged in user is mentor and is alloted ! 
    if (type === "student") {
      const q1 = await getDoc(doc(db, "User", userid));

      const user = []
      user.push(q1.data())

      setUser(user)
      console.log(User)

    }
    if (type === "mentor") {
      const userref = doc(db, "Mentors", userid)
      onSnapshot(userref, (q1) => {
        const user = []
        user.push(q1.data())

        setUser(user)
        console.log(User)

      });






    }





    const q = query(collection(db, "User"), where("mentor_id", "==", userid));
    const querySnapshot = await getDocs(q);


    if (querySnapshot.empty == true) {
      // toast.error("no mentee alloted today ")
    }
    const menteeItem = [];

    querySnapshot.forEach(element => {
      // console.log("MenteelistAlltime =>", element.data())
      const menteeid = { id: element.id }
      menteeItem.push({ ...element.data(), ...menteeid })
    })
    setAllMentee(menteeItem)
    setloader(true)
    console.log(AllMentee)
      ;

  };

  const [Task, setTask] = useState([])

  const getAllTasks = async () => {

     if (type === "student") {
      const userref = doc(db, "User", userid)
      onSnapshot(userref, (q1) => {
        const user = []
        user.push(q1.data())

        setUser(user)

      });
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const getAllTask = query(collection(db, "Tasks"), orderBy("Assignedat", "asc"), orderBy("status", "asc"), where("mentee_id", "==", userid), where("Assignedat", ">=", sevenDaysAgo));


    const allTAskquerySnapshot = await getDocs(getAllTask);
    //gives multiple objects 

    if (allTAskquerySnapshot.empty == true) {
      //dont have any object then no task assigned 

    }

    if (allTAskquerySnapshot.empty == false) {
      //has object task assigned 
      // toast.success("Task  assigned ")

      const Taskinfo = [];

      allTAskquerySnapshot.forEach((doc) => {
        const tid = { id: doc.id };
        Taskinfo.push({ ...doc.data(), ...tid });

      });
      setTask(Taskinfo);
    setloader(true)

    }
  }


  const AdminUsers = async () => {

    if (type === "admin") {
      const userref = doc(db, "Mentors", userid)
      onSnapshot(userref, (q1) => {
        const user = []
        user.push(q1.data())

        setUser(user)

      });

    }

    const q = query(collection(db, "User"), where("type", "==", "student"));
    const querySnapshot = await getDocs(q);

    const Item = [];

    querySnapshot.forEach(element => {
      // console.log("MenteelistAlltime =>", element.data())
      const menteeid = { id: element.id }
      Item.push({ ...element.data(), ...menteeid })
    })

    const mentor = query(collection(db, "Mentors"), where("type", "==", "mentor"));
    const mentorSnapshot = await getDocs(mentor);

    mentorSnapshot.forEach(element => {
      // console.log("MenteelistAlltime =>", element.data())
      const menteeid = { id: element.id }
      Item.push({ ...element.data(), ...menteeid })
    })

    setAllMentee(Item)

    setloader(true)
  }


  const searchref = useRef();
  useEffect(() => {
    if (type === "mentor") {
      menteeList();
    }
    if (type === "student") {
      getAllTasks();
    }
    if (type === "admin") {
      AdminUsers();
    }
    document.addEventListener("mousedown", (e) => {
      if (!searchref.current.contains(e.target)) {
        setsearch(false)
      };
    })


  }, [])

  const [queries, setqueries] = useState("")
  const handleChange = (e) => {
    setqueries(e.target.value);
    setsearch(true)
  }


  const uid = localStorage.getItem("user");


  const [Broadcast, setBroadcast] = useState([])

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const getbroadcast = async () => {

    const oneDaysAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);

    const q = query(collection(db, "Broadcast"), where("send_to", "array-contains", uid),where("sendat",">=",oneDaysAgo));

    onSnapshot(q, (querySnapshot) => {
      const item = []
      querySnapshot.forEach((doc) => {

        console.log(doc.data())
        const dataid = { id: doc.id }
        item.push({ ...doc.data(), ...dataid })
        // const newArray = new Array().fills(doc.data());
        // console.log(newArray)
        console.log(item)
      })
      setBroadcast(item);
    })



  }

  useEffect(() => {
    getbroadcast();

  }, [])

  const calanderRef = useRef()
  const notificationRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!calanderRef.current.contains(e.target)) {
        setshowcalander(false)
      };

    });

    document.addEventListener("mousedown", (e) => {
      if (!notificationRef.current.contains(e.target)) {
        setnotification(false)
      };

    });

  }, [])

  const [notifications, setnotification] = useState(false)

  return (

    <>

      {User.length > 0 ?
        <>
       

      <div className='search'>


        <input type="text" placeholder='Search' style={{ borderRadius: "6px", border: "1px solid rgba(0, 0, 0, 0.08)" }} onChange={handleChange} />

        <div className="search_end" style={{ display: "flex", width: "35%" }}>
          <img src={calander} className="search-img" alt="" onClick={() => setshowcalander(!showcalander)} style={{ margin: "0 10px 0 10px", width: "35px", height: "35px", cursor: "pointer" }} ref={searchref} />
          <img src={notification} className="search-img" alt="" style={{ margin: "0 10px 0 10px", width: "35px", height: "35px", cursor: "pointer", cursor: "pointer" }} onClick={() => setnotification(!notifications)} />
          {Broadcast.length > 0 ?
            <div style={{ position: "relative", width: "10px", height: '10px', top: "-10px", left: '-15px', borderRadius: "50%", background: "red" }}></div>
            : null}
          <div className="user" style={{ display: "flex", alignItems: "center" }}>
            <span style={{ margin: "0 10px 0 30px", fontSize: "22px", cursor: "pointer" }} id="user-name" onClick={() => { navigate("/dashboard/profile") }}>{username} </span>
          </div>
          {type === "mentor" ?
            <img src={User.map((m) => m.img ? m.img : mentorimg)} alt="" style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "50%", cursor: "pointer" }} onClick={() => { navigate("/dashboard/profile") }} />
            : null}
          {type === "student" ?
            <img src={studentimg} alt="" style={{ width: "45px", height: "45px", cursor: "pointer" }} className="search-img" onClick={() => { navigate("/dashboard/profile") }} />
            : null}
          {type === "admin" ?
            <img src={User.map((m) => m.img ? m.img : adminimg)} alt="" style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "50%", cursor: "pointer" }} onClick={() => { navigate("/dashboard/profile") }} />
            : null}


        </div>
      </div>
      {showcalander == true ? <>
        <div ref={calanderRef} >
          <Homecalander calander={"notification"} />

        </div>
      </> : null}
      {search == true ? <>
        <div className="searchlist" ref={searchref}>
          <ul style={{ padding: "0px", height: "300px", overflowY: "scroll", overflowX: "hidden" }}>
            {type === "mentor" || type === "admin" || AllMentee.length > 0 ? <>
              {AllMentee.filter((mentee) => mentee.name.toLowerCase().includes(queries.toLowerCase())).map((mentee) => {
                return <>
                  <li> <span > {mentee.name} <span style={{ fontSize: "12px" }}> {mentee.type === "mentor" ? <>{mentee.feild}</> : null} {mentee.type}</span> </span>

                    <div>
                      {mentee.type === "student" ?
                        <a id='checktask' style={{ background: "#263238", color: "#ffff", border: "none", borderRadius: "4px", padding: "8px", textDecoration: "none", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`/dashboard/profile/mentee/${mentee.id}`)} target="_blank" >Profile</a>
                        : null}
                      {mentee.type === "mentor" ?
                        <a id='checktask' style={{ background: "#263238", color: "#ffff", border: "none", borderRadius: "4px", padding: "8px", textDecoration: "none", margin: "10px", cursor: "pointer" }} onClick={() => navigate(`/dashboard/profile/mentor/${mentee.id}`)} target="_blank" >Profile</a>
                        : null}
                      <a id='checktask' style={{ background: "#263238", color: "#ffff", border: "none", borderRadius: "4px", padding: "8px", textDecoration: "none", cursor: "pointer" }} onClick={() => navigate(`/dashboard/chat`)} >Chat</a>
                    </div>
                  </li>
                </>
              })}
            </> : null}

            {type === "student" ? <>
              {Task.filter((task) => task.Task.toLowerCase().includes(queries)).map((task, index) => {
                return <>
                  <li> <span>
                    {index + 1}. {task.Task}

                  </span>

                    <a id='checktask' style={{ background: "#263238", color: "#ffff", border: "none", borderRadius: "4px", padding: "8px", textDecoration: "none" }} onClick={() => navigate("/dashboard/checkTask")} >Check Task</a>
                  </li>
                </>
              })}
            </> : null}
          </ul>
        </div>
      </> : null

      }

      {notifications === true ? <>

        <div id='notification' ref={notificationRef} style={{ position: "absolute", top: "10%", left: "70%", height: "50%", width: "300px", border: "1px solid rgb(0,0,0,0.4)", borderRadius: "6px", background: "white", padding: "20px" }}>

          <h1 style={{ fontSize: '16px', fontFamily: "Manrope" }}>Notification's</h1>

          {Broadcast.length > 0 ? <>
            <p >

              {Broadcast.map(b => {
                return <>
                  <li style={{ listStyle: "number", fontFamily: "Manrope", fontSize: "14px", margin: "10px 0px " }}>
                    {b.Broadcast_text} 
                    <strong style={{float:"right",fontSize:"10px"}}>  {new Date(b.sendat.seconds * 1000).toLocaleDateString("en-US")} by  {b.sender} </strong>
                  </li>
                </>
              })}
            </p>
          </> : <p style={{ fontFamily: "Manrope" }}>
            No notifications
          </p>}

        </div>
      </> : null}



      </>
        : null}

    </>
  )
}

export default Search