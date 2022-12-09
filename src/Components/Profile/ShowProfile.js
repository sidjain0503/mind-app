import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TerminateMentor from '../../Admin/TerminateMentor/TerminateMentor';
import Transaction from '../../Admin/Transaction/Transaction';
import { db } from '../../mindapp/firebase';
import EditAbout from './EditModals/EditAbout';
import jee from './Jee.png'
import './profile.css'
import mentorimg from '../../Components/Navbar/DashboardTab/img/mentorprofile.png'
import AddSubscription from '../Addsubscription/AddSubscription';
import { toast } from 'react-toastify';

function ShowProfile({ }) {

    const [user, setUser] = useState([])


    let { id, mtype } = useParams();

    const getQuery = async () => {

        if (mtype === "mentee") {
            const docRef = doc(db, "User", id);
            const docSnap = await getDoc(docRef);

            onSnapshot(docRef, (docSnap) => {
                const item = []

                item.push(docSnap.data())
                setUser(item)
                window.type = docSnap.data().type;
                console.log(user)


                if (window.type === null) {
                    navigate("/")
                }
            })



        }

        if (mtype === "mentor") {
            const docRef = doc(db, "Mentors", id);
            const docSnap = await getDoc(docRef);

            const item = []
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());

                //    console.log("user",item)
                item.push(docSnap.data())
                setUser(item)
                window.type = docSnap.data().type;
                console.log(user)
                if (window.type === null) {
                    navigate("/")
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }


        }




    }





    useEffect(() => {
        getQuery();
        // menteeList();

    }, [])


    // const timestamp = user.timestamp;
    // const date = new Date(timestamp.seconds * 1000 )

    const type = window.type;
    const userType = localStorage.getItem("type")
    const navigate = useNavigate();
    const [Animate, setAnimate] = useState(false)
    const Smentor = localStorage.getItem("mentorid")
    const mentee_id = localStorage.getItem("user")
    const menteename = localStorage.getItem("username");

    const createChat = async (mentorname) => {
        const chatid = Smentor + "chat" + mentee_id;

        const UserdocRef = doc(db, "messages", chatid);
        const UserdocSnap = await getDoc(UserdocRef);

        if (UserdocSnap.exists()) {
            console.log("chat exists")
            navigate("/dashboard/chat")


        } else {
            setAnimate(true)
            console.log("chatid is ", chatid)
            await setDoc(doc(db, "messages", chatid), {
                createdat: Timestamp.fromDate(new Date()),
                mentor: mentorname,
                student: menteename,
                mentee_id: mentee_id,
                mentor_id: Smentor,
                sendat: Timestamp.fromDate(new Date()),

            });

            navigate("/dashboard/chat");
            toast.success("Chat created !")

        }


    }





    return (
        <>
            <div className='Profile'>

                {/* {user.map((data)=>{
            return <> {data.name}</>
        })} */}

                <div className="top-background" style={{ height: "max-content", background: "#4D9DF8" }}>


                    {userType === "admin" || userType == "mentor" ? <>

                        {type === "mentor" ?
                            <>
                                {userType === "admin" ? <>
                                    <div className="profile_impact"  >
                                        <div className="impact_stats" style={{ marginLeft: "auto", width: "65%", padding: "4% 4% 0px 4%" }}>
                                            <div className="profile-stats" ><strong id='one_o_one'>{user.map(m => m.total_impact_points)}</strong> <div className="m_t_mon"><strong>Impact Points </strong> <span>This month :{user.map(m => m.impact_points)}</span></div></div>
                                            <div className="profile-stats"> <strong id='mentee'>{user.map(m => m.mentee_count)}</strong> <div className="m_t_mon"><strong>Mentee alloted </strong></div></div>
                                            <div className="profile-stats"><strong id='working_days'>{user.map(m => m.working_days)}</strong> <div className="m_t_mon"><strong>working days </strong></div></div>
                                            <div className="profile-stats"><strong id='review'>0</strong> <div className="m_t_mon"><strong>Reviews</strong> <span>This month : 0</span></div></div>
                                        </div>
                                        <div className="profile_btns" style={{ display: "flex", justifyContent: "end", paddingRight: "8%", marginTop: "20px" }}>
                                            <button style={{ padding: "1%", margin: "1%", color: "#4D9DF8", borderRadius: "4px", border: "1px solid #4D9DF8", background: "white" }} ><Transaction transaction_data={user[0]} id={id} /></button>
                                            <button style={{ padding: "1%", margin: "1%", color: "#4D9DF8", borderRadius: "4px", border: "1px solid #4D9DF8", background: "white" }} onClick={() => navigate("/dashboard/chat")} ><strong>Message</strong> </button>
                                            <button style={{ padding: "1%", margin: "1%", color: "#D00000", borderRadius: "4px", border: "1px solid #D00000", background: "white" }} > <TerminateMentor id={id} type={"mentor"} /></button>
                                        </div>
                                    </div>
                                </> : null}
                                {user.map((data) => {
                                    return <>
                                        {type === "mentor" && data.img ? <img src={data.img} alt="" className="img_profile" style={{ objectFit: "cover", top: "0% !important" }} /> : <img src={mentorimg} alt="" className="img_profile" style={{ top: "0% !important" }} />}

                                    </>

                                })}

                            </>
                            :
                            <div className="img_profile" style={{ top: "70px" }}></div>

                        }
                    </> : null}

                    {userType === "student" ? <>
                        {user.map((udata) => {
                            return <>
                                {udata.img ? <img src={udata.img} alt="" className="img_profile" style={{ objectFit: "cover", top: "45px" }} /> : <img src={mentorimg} alt="" className="img_profile" style={{ top: "40px" }} />}


                            </>
                        })}

                    </> : null}




                    {/* {id} */}
                </div>
                <div className="profile_info">
                    <div className="profile_info_left">
                        <div className="u_name">

                            {user.map((data) => {
                                return <>
                                    <h1> {data.name}</h1>
                                    {type === "student" ? <>
                                        <span>{data.preparing_for} aspirant</span> {userType === 'admin' ? <TerminateMentor id={id} type="mentee" mentorid={data.mentor_id}/> : null}  </> : null}

                                    {type === "mentor" ? <>
                                        <span>Mentor</span> </> : null}
                                </>
                            })}
                        </div>

                        {userType === "student" ? <>
                            {user.map((data) => {
                                return <button style={{ color: "white", background: "black", padding: '10px', borderRadius: "6px", width: "70px", fontFamily: "Manrope" }} onClick={() => { createChat(data.name) }} >Chat</button>
                            })}
                        </>
                            : null}

                        {type === "student" ? <>

                            <div >
                                <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>Mentor Name</p>
                                {user.map((data) => {
                                    return <>
                                        <strong>{data.mentor_name}</strong>

                                    </>
                                })}

                            </div>


                            <div className="profile_about">
                                <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>About</p>
                                {user.map((data) => {
                                    return <>
                                        <p style={{ height: "150px" }}>{data.about}</p>
                                    </>
                                })}

                            </div>

                        </> : null}
                        {type === "mentor" ? <>
                            <div className="profile_about">
                                <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>Message to students</p>
                                {user.map((data) => {
                                    return <>
                                        <p style={{ height: "150px" }}>{data.about}</p>
                                    </>
                                })}

                            </div>
                        </> : null}


                        {type === "student" ? <>
                            <div className="education_details">
                                <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>Educational Details </p>
                                {user.map((data) => {
                                    return <>
                                        <p style={{ height: "150px" }}>{data.education_details}</p>
                                    </>
                                })}

                            </div>

                        </> : null}


                        {type === "mentor" ? <>
                            <div className="education_details">
                                <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>College and experience </p>
                                {user.map((data) => {
                                    return <>
                                        <p style={{ height: "150px" }}>{data.college_experience}</p>
                                    </>
                                })}

                            </div>

                        </> : null}


                        <div className="fluency_details">
                            <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>Fluency </p>
                            {user.map((data) => {
                                return <>
                                    <p>{data.fluency}</p>
                                </>
                            })}
                        </div>
                    </div>
                    <div className="profile_info_right">


                        <div className="profile_info">
                            {type === "student" ? <>

                                <div className="contact_info">
                                    <span>Contact info</span>
                                    {user.map((data) => {
                                        return <>
                                            <span> {data.phone_number}</span>
                                        </>
                                    })}
                                </div>
                                <div className="contact_info">
                                    <span>No. of Days Left</span>
                                    {user.map((data) => {
                                        return <>
                                            <span> {data.subscription_days} </span>
                                        </>
                                    })}
                                </div>
                                <div className="contact_info">

                                    {user.map((data) => {
                                        return <>
                                            {userType === "admin" ? <AddSubscription id={id} subsdays={data.subscription_days} /> : null} </>

                                    })}
                                </div>

                            </> : null}
                            {type === "mentor" ? <>
                                <div className="join_date">
                                    <span>Joining date</span>
                                    {/* {date} */}
                                    {user.map((data) => {
                                        return <>
                                            <span> {new Date(data.join_date.seconds * 1000).toLocaleDateString("en-US")}</span>
                                        </>
                                    })}
                                </div>
                            </> : null}

                        </div>


                        {type === "student" ?
                            <>    <div className="stream_profile">
                                <span>Your Stream</span>
                                {user.map((data) => {
                                    return <>
                                        {data.preparing_for === "Jee" || data.stream == "Jee" ? <>
                                            <div className="stream" style={{ display: "flex", alignItems: "center", justifyContent: 'start', borderRadius: "6px", border: "1px solid #1565D8", background: "#F5F9FF", boxShadow: "0px 4px 14px 1px rgba(0, 0, 0, 0.04)" }}>
                                                <img src={jee} alt="notfound" style={{ margin: "auto 20px" }} />
                                                <div>
                                                    <strong style={{ display: "block" }}>Jee Mains</strong>
                                                    <span>Joint entrance examination</span>
                                                </div>
                                            </div>
                                        </> : null}
                                        {data.preparing_for === "Neet" || data.stream == "Neet" ? <>
                                            <div className="stream" style={{ display: "flex", alignItems: "center", justifyContent: 'start', borderRadius: "6px", border: "1px solid #1565D8", background: "#F5F9FF", boxShadow: "0px 4px 14px 1px rgba(0, 0, 0, 0.04)" }}>
                                                <img src={jee} alt="notfound" style={{ margin: "auto 20px" }} />
                                                <div>
                                                    <strong style={{ display: "block" }}>Neet</strong>
                                                    <span>Neet UG</span>
                                                </div>
                                            </div>
                                        </> : null}
                                    </>
                                })}

                            </div>
                            </> : null}
                        {type === "student" ? <>
                            <div className="goals_profile">
                                <span>Write down your goals for 2022</span>
                                <div className="goals">
                                    {user.map((data) => {
                                        return <>
                                            <p>{data.goal}</p>
                                        </>
                                    })}
                                </div>
                            </div>
                        </> : null}

                        {type === "mentor" ? <>
                            <div className="goals_profile">
                                <span>Achievements</span>
                                <div className="goals">
                                    {user.map((data) => {
                                        return <>
                                            <p>{data.achievements}</p>
                                        </>
                                    })}
                                </div>
                            </div>
                        </> : null}

                    </div>
                </div>

            </div>

            {
                Animate === true ? <>
                    <div style={{ position: "fixed", top: "0", left: "0", width: '100%', height: "100%", background: "rgb(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <div style={{ minWidth: "50%", maxWidth: "80%", height: "50%", background: "White", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                            <h2 style={{ fontFamily: "Manrope", fontSize: "34px", textAlign: 'center' }}>Creating chat . Please wait ...</h2>
                            <p style={{ fontSize: "18px", fontFamily: "Manrope", marginTop: "-10px", color: 'red' }}>Do not refresh the page !</p>
                        </div>
                    </div>
                </> : null
            }
        </>
    )
}

export default ShowProfile