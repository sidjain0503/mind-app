import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc,deleteDoc , getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from '../mindapp/firebase';
import { toast } from 'react-toastify'
import search from '../Components/Navbar/DashboardTab/img/search-normal.png'
import EditMentorTask from '../Components/Navbar/DashboardTab/Mentor/EditMentorTask';
import deletetask from '../Components/Navbar/DashboardTab/img/deletetask.png'
import { useNavigate } from 'react-router-dom';
import newtask from './img/newtask.png'
import broadcast from './img/broadcast.png'
import Broadcast from '../Components/Broadcast/Broadcast';
import '../Components/Navbar/DashboardTab/DashboardResp.css'
import Pagination from '../Components/Pagination/Pagination';

function AssignedTask() {
    const userid = localStorage.getItem('user') //user id of the user stored 
    const user = localStorage.getItem('type') //type of the user : student || mentor || admin 

    const [mentorTask, setMentorTask] = useState([])
    const AllTasks = async () => {
        if (user === "mentor") {

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)  ; 

            const getAllTask = query(collection(db, "Tasks"), where("mentor_id", "==", userid), orderBy("Assignedat", "desc"),where("Assignedat",">=",sevenDaysAgo));


                onSnapshot(getAllTask,(allTAskquerySnapshot)=>{
                        
                const allTask = [];
                allTAskquerySnapshot.forEach((doc) => {
                    console.log("All tasks are ", doc.data())
                    const tid = { id: doc.id };
                    allTask.push({ ...doc.data(), ...tid })
                });
                setMentorTask(allTask)
                })

        }

    }
    const navigate = useNavigate();

    useEffect(() => {
        AllTasks();

    }, [])


    const deleteTask =async (id) => {

        await deleteDoc(doc(db, "Tasks", id));
        toast.success("Task deleted")
    }

    const [queries, setquery] = useState("")

    const searchtask=(e)=>{
        
        setquery(e.target.value)
        console.log(queries)
        console.log()

    }


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;



    return (
        <div className='assigned-tasks' style={{ position: "absolute", top: "10%", left: "20%", display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "50px",zIndex:"-1" }}>

            <div style={{ display: "flex" }} id='action-container'>
                <div className="actions" style={{ background: "rgba(117, 98, 246, 0.2)", color: "#7562F6", margin: "5px" }} onClick={() => { navigate("/dashboard/assignTask") }}  >
                    <img src={newtask} alt="" />
                    <div className="actions_desc">
                        <strong>Assign a new task </strong>
                        <span>Give a task to your mentee.</span>
                    </div>
                </div>


                <div className="actions" style={{ background: "rgba(89, 176, 139, 0.2)", color: "#59B08B", margin: "5px" }} >
                    <img src={broadcast} alt="" />
                    <div className="actions_desc">
                        <Broadcast />
                    </div>
                </div>
            </div>


            <div style={{ display: "flex", width: "98%", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: "20px", fontFamily: "Manrope" }}>Assigned Task</h1>
                <img src={search} alt="" style={{ position: "relative", left: "35%" }} />
                <input type="text" name="" id="" placeholder='Search task title/mentee name' style={{ padding: "1%", border: "1px solid rgba(0, 0, 0, 0.3)", borderRadius: "6px", paddingLeft: "35px", fontWeight: "400",width:"19%" }} onChange={searchtask} />

            </div>

            <div className="assigned-task-tab">
                <table className='task-table'>
                    <tr className='table-head'>
                        <th>Task Title </th>
                        <th>Assigned to </th>
                        <th>Actions</th>
                    </tr>

                    {mentorTask.filter((mtask)=>
                    mtask.Title.toLowerCase().includes(queries) || mtask.subject.toLowerCase().includes(queries) 
                     || mtask.menteeName.toLowerCase().includes(queries)).slice(firstPostIndex, lastPostIndex).map((mTask) => {
                        return <>
                            <tr>

                                <td>{mTask.Title}</td>
                                <td>{mTask.menteeName} </td>
                                <td className='actions_img'>
                                    <div className="svg">
                                        <EditMentorTask title={mTask.Title} task={mTask.Task} id={mTask.id} />
                                    </div>
                                    <img id={mTask.id} src={deletetask} alt="" onClick={() => deleteTask(mTask.id)} />
                                </td>
                            </tr>
                        </>
                    })}
                </table>

            </div>


            <Pagination
             totalPosts={mentorTask.length}
             postsPerPage={postsPerPage}
             setCurrentPage={setCurrentPage}
             currentPage={currentPage}
            />


        </div>
    )
}

export default AssignedTask