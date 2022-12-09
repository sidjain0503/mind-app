import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../mindapp/firebase';
import EditAbout from './EditModals/EditAbout';
import jee from './Jee.png'
import './profile.css'
import mentorimg from '../../Components/Navbar/DashboardTab/img/mentorprofile.png'
import menteeimg from '../../Components/Navbar/DashboardTab/img/studentprofile.png'
import Transaction from '../../Admin/Transaction/Transaction';
import TerminateMentor from '../../Admin/TerminateMentor/TerminateMentor';

function Profile() {

    const [user, setUser] = useState([])

    const userid = localStorage.getItem('user')
    const type = localStorage.getItem("type")

    const getQuery = async () => {

        console.log(userid)
        if(type ==="student"){

        
        const docRef = doc(db, "User", userid);

        onSnapshot(docRef,(docSnap)=>{
            const item = []
            //    console.log("user",item)
            item.push(docSnap.data())
            setUser(item)
        })

       


       
    } 

    if(type ==="mentor" || type === "admin"){

        
        const docRef = doc(db, "Mentors", userid);

        onSnapshot(docRef,(docSnap)=>{
            const item = []
               console.log("user",item)
            item.push(docSnap.data())
            setUser(item)
        })

      
    } 

}


    useEffect(() => {
        getQuery();

    }, [])

    // const timestamp = user.timestamp;
    // const date = new Date(timestamp.seconds * 1000 )


    return (
        <div className='Profile'>

            <div className="top-background">

            {type === "student" ? <img src={menteeimg} alt="" className="img_profile" style={{top:"45px"}} /> :
            
            <>
            
            {user.map((data) => {
                return<>
            {type === "mentor"|| type !=="student" || type==="admin" && data.img  ?  <img src={data.img} alt="" className="img_profile"  style={{objectFit:"cover"}} /> : <img src={mentorimg} alt="" className="img_profile"  style={{top:"50px"}} /> }    

                </>

            })} 
            </>

            }    
               
                {/* {id} */}
            </div>
            <div className="profile_info">
                <div className="profile_info_left">
                    <div className="u_name">
                        {user.map((data) => {
                            return <>
                                <h1> {data.name}</h1>
                        {type === "student" ? <>
                                <span>{data.preparing_for} aspirant</span> </> : null}
                                {type === "mentor" ? <>
                                <span>Mentor</span> </> : null}
                            </>
                        })}
                    </div>

                  {type === "student" ? <>

                  <div >
                            <p style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>Mentor Name</p>
                            {user.map((data) => {
                                return <>
                                    <strong>{data.name}</strong>
                                </>
                            })}

                        </div>

                    <div className="profile_about">
                        <p style={{borderBottom:"1px solid rgba(0, 0, 0, 0.1)"}}>About</p>
                        {user.map((data) => {
                            return <>
                                <p style={{ height: "150px" }}>{data.about}</p>
                            </>
                        })}

                    </div>
                  </> : null}
                  {type === "mentor" || type==="admin" ? <>
                    <div className="profile_about">
                        <p style={{borderBottom:"1px solid rgba(0, 0, 0, 0.1)"}}>Message to students</p>
                        {user.map((data) => {
                            return <>
                                <p style={{ height: "150px" }}>{data.message}</p>
                            </>
                        })}

                    </div>
                  </> : null}


{type === "student" ? <>
                    <div className="education_details">
                        <p style={{borderBottom:"1px solid rgba(0, 0, 0, 0.1)"}}>Educational Details </p>
                        {user.map((data) => {
                            return <>
                                <p style={{ height: "150px" }}>{data.education_details}</p>
                            </>
                        })}

                    </div>
                   
                    </> : null}

                    {type === "mentor" || type==="admin" ? <>
                    <div className="education_details">
                        <p style={{borderBottom:"1px solid rgba(0, 0, 0, 0.1)"}}>College and experience </p>
                        {user.map((data) => {
                            return <>
                                <p style={{ height: "150px" }}>{data.college_experience}</p>
                            </>
                        })}

                    </div>
                   
                    </> : null}


                    <div className="fluency_details">
                        <p style={{borderBottom:"1px solid rgba(0, 0, 0, 0.1)"}}>Fluency </p>
                        {user.map((data) => {
                            return <>
                                <p>{data.fluency}</p>
                            </>
                        })}
                    </div>
                </div>
                <div className="profile_info_right">
                    <div className="edit">
                        {user.map((data) => {
                            return <>
                            {type === "student" ? <>
                                <EditAbout about={data.about}
                                    goals={data.goal}
                                    fluency={data.fluency}
                                    education_details={data.education_details}

                                />
                            </> : null}

                            {type === "mentor" || type==="admin" ? <>
                                <EditAbout about={data.message}
                                    goals={data.college_experience}
                                    fluency={data.fluency}
                                    education_details={data.achievements}

                                />
                            </> : null}

                            </>
                        })}

                    </div>
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
                        <div className="join_date">
                            <span>Joining date</span>
                            {/* {date} */}
                            {user.map((data) => {
                                return <>
                                    <span> {new Date(data.timestamp.seconds * 1000).toLocaleDateString("en-US")}</span>
                                </>
                            })}
                        </div>
                        </> : null}

                    </div>


               {type ==="student" ? 
               <>    <div className="stream_profile">
                        <span>Your Stream</span>
                        {user.map((data) => {
                            return <>
                                {data.preparing_for === "Jee" || data.stream =="Jee" ? <>
                                    <div className="stream" style={{ display: "flex", alignItems: "center", justifyContent: 'start', borderRadius: "6px", border: "1px solid #1565D8", background: "#F5F9FF", boxShadow: "0px 4px 14px 1px rgba(0, 0, 0, 0.04)" }}>
                                        <img src={jee} alt="notfound" style={{ margin: "auto 20px" }} />
                                        <div>
                                            <strong style={{ display: "block" }}>Jee Mains</strong>
                                            <span>Joint entrance examination</span>
                                        </div>
                                    </div>
                                </> : null}
                                {data.preparing_for === "Neet" || data.stream =="Neet" ? <>
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
                    </>  : null}  
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

                    {type === "mentor" || type==="admin" ? <>
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
    )
}

export default Profile