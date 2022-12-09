import React, { useEffect, useState } from 'react'
import './Mentors.css'
import { collection, doc, getDoc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from '../mindapp/firebase';
import { toast } from 'react-toastify';
import connect from '../Components/Navbar/DashboardTab/img/connect.png'
import { useNavigate } from 'react-router-dom';
import Pagination from '../Components/Pagination/Pagination';
import Transaction from '../Admin/Transaction/Transaction';
import chatimg from '../Components/Navbar/img/chat.png'
import profileimg from '../Components/Navbar/img/user.png'
import list from './img/share.png'
import Menteecount from './Menteecount';

function Mentors({ task }) {
    const type = localStorage.getItem("type")
    const [AllMentors, setAllMentors] = useState([])
    const [loader, setloader] = useState(false)
    const [Animate, setAnimate] = useState(false)
    const navigate = useNavigate();
    const MentorList = async () => {

        //gives the mentee list where the logged in user is mentor and is alloted ! 

        const q = query(collection(db, "Mentors"), where("type", "==", "mentor"));
        const querySnapshot = await getDocs(q);


        const menteeItem = [];

        querySnapshot.forEach(element => {
            // console.log("MenteelistAlltime =>", element.data())
            const menteeid = { id: element.id }
            menteeItem.push({ ...element.data(), ...menteeid })
        })
        setAllMentors(menteeItem)
        setloader(true)
            ;
    };

    const userid = localStorage.getItem("user")
    const username = localStorage.getItem("username")
    const college = localStorage.getItem("college")

    const createChat = async (mentorid, mentorname, university) => {

        const chatid = userid + "chat" + mentorid;

        const UserdocRef = doc(db, "messages", chatid);
        const UserdocSnap = await getDoc(UserdocRef);

        console.log(mentorid)
        if (UserdocSnap.exists()) {
            console.log("chat exists")
            navigate("/dashboard/chat")


        } else {
            setAnimate(true)
            const chatid = userid + "chat" + mentorid;

            await setDoc(doc(db, "messages", chatid), {
                createdat: Timestamp.fromDate(new Date()),
                mentor1: username,
                mentor2: mentorname,
                mentor1_id: userid,
                mentor2_id: mentorid,
                mentor1_college: college,
                mentor2_college: university,
                sendat : Timestamp.fromDate(new Date())

            });
            console.log("chat created")
            navigate("/dashboard/chat")

        }


        console.log("chatid is ", chatid)

    }


    useEffect(() => {
        MentorList();

    }, [])

    const [queries, setquery] = useState("")

  
    return (
        <div className='MentorList'>
            <h1 style={{ fontFamily: "Manrope", fontSize: "25px", marginTop: "30px" }}>Mentors list </h1>
            <span style={{ fontFamily: "Manrope", fontSize: "18px" }}>All your mentors list is here !</span>
            {task === false ?
                <h1 style={{ fontFamily: "Manrope", fontSize: "25px", marginTop: "30px" }}>{AllMentors.length}</h1>
                : null}

            <div className="search_mentors">
                {/* <img src={search} alt="" style={{ position: "absolute", left: "25px" }} /> */}
                <input type="text" name="" id="" placeholder='Search' onChange={(e) => setquery(e.target.value)} />
            </div>

        
            <div className="assigned-task-tab">
                <table className='task-table'>
                    <tr className='table-head'>
                        <th>SNo.</th>
                        <th>Mentor Name </th>
                     {type === "admin" ? <th>Mentee Count </th> : null}   
                        <th>Actions </th>
                    </tr>

                    {AllMentors.filter((m) => m.name.toLowerCase().includes(queries.toLowerCase())).map((m, index) => {
                        return <>

                            <tr>
                                <td>{index + 1}. </td>
                                <td>{m.name} </td>
                                {type === "admin" ? <td style={{display:"flex",padding:"10%",alignItems:"center",justifyContent:"center"}}>{m.mentee_count} <Menteecount mentor_id={m.id} mentorname={m.name}/> </td> : null} 

                                <td> <div className="mentors_btn">
                                    {type === "mentor" ? <><img src='' onClick={() => createChat(m.id, m.name, m.university)}  style={{cursor:"pointer"}} /></> : null}
                                    {type === "admin" || type==="mentor" ? <><img src={chatimg} alt='no' onClick={() => createChat(m.id, m.name, m.university)}  style={{cursor:"pointer",filter:"grayscale(100%)"}} /></> : null}
                                    {type === "admin" ? <><Transaction home={false} all={true} transaction_data={m} id={m.id}   style={{cursor:"pointer",}} /></> : null}


                                    <img src={profileimg} onClick={() => navigate(`/dashboard/profile/mentor/${m.id}`)} style={{cursor:"pointer",filter:"grayscale(100%)"}}  />
                                </div></td>
                            </tr>
                        </>
                    })}



                </table>

            </div>



            {Animate === true ? <>
                <div style={{ position: "fixed", top: "0", left: "0", width: '100%', height: "100%", background: "rgb(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} >
                    <div style={{ minWidth: "50%",maxWidth:"80%", height: "50%", background: "White", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                        <img src={connect} alt="" style={{ width: "150px", marginTop: "15px" }} />
                        <h2 style={{ fontFamily: "Manrope", fontSize: "34px" }}>Creating chat . Please wait ...</h2>
                        <p style={{ fontSize: "18px", fontFamily: "Manrope", marginTop: "-10px", color: 'red' }}>Do not refresh the page !</p>
                    </div>
                </div>
            </> : null}
        </div>
    )
}

export default Mentors