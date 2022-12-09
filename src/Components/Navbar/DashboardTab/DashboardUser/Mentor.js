import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, Timestamp, where, } from "firebase/firestore";
import { db } from '../../../../mindapp/firebase';
import { toast } from 'react-toastify'
import dashboarduserill from '../img/dashboard-user-ill (1).png'
import profile from '../img/profile.png'
import notes from '../img/notes.png'
import tasks from '../img/editask.png'
import connect from '../img/connect.png'
import Newmenteemodal from '../../../../Mentees/Newmenteemodal';
import Broadcast from '../../../Broadcast/Broadcast';
import Barchart from '../../../charts/Barchart';
import AssignTask from '../../../AssignTask/AssignTask';


function Mentor({ userdata }) {
    const navigate = useNavigate();//navigate use to navigate to new page 

    const userid = localStorage.getItem('user') //user id of the user stored 
    const user = localStorage.getItem('type') //type of the user : student || mentor || admin 


    const [mentee, setAllMentee] = useState([]) //State of the mentees 
    const [menteeToday, setMenteeToday] = useState([]) //State of the mentees all time  
    const [newmenteealloted, setshowmentee] = useState(false);



    const menteeListToday = async () => {
        //gives the mentee list where the logged in user is mentor and is alloted today ! 
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    const oneDaysAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);


        const q = query(collection(db, "User"), where("mentor_id", "==", userid ), where("timestamp", ">=", oneDaysAgo),where("seen","==",false));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty == true) {
            console.log("no mentee found")
        } else {

            const todaymentee = []
            querySnapshot.forEach(element => {
                console.log("Menteelist=>", element.data())
                const id = {id:element.id}
                todaymentee.push({...element.data(),...id})
            });
            setMenteeToday(todaymentee)
            setshowmentee(true)
        }

    };


    const menteeList = async () => {

        //gives the mentee list where the logged in user is mentor and is alloted today ! 

        const q = query(collection(db, "User"), where("mentor_id", "==", userid));
        const querySnapshot = await getDocs(q);


        if (querySnapshot.empty == true) {
            if (user === "mentor") {
                toast.error("no mentee alloted today ")
            }

        }
        const menteeItem = [];
        querySnapshot.forEach(element => {
            menteeItem.push(element.data())
        })
        setAllMentee(menteeItem)
            ;

    };

    useEffect(() => {
        menteeList();
        menteeListToday();
    }, [])

        const [Animate, setAnimate] = useState(false);
        const username = localStorage.getItem("username")

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


    return (
        <div>

            <div className="dashboard_tab_top">
                <div className="wel_user">
                    <div className="wel_u_desc">
                        <h1 id='name-head'>Hey! {userdata.map((uname) => <>{uname.name}</>)}</h1>
                        <p id='name-para' >Hope you are doing good. Your Mentees are looking for you as a role model, Hope that is truly inspiring.</p>
                    </div>
                    <img src={dashboarduserill} alt="" />
                </div>
                <div className="revenue">
                    <div className="revenue_num">
                        <div>
                            <strong style={{ color: "#59B08B" }}>{userdata.map((uname) => <>{uname.impact_points}</>)}</strong>
                            <span style={{ fontWeight: "bold", fontFamily: "manrope", fontSize: "13px" }}>Impact Points</span>
                        </div>

                        <div>
                            <strong style={{ color: "#D98A19" }}>{userdata.map((uname) => <>{uname.total_impact_points}</>)}</strong>
                            <span style={{ fontWeight: "bold", fontFamily: "manrope", fontSize: "13px" }} >Total Impact Points</span>
                        </div>

                    </div>
                    <div className="revenue_graph" style={{ fontFamily: "Manrope" }}>
                        {/* collecting data ! graph will be introduced soon  */}
                        <Barchart />
                    </div>
                </div>
            </div>

            <div className='quickActions'>
                <h1>Quick Actions</h1>
                <div className="quick_actions">
                    <div className="actions" id="profile" onClick={() => { navigate("/dashboard/profile") }}>
                        <img src={profile} alt="" />
                        <div className="actions_desc">
                            <strong>View My Profile </strong>
                            <span>See Your Public Profile </span>
                        </div>
                    </div>
                    <div className="actions" id='actions'>

                        <img src={notes} alt="" />
                        <div className="actions_desc">
                            <Broadcast allmentees={mentee} />

                        </div>
                    </div>
                    <div className="actions" id='tasks' onClick={() => { navigate("/dashboard/assignedTask") }}>
                        <img src={tasks} alt="" />
                        <div className="actions_desc">
                            <strong>Assign Task  </strong>
                            <span>Quick Look On The Mentees Task </span>

                        </div>
                    </div>
                </div>

                <div className="mentor_impact">
                    <h1>My Impact At A Glance</h1>
                    <span>View your mentoring activity for this month and track your all-time mentoring stats.</span>
                    <div className="impact">
                        <div className="impact_stats">
                            <div className="stats" ><strong id='one_o_one' style={{ color: "#01A3A3" }}>{userdata.map((uname) => <>{uname.total_impact_points}</>)}</strong> <div className="m_t_mon"><strong>Impact Points </strong> <span>This month :{userdata.map((uname) => <>{uname.impact_points}</>)}</span></div></div>
                            <div className="stats"> <strong id='mentee' style={{ color: "#ED7F31" }}>{userdata.map((uname) => <>{uname.mentee_count}</>)}</strong> <div className="m_t_mon"><strong>Mentee Alloted </strong></div></div>
                            <div className="stats"><strong id='working_days' style={{ color: "#FF5A5E" }}>{userdata.map((uname) => <>{uname.working_days}</>)}</strong> <div className="m_t_mon"><strong>Working Days </strong></div></div>
                            <div className="stats"><strong id='review' style={{ color: "#038FDB" }}>0</strong> <div className="m_t_mon"><strong>Reviews</strong> </div></div>
                        </div>
                        <div className="impact_graph" style={{ display: "none" }}>
                            <div className="graph"></div>
                        </div>
                    </div>
                </div>
                {menteeToday.length > 0 ? <div className="mentee_allotment">
                    <h1>New Mentee alloted</h1>
                    <div className="allotment_container">
                        <div className="allotment">{menteeToday.map((mentee) => {
                            return <>
                                <h3 style={{margin:"0px"}}>{mentee.name} </h3>
                                <span style={{fontFamily:"Manrope"}}>{mentee.preparing_for} student</span>
                                <div style={{display:'flex',width:"100%",justifyContent:"center"}}>
                                <button style={{padding:"2%",background:"black",borderRadius:'6px',color:"white",marginRight:"10px"}} onClick={()=>{createChat(mentee.id,mentee.name)}}>Chat</button>
                                <button style={{padding:"2%",background:"black",borderRadius:'6px',color:"white"}}>  <AssignTask mentee_id={mentee.id} menteeName={mentee.name} preparing_for={mentee.preparing_for}/></button>
                                </div>
                                
                            </>

                        })}</div>

                    </div>
                </div> : null}
            </div>
            <div className="connect">
                <h1>Connect With Mentors</h1>
                <div className="connect_container" style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px" }}>

                    <div style={{ padding: "10px" }}>
                        <h2 style={{ fontFamily: "Manrope", fontSize: "20px" }}>Connect And Grow</h2>
                        <p style={{ fontFamily: "Manrope", fontSize: "14px", width: "80%" }}>Mentors can learn from other mentors too! Find a mentor, or wait for mentees to start reaching out. Your activity will appear here.</p>
                        <button style={{ padding: "2%", background: "black", color: "white", borderRadius: "6px" }} onClick={() => navigate('/dashboard/allMentors')} >Discover Mentors</button>
                    </div>
                    <img src={connect} alt="" />

                    {newmenteealloted == true ? <Newmenteemodal menteeList={menteeToday} /> : null}
                </div>
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

export default Mentor