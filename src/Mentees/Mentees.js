import React, { useEffect, useState } from 'react'
import AssignTask from '../Components/AssignTask/AssignTask'
import './Mentees.css'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from '../mindapp/firebase';
import { toast } from 'react-toastify';
import search from './search-normal.png'
import connect from '../Components/Navbar/DashboardTab/img/connect.png'
import { useNavigate } from 'react-router-dom';
import Pagination from '../Components/Pagination/Pagination';
import menteeimg from '../Components/Navbar/DashboardTab/img/student.png'

function Mentees({ task }) {
    const [AllMentee, setAllMentee] = useState([])
    const [loader, setloader] = useState(false)
    const userid = localStorage.getItem('user');
    const username = localStorage.getItem('username')
    const type = localStorage.getItem('type');
    const navigate = useNavigate();
    const [Animate, setAnimate] = useState(false)
    const menteeList = async () => {

        //gives the mentee list where the logged in user is mentor and is alloted ! 
        if (type === "mentor") {

            const q = query(collection(db, "User"), where("mentor_id", "==", userid));
            const querySnapshot = await getDocs(q);


            if (querySnapshot.empty == true) {
                toast.error("no mentee alloted today ")
            }
            const menteeItem = [];

            querySnapshot.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const menteeid = { id: element.id }
                menteeItem.push({ ...element.data(), ...menteeid })
            })
            console.log(menteeItem)
            setAllMentee(menteeItem)
            setloader(true)
                // console.log(AllMentee)
                ;
        }

        if (type === "admin") {
            const q = query(collection(db, "User"), where("type", "==", "student"), orderBy("mentor_alloted", "asc"));
            const querySnapshot = await getDocs(q);


            if (querySnapshot.empty == true) {
                toast.error("no mentee alloted today ")
            }
            const menteeItem = [];

            querySnapshot.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const menteeid = { id: element.id }
                menteeItem.push({ ...element.data(), ...menteeid })
                
            })
            setAllMentee(menteeItem)
            setloader(true)
        }
    };

    const createChat = async (menteeid, menteename) => {

        const chatid = userid + "chat" + menteeid;

        const UserdocRef = doc(db, "messages", chatid);
        const UserdocSnap = await getDoc(UserdocRef);

        console.log(menteeid)
        if (UserdocSnap.exists()) {
            console.log("chat exists")
            navigate("/dashboard/chat")


        } else {
            setAnimate(true)


            const chatid = userid + "chat" + menteeid;

            console.log("chatid is ", chatid)
            await setDoc(doc(db, "messages", chatid), {
                createdat: Timestamp.fromDate(new Date()),
                mentor: username,
                student: menteename,
                mentee_id: menteeid,
                mentor_id: userid,
                sendat:Timestamp.fromDate(new Date()),
            
            });

            console.log("chat created")
            navigate("/dashboard/chat")

        }


        console.log("chatid is ", chatid)

    }

    useEffect(() => {
        menteeList();

    }, [])

    const [queries, setquery] = useState("")

    return (
        <div className='MenteeList'>
            <h1 style={{ fontFamily: "Manrope", fontSize: "25px", marginTop: "30px" }}>Mentee list </h1>
            <span style={{ fontFamily: "Manrope", fontSize: "18px" }}>All your mentee list here ! Assign Tasks to your Mentees !</span>
            {task === false ?
                <h1 style={{ fontFamily: "Manrope", fontSize: "25px", marginTop: "30px" }}>{AllMentee.length}</h1>
                : null}

            <div className="search_mentee">
                <img src={search} alt="" style={{ position: "absolute", left: "25px" }}/>
                <input type="text" name="" id="" placeholder='Search' onChange={(e)=>setquery(e.target.value)}/>
            </div>

            <div className="assigned-task-tab">
                <table className='task-table'>
                    <tr className='table-head'>
                        <th>SNo.</th>
                        <th>Mentee name </th>
                        <th>Branch </th>
                        <th>No. of days </th>
                        <th>Mentor Alloted </th>
                        <th>Actions </th>
                    </tr>

                    {AllMentee.filter((m)=>m.name.toLowerCase().includes(queries.toLowerCase())).map((m,index)=>{
                        return <>
                        
                        <tr>
                        <td>{index+1}. </td>
                        <td>{m.name} </td>
                        <td>{m.preparing_for}</td>
                        <td>{m.subscription_days} </td>
                        <td>{m.mentor_name} </td>

                        <td><div className="mentees_btn">
                                    <button onClick={() =>createChat(m.id,m.name)}>Chat</button>
                                    {type === "mentor" ? <button><AssignTask mentee_id={m.id} menteeName={m.name} preparing_for={m.preparing_for}/></button> : null}
                                    <button onClick={() => navigate(`/dashboard/profile/mentee/${m.id}`)}>Profile</button>
                                </div></td>
                    </tr>
                        </>
                    })}



                </table>

            </div>



{Animate === true ? <>
        <div style={{position:"fixed",top:"0",left:"0",width:'100%',height:"100%",background:"rgb(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}} >
                            <div style={{width:"70%",height:"70%",background:"White",borderRadius:"4px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center'}}>
                                <img src={connect} alt="" style={{width:"120px",marginTop:"15px"}} />
                            <h2 style={{fontFamily:"Manrope",fontSize:"22px"}}>Creating chat , please wait...</h2>
                            <p style={{fontSize:"18px",fontFamily:"Manrope",marginTop:"-10px",color:'red'}}>Do not refresh the page !</p>
                            </div>
                        </div>
       </> : null} 


        </div>
    )
}

export default Mentees