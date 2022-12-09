import React, { useState } from 'react'
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from '../../mindapp/firebase';
import { useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import '../../Components/Navbar/DashboardTab/DashboardResp.css'

function CheckTask() {

    const userid = localStorage.getItem('user') //user id of the user stored 

    const [userdata, setUsers] = useState([]);

    const LoginUser = async () => {

        const UserdocRef = doc(db, "User", userid);
        const UserdocSnap = await getDoc(UserdocRef);

        const item = []
        if (UserdocSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            item.push(UserdocSnap.data())
            setUsers(item)
        } else {
            console.log("some error occured ");
        }
    }



    const [task, setTask] = useState([]);
    const [loader, setloader] = useState(false)

    const getTask = async () => {

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)  ; 
        const getAllTask = query(collection(db, "Tasks"), orderBy("Assignedat", "asc"),orderBy("status", "asc"), where("mentee_id", "==", userid),where("Assignedat",">=",sevenDaysAgo));

        const allTAskquerySnapshot = await getDocs(getAllTask);
       

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
    const [subject, setsubject] = useState("")
    const showsubject = async (sub) => {

        setsubject(sub)

    }


    useEffect(() => {
        LoginUser();

        getTask();
    }, [])


    const [coinsData, setCoinsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='checkTasks' style={{ position: "absolute", top: "10%", left: "20%", height: "90%", overflowY: "scroll", width: "80%", zIndex: "-1" }}>
            <div className="subject-container">
            {userdata.map((uname) => <>{uname.preparing_for === "Jee"? <><div className="sub" onClick={() => showsubject("Mathematics")}>Mathematics</div></>:null }</>)}
            {userdata.map((uname) => <>{uname.preparing_for === "Neet"? <><div className="sub" onClick={() => showsubject("Biology")}>Biology</div></>:null }</>)}
                <div className="sub" onClick={() => showsubject("Physics")}>Physics</div>
                <div className="sub" onClick={() => showsubject("Chemistry")}>Chemistry</div>
                <div className="sub" onClick={() => showsubject("")}>All</div>

            </div>



            <div className='checktasks-container' style={{ display: "flex", flexWrap: "wrap", width: "90%", margin: "auto", marginTop: "30px", height: "55vh" }}>

                {loader
                    ? <>
                        {task.slice(firstPostIndex, lastPostIndex).filter((task) => task.subject.includes(subject)).map((t) => {
                            return <>
                                <div className='task_assigned' style={{ width: "300px", margin: "5px" }} >
                                    <div className="task_desc_panel">
                                        <span style={{ width: "max-content", padding: "2%", borderRadius: "6px", color: "#D58D49", background: "rgba(213, 141, 73, 0.2)" }}>{t.subject}</span>
                                        <strong style={{ fontFamily: "Manrope", marginTop: "5px" }}>{t.Title}</strong>
                                        <div id='task-text' style={{ color: "rgba(0, 0, 0, 0.5)", marginTop: "10px" }}> {t.Task.slice(0, 90)}...</div>
                                    </div>

                                </div>
                            </>
                        })}
                    </> : <>
                    <h1 style={{ fontFamily: "Manrope", textAlign: "center", marginTop: "5%", marginLeft: "5%",fontSize:"28px" }}>No Task Assigned ! </h1>
                    </>
                }



            </div>

            <Pagination
                totalPosts={task.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />


        </div>
    )
}

export default CheckTask