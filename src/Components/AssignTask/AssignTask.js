import React, { useState } from 'react'
import Modal from 'react-modal';
import './AssignTask.css'
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../../mindapp/firebase';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Calander from './Calander';
import calander from './calander.png'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "60%",
    miWidth: "45%",
    height: "70%",
    boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
    borderRadius: "8px"

  },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function AssignTask({ mentee_id, menteeName, preparing_for }) {

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal(e) {
    // references are now sync'd and can be accessed.
    e.preventDefault()
    console.log("modal open")
  }

  function closeModal() {
    setIsOpen(false);
  }

  const INITIAL_STATE = {
    Title: "",
    Assignedat: Timestamp.fromDate(new Date()),
    End_date: Timestamp.fromDate(new Date())
  };

  const mentor_id = localStorage.getItem('user')
  const navigate = useNavigate();
  const [Showsubject, setShowsubject] = useState(false)
  const [Tasks, setTasks] = useState(INITIAL_STATE)
  const { Title, Task, Assignedat, End_date } = Tasks;



  // Add a new document with a generated id. store tasks 

  const AddTask = async (e) => {
    e.preventDefault();
    console.log("clicked")
    // setTasks({...Tasks})
    console.log(Tasks)

    tasks.forEach(async (data) => {
      console.log(data.Subject, data.Task)
      const subject = data.Subject
      const Task = data.Task
      const docRef = await addDoc(collection(db, "Tasks"), { Title, Task, subject, mentee_id, mentor_id, menteeName, Assignedat, End_date, status: false });

      if (docRef.id) {
        console.log("Document written with ID: ", docRef.id);
      }

    })

    closeModal();
    toast.success("Task assigned sucessfully ")




  }




  const changeInput = (e) => {
    const { value, name } = e.target;
    setTasks({ ...Tasks, [name]: value });

  }

  const [subject, setSubject] = useState("")
  const [showinput, setShowinput] = useState(false)

  // const handlesubject = (subject) => {

  //   setSubject(subject);
  //   setShowinput(true)
  //   setTasks({ ...Tasks, "Subject": subject });
  // }

  const [showcalander, setshowcalander] = useState(false);

  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
    console.log(dateState)
    setTasks({ ...Tasks, "End_date": Timestamp.fromDate(new Date(dateState)) });
    setshowcalander(!showcalander)
    console.log(Tasks)
  }


  const [tasks, setTask] = useState([])
  const [taskstring, settaskstring] = useState("")

  const handlesubject = (subject) => {

    console.log("clickrfhjb")
    const t = {
      Subject: subject,
      Task: taskstring
    }
    if (tasks.length < 3) {
      setTask([t, ...tasks])

    } else {
      console.log("Cannot add more feilds")
    }

    console.log(tasks)
  }

  return (
    <div id='assignTask'>
      <button className='task_btn' onClick={openModal}>
        <span>Assign Task</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={closeModal} className='modal-close-btn'>✖</button>
        <div className='modal-top'>
          <strong>Assign New Task </strong>
          <span>Your task can be given individual or it could send through broadcast and will reach every mentee that you got alloted</span>
        </div>

        <form className='task-form' onSubmit={(e) => e.preventDefault()}>

          {showcalander == true ? <>
            <div >
              <Calendar
                style={{ zIndex: "100" }}
                value={dateState}
                onChange={changeDate}
              />
            </div>


          </> : null}
          <div className='modal-form'>



            <div className="modal-input">
              <label htmlFor="assigned">Assigned to {menteeName}</label>
              <label onClick={() => setshowcalander(!showcalander)} style={{ display: "flex", alignItems: "flex-end" }} > <img src={calander} /> End date</label>
              <input value={moment(dateState).format('MMMM Do YYYY')} disabled />
            </div>

            <div className="modal-input">
              <label htmlFor="assigned">Title </label>
              <input type="text" id="assigned" placeholder='Enter title for the assigned task' onChange={changeInput} name="Title" value={Title} />
            </div>



            <div className="subject-container" style={{ left: "0px" }} >


              <button onClick={(event) => { event.currentTarget.disabled = true; handlesubject("Physics") }}>Physics</button>
              <button onClick={(event) => { event.currentTarget.disabled = true; handlesubject("Chemistry") }}>Chemistry</button>
              {preparing_for === "Jee" ? <><button onClick={(event) => { event.currentTarget.disabled = true; handlesubject("Mathematics") }}>Mathematics</button></> : null}
              {preparing_for === "Neet" ? <> <button onClick={(event) => { event.currentTarget.disabled = true; handlesubject("Biology") }}>Biology</button></> : null}



            </div>


            <textarea id="" className='sub-input' onChange={(e) => {settaskstring(e.target.value);  } } onKeyPress={(e)=>{ if(e.key === 'Enter'  ){ console.log("enter key pressed"); handlesubject("Physics")}}} name="Task" placeholder='Enter task here and then select subject .' ></textarea>
          </div>

          <button onClick={AddTask} >Share</button>

        </form>

      </Modal>

    </div >
  )
}

export default AssignTask