import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where, writeBatch } from "firebase/firestore";
import { db } from '../../../../mindapp/firebase';
import { toast } from 'react-toastify'
import dashboarduserill from '../img/dashboard-user-ill (1).png'
import profile from '../img/profile.png'
import notes from '../img/notes.png'
import tasks from '../img/editask.png'
import taskimg from '../img/task.png'
import done from '../img/done.png'

function Student() {
    const userid = localStorage.getItem('user') //user id of the user stored 
    const user = localStorage.getItem('type') //type of the user : student || mentor || admin 

    const [task, setTask] = useState([]);
    const [doneTask, setDoneTask] = useState([])
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
            toast.error("Unable to login user ! Some error occured")
            console.log("some error occured ");
        }
    }



    const getTask = async () => {

        //gets the task which has user id == localstorge id 
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const getAllTask = query(collection(db, "Tasks"), orderBy("Assignedat", "asc"), orderBy("status", "asc"), where("mentee_id", "==", userid), where("Assignedat", ">=", sevenDaysAgo));


        //gives multiple objects 
        onSnapshot(getAllTask, (allTAskquerySnapshot) => {
            const Taskinfo = [];

            allTAskquerySnapshot.forEach((doc) => {
                const tid = { id: doc.id };
                Taskinfo.push({ ...doc.data(), ...tid });

            });
            setTask(Taskinfo);
        })



        const getdoneTask = query(collection(db, "Tasks"), where("mentee_id", "==", userid), where("status", "==", true));


        onSnapshot(getdoneTask, (doneTAskquerySnapshot) => {
            const dtaskdata = []
            doneTAskquerySnapshot.forEach((dtask) => {
                const id = { id: dtask.id }
                dtaskdata.push({ ...dtask.data(), ...id })
            })
            setDoneTask(dtaskdata)
        })



    }

    const [subject, setsubject] = useState("")

    const showsubject = async (sub) => {
        setsubject(sub)
    }

    const [checkedTask, setcheckTask] = useState([]);

    const handleOnChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if (checked == true) {
            setcheckTask([
                ...checkedTask, value
            ])
        }
        else {
            setcheckTask(checkedTask.filter((e) => (e !== value)))
        }

    };

    const handleStatus = async (e) => {
        e.preventDefault();
        const batch = writeBatch(db);
        checkedTask.forEach((d) => {
            console.log(d);
            const sfRef = doc(db, "Tasks", d);
            batch.update(sfRef, { "status": true });

        });

        await batch.commit();
        toast.success("Task Completed! ")
    }

    const percentage = Math.round(((doneTask.filter((task) => task.subject.includes(subject)).length) / (task.filter((task) => task.subject.includes(subject)).length)) * 100);
    const navigate = useNavigate();
    const [taskindex, setTaskIndex] = useState(0);

    useEffect(() => {
        LoginUser();
        getTask();

    }, [])


    return (
        <div>
            {userdata.map((uname) => {
                return <>{uname.subscription_days <= 5 ? <>
                    <div className="plan-expire-alert">
                        <span> Your plan is going to expire in {uname.subscription_days} days ! extend your plan now !</span> <button onClick={() => navigate("/dashboard/planDetails")} style={{ color: "white", fontWeight: "bold", padding: '1.5%', background: "red", border: "1px solid red", borderRadius: "6px", marginLeft: "20px", float: "right", fontFamily: "Manrope" }}>Extend Plan</button>
                    </div>
                </> : null}</>
            }
            )}

            <div className="dashboard_tab_top">
                <div className="wel_user">
                    <div className="wel_u_desc">
                        <h1 id='name-head'>Hey! {userdata.map((uname) => <>{uname.name}</>)}</h1>
                        <p id='name-para'>You’ve Completed {percentage}%  of your assigments this week! Keep it up and improve your progeress.</p>
                    </div>
                    <img src={dashboarduserill} alt="" />
                </div>
                <div className="task_num">
                    <div className="tasks_ass">
                        <img src={taskimg} alt="not found" style={{ width: "65px", height: "65px" }} />
                        <div className="show_num">
                            <strong>{task.filter((task) => task.subject.includes(subject)).length}</strong>
                            <span>Task Assigned

                            </span>
                        </div>
                    </div>
                    <div className="tasks_d">
                        <img src={done} alt="not found" style={{ width: "65px", height: "65px" }} />
                        <div className="show_num">
                            <strong>{doneTask.filter((task) => task.subject.includes(subject)).length}</strong>
                            <span>Task Completed</span>
                        </div>
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
                    <div className="actions" id='actions' onClick={() => { navigate("/dashboard/studyresources") }}>
                        <img src={notes} alt="" />
                        <div className="actions_desc">
                            <strong>Check Mentor Notes </strong>
                            <span>Insights From Mentors For You. </span>
                        </div>

                    </div>
                    <div className="actions" id='tasks' onClick={() => { navigate("/dashboard/checkTask") }} >
                        <img src={tasks} alt="" />
                        <div className="actions_desc">
                            <strong>Check Your Task </strong>
                            <span>Look At Your Tasks.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="subject-container">

                {userdata.map((uname) => <>{uname.preparing_for === "Jee" ? <><div className="sub" onClick={() => showsubject("Mathematics")}>Mathematics</div></> : null}</>)}
                {userdata.map((uname) => <>{uname.preparing_for === "Neet" ? <><div className="sub" onClick={() => showsubject("Biology")}>Biology</div></> : null}</>)}

                <div className="sub" onClick={() => showsubject("Physics")}>Physics</div>
                <div className="sub" onClick={() => showsubject("Chemistry")}>Chemistry</div>
                <div className="sub" onClick={() => showsubject("")}>All</div>

            </div>

            {task.length > 0 ? <>

                <div className="task_tab">
                    <div className="tasks_assigned_tab">
                        <h1>Task Assigned</h1>
                        <div >
                            {task.filter((task) => task.subject.includes(subject)).map((task, index) => {

                                return <>

                                    <div className='task_assigned' onClick={() => setTaskIndex(index)}
                                        style={{ cursor: "pointer" }}
                                    >


                                        <div className="task_desc_panel">
                                            <span style={{ width: "max-content", padding: "2%", borderRadius: "6px", color: "#D58D49", background: "rgba(213, 141, 73, 0.2)" }}>{task.subject}</span>
                                            <div style={{ color: "rgba(0, 0, 0, 0.5)", marginTop: "10px" }}> {task.Task.slice(0, 50)}.... </div>
                                        </div>


                                    </div>



                                </>

                            })}

                        </div>
                    </div>
                    <div className="tasks_details_tab">
                        <h1>Task Details</h1>
                        <div className='taskdetails'>
                            <h1>Task Title</h1>
                            <form action="" className='task_form' onSubmit={handleStatus}>

                                <div className="task_container">
                                    {task.filter((task) => task.subject.includes(subject)).map((task, index) => {

                                        return <>
                                                <span style={{ width: "max-content", padding: "2%", borderRadius: "6px", color: "#D58D49", background: "rgba(213, 141, 73, 0.2)" }}>{task.subject}</span>

                                        <div className='task'>


                                            {task.status == false ? <input
                                                type="checkbox"
                                                value={task.id}
                                                onChange={handleOnChange}
                                                style={{ cursor: "pointer" }}

                                            />
                                                : null}


                                            <label htmlFor='check' for className="task_desc">

                                                <strong>{task.Title}</strong>

                                                <br />
                                                <div style={{ marginTop: "10px" }}> {task.Task} </div>

                                            </label>

                                        </div>
                                        </>


                                    })[taskindex]}

                                </div>
                                <button id='a_help' onClick={() => { navigate("/dashboard/chat") }}>Ask for help</button>
                                <button type='submit'> Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </> : <>
                <h1 style={{ fontFamily: "Manrope", textAlign: "center", marginTop: "10%", marginLeft: "-10%" }}>No Task Assigned ! </h1></>}


        </div>
    )
}

export default Student