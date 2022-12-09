import React, { useEffect, useState } from 'react'
import './DashboardTab.css'
import './DashboardResp.css'
import dashboarduserill from './img/dashboard-user-ill (1).png'
import search from './img/search-normal.png'
import notes from './img/notes.png'
import tasks from './img/tasks.png'
import profile from './img/profile.png'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from '../../../mindapp/firebase';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AssignTask from '../../AssignTask/AssignTask'
import editask from './img/editask.png'
import deletetask from './img/deletetask.png'
import { async } from '@firebase/util'
import { indexedDBLocalPersistence } from 'firebase/auth'
import EditAbout from '../../Profile/EditModals/EditAbout'
import EditMentorTask from './Mentor/EditMentorTask'
import Newmenteemodal from '../../../Mentees/Newmenteemodal'
import Mentor from './DashboardUser/Mentor'
import Student from './DashboardUser/Student'
import Admin from './DashboardUser/Admin'
import { ProgressBar } from 'react-loader-spinner'



function DashboardTab() {

    // setting user   
    const [users, setUsers] = useState([]) //State of the user logged in 

    const [loader, setloader] = useState(false)

    const userid = localStorage.getItem('user') //user id of the user stored 
    const user = localStorage.getItem('type') //type of the user : student || mentor || admin 




    const LoginUser = async () => {

        if (user === "admin" || user === "mentor") {
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
        if (user === "student") {
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
        //gets the logged in user using localstorage userid 

    }

    useEffect(() => {
        LoginUser();
    }, [loader])

    return (
        <>
            {users.length > 0 ?

                <div className='dashboard-tab' id='dashboard-tab'>

                    {user == "admin" ? <> <Admin userdata={users} /></> : null}
                    {user == "mentor" ? <> <Mentor userdata={users} /> </> : null}
                    {user == "student" ? <>  <Student userdata={users} /> </> : null}

                </div>
                : <div style={{ fontFamily: "Manrope", textAlign: "center", fontSize: "1.2em", height: '100vh', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <ProgressBar
                        height="80"
                        width="80"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor='#F4442E'
                        barColor='#51E5FF'
                    />
                    Please wait...
                </div>}
        </>



    )
}

export default DashboardTab