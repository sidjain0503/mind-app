import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../../../../mindapp/firebase';
import dashboarduserill from '../img/dashboard-user-ill (1).png'
import profile from '../img/profile.png'
import notes from '../img/notes.png'
import click from '../img/click.png'
import click1 from '../img/click1.png'
import tasks from '../img/editask.png'
import { useNavigate } from 'react-router-dom';
import taskimg from '../img/task.png'
import done from '../img/done.png'
import Broadcast from '../../../Broadcast/Broadcast';
import AddUser from '../../../AddUser/AddUser';
import Transaction from '../../../../Admin/Transaction/Transaction';
import AllUsers from '../../../../Admin/AllUsers/AllUsers';
import AllMentors from '../../../../Admin/Allmentors/AllMentors';

function Admin({ userdata }) {

    const navigate = useNavigate();
    const [Allmentee, setAllmentee] = useState([])
    const [Allmentor, setAllmentor] = useState([])
    const [menteeToday, setMenteeToday] = useState([]) //State of the mentees all time  
    const [showmentee, setshowmentee] = useState(false)
    const [searchquery, setsearchquery] = useState("Search Mentor")
    const [searchid, setsearchid] = useState("")


    const menteeListToday = async (mentor) => {

        //gives the mentee list where the logged in user is mentor and is alloted today ! 
        console.log(mentor)

        const q = query(collection(db, "User"), where("mentor_id", "==", mentor));

        onSnapshot(q, (querySnapshot) => {
            const todaymentee = []
            querySnapshot.forEach(element => {
                console.log("Menteelist=>", element.data())
                todaymentee.push(element.data())
            })
            setMenteeToday(todaymentee)
            console.log(menteeToday)
        });

        setshowmentee(true)


    };
    const [menteeCount, setmenteeCount] = useState([])


    const Allmenteedata = async () => {
        const q = query(collection(db, "User"), where("type", "==", "student"), orderBy("mentor_alloted", "asc"));


        onSnapshot(q, (querySnapshot) => {

            const menteeItem = [];

            querySnapshot.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const menteeid = { id: element.id }
                menteeItem.push({ ...element.data(), ...menteeid })
            })
            setAllmentee(menteeItem)
                ;
        })

    }


    const Allmentordata = async () => {
        const q = query(collection(db, "Mentors"), where("type", "==", "mentor"));

        onSnapshot(q, (querySnapshot) => {
            const menteeItem = [];

            querySnapshot.forEach(element => {
                // console.log("MenteelistAlltime =>", element.data())
                const menteeid = { id: element.id }
                menteeItem.push({ ...element.data(), ...menteeid })
            })
            setAllmentor(menteeItem)
        })


    }



    const [newMentee, setnewMentee] = useState([])

    const Newmentee = async () => {
        const q = query(collection(db, "User"), where("mentor_alloted", "==", false), where("mentor_id", "==", ""));
        onSnapshot(q, (querySnapshot) => {
            const item = []
            querySnapshot.forEach((doc) => {

                console.log(doc.data())
                const menteeid = { id: doc.id }
                item.push({ ...doc.data(), ...menteeid })
                // const newArray = new Array().fills(bi.data());
                // console.log(newArray)
            })
            setnewMentee(item);

        })


        // console.log("mentee",mentee)

    }

    useEffect(() => {
        menteeListToday();
        Allmentordata();
        Allmenteedata();
        Newmentee();
    }, [])

    const password = localStorage.getItem("password")
    return (
        <div>
            {userdata.map((u) => {
                return <>{u.type === "admin" && u.password === password ? <>

                    {newMentee.length > 0 ? <>

                    <div  className='alert_mentee' style={{textAlign:"center",margin:"20px auto",border:"1px solid #C3EDD5",padding:"2%",display:"flex",justifyContent:'center',alignItems:"center",width:"90%",borderRadius:"6px"}}>
                    <strong style={{fontFamily:"Manrope",color:" #46d985"}}>
                        New Mentee joined!
                    </strong>
                    <button style={{padding:"10px",background:" #C3EDD5",color:"#46d985",borderRadius:"6px",border:'none',marginLeft:"20px"}} onClick={()=>navigate("/dashboard/AssignMentor")} >See All</button>
                    </div>
                    </> : null}


                    <div className="dashboard_tab_top">

                        <div className="wel_user">
                            <div className="wel_u_desc">
                                <h1 id='name-head'>Hey! {userdata.map((uname) => <>{uname.name}</>)}</h1>
                                <p id='name-para'>Hope you are doing good. Your Mentees are looking for you as a role model, Hope that is truly inspiring</p>
                            </div>
                            <img src={dashboarduserill} alt="" />
                        </div>
                        <div className="task_num">
                            <div className="tasks_ass">
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                                    <img className='admintask' src={taskimg} alt="" style={{ width: "65px", height: "65px" }} />
                                    <img className='adminbtn' src={click1} alt="" style={{ width: "35px", height: "35px", cursor: "pointer" }} onClick={() => navigate("/dashboard/Mymentees")} />

                                </div>
                                <div className="show_num">
                                    <strong>{Allmentee.length}</strong>
                                    <span style={{ width: "85px" }}>All Mentees List</span>
                                </div>
                            </div>
                            <div className="tasks_d">
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                                    <img className='admintask' src={done} alt="" style={{ width: "65px", height: "65px" }} />
                                    <img className='adminbtn' src={click} alt="" style={{ width: "35px", height: "35px", cursor: "pointer" }} onClick={() => navigate("/dashboard/allMentors")} />

                                </div>
                                <div className="show_num">
                                    <strong>{Allmentor.length}</strong>
                                    <span style={{ width: "85px" }}>All Mentors List</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='quickActions'>
                        <h1>Quick Actions</h1>
                        <div className="quick_actions">
                            <div className="actions" id="profile">
                                <img src={profile} alt="" />
                                <div className="actions_desc" >
                                    <AddUser Allmentor={Allmentor} />
                                </div>
                            </div>
                            <div className="actions" id='actions'>
                                <img src={notes} alt="" />
                                <div className="actions_desc">
                                    <Broadcast />
                                </div>

                            </div>
                            <div className="actions" id='tasks' >
                                <img src={tasks} alt="" />
                                <div className="actions_desc">
                                    <Transaction home={true} />



                                </div>
                            </div>
                        </div>
                    </div>
                    {newMentee.length > 0 ? <>
                        <h1 style={{ fontFamily: "Manrope", fontSize: "20px" }}>New Mentee </h1>
                        <div className="allmentee_container">
                            {newMentee.slice(0, 2).map((mdata) => {
                                return <>
                                    <div className="allotment">
                                        <strong style={{ fontFamily: "Manrope" }} > {mdata.name} </strong>
                                        <span style={{ fontFamily: "Manrope" }} >{mdata.preparing_for} aspirant</span>
                                        <button style={{ background: "#263238", borderRadius: "4px", color: "#ffff", fontFamily: "Manrope", border: "none", padding: "3%", margin: "1%", cursor: "pointer" }} > <AllMentors mentee_id={mdata.id} menteename={mdata.name} /></button>
                                    </div>
                                </>
                            })}
                        </div>
                    </> : null}

                    <h1 style={{ fontFamily: "Manrope", fontSize: "20px" }}>Mentors impact at a glance</h1>
                    <span style={{ fontFamily: "Manrope", fontSize: "16px" }}>Sarch mentors mentoring activity for this month and track your all-time mentoring stats.</span>

                    <input type="text" placeholder='Search' style={{ borderRadius: "6px", border: "1px solid rgba(0, 0, 0, 0.08)", width: "60%", display: "inline-block", padding: "1%", margin: "10px 0" }} value={searchquery.toLowerCase()} onChange={(e) => setsearchquery(e.target.value)} onClick={() => { setsearchquery("") }} />

                    <div className="searchlist" style={{ position: "relative", left: '5px' }}>
                        <ul style={{ padding: "0px", margin: "-10px" }}>
                            {Allmentor.filter((mentee) => mentee.name.toLowerCase().includes(searchquery)).slice(0, 2).map((mentee) => {
                                return <>
                                    <li onClick={() => { setsearchquery(mentee.name); setsearchid(mentee.id); }} > {mentee.name}
                                    </li>
                                </>
                            })}
                        </ul>
                    </div>
                    <div className="impact">
                        <div className="impact_stats">
                            <div className="stats" ><strong id='one_o_one'>{Allmentor.filter((mentor) => mentor.id == searchid).map((m) => m.total_impact_points)}</strong> <div className="m_t_mon"><strong>Impact points </strong><span>This month : {Allmentor.filter((mentor) => mentor.id == searchid).map((m) => m.impact_points)}</span></div></div>
                            <div className="stats"><strong id='mentee'>{Allmentor.filter((mentor) => mentor.id == searchid).map((m) => m.mentee_count)}</strong> <div className="m_t_mon"><strong>Mentee alloted </strong> </div></div>
                            <div className="stats"><strong id='working_days'>{Allmentor.filter((mentor) => mentor.id == searchid).map((m) => m.working_days)}</strong> <div className="m_t_mon"><strong>working days </strong></div></div>
                            <div className="stats"><strong id='review'>0</strong> <div className="m_t_mon"><strong>Reviews</strong> </div></div>
                        </div>
                    </div>
                    <br /><br />
                </> : null}</>
            })}





        </div>
    )
}

export default Admin