import React, { useState } from 'react'
import Modal from 'react-modal';
// import './AssignTask.css'
import { collection, addDoc, Timestamp,where,getDocs, query, setDoc, doc } from "firebase/firestore";
import { db } from '../../mindapp/firebase';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { async } from '@firebase/util';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "40%",
        maxWidth:"60%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function Broadcast({allmentees}) {

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


    

    const mentor_id = localStorage.getItem('user')
    const name = localStorage.getItem("username")
    const navigate = useNavigate();
    const [Allmentee, setAllmentee] = useState([])

        const [Select , setSelect] = useState("mentee");

        const type = localStorage.getItem("type")
    const users =async ()=>{

    if(modalIsOpen === true ){


        if(Select === "mentee" && type ==="mentor"){

        const q = query(collection(db, "User"), where("mentor_id", "==", mentor_id));
        const querySnapshot =await getDocs(q);
       
        const menteeItem = [];
        querySnapshot.forEach(element => {
            menteeItem.push(element.id)
            
        })

        const allusers = {send_to : menteeItem}
        console.log(allusers)
        setbroadcastdata({...broadcastdata,...allusers})
        
     
    

    }

    if(Select === "mentee" && type ==="admin"){

        const q = query(collection(db, "User"), where("type", "==", "student"));
        const querySnapshot = await getDocs(q);


        const menteeItem = [];
      querySnapshot.forEach(element => {
            menteeItem.push(element.id)
        })

        const allusers = {send_to : menteeItem}
        console.log(allusers)

        setbroadcastdata({...broadcastdata,...allusers})
    

    }

    if(Select === "mentor"){

        const q = query(collection(db, "Mentors"), where("type", "==", "mentor"));
        const querySnapshot = await getDocs(q);

        const menteeItem = [];
        querySnapshot.forEach(element => {
            // console.log("Mentors=>", element.data())
            menteeItem.push(element.id)
        })

        const allusers = {send_to : menteeItem}
       
        console.log("mentors",allusers)
        
        setbroadcastdata({...broadcastdata,...allusers})

    }

}
    }
   
    const INITIAL_STATE = {
        send_to: [],
        Broadcast_text:"",
        Title:"",
        sendat: Timestamp.fromDate(new Date()),
    };

    const [broadcastdata , setbroadcastdata] = useState(INITIAL_STATE);


            const handledata = (e)=>{
                const name = e.target.name;
                const value = e.target.value;
              
                setbroadcastdata({ ...broadcastdata, [name]: value})
            }

            users();

            const createBroadcast=async(e)=>{
                e.preventDefault();



                console.log("broadcast data :: ",broadcastdata)
                const docRef = await addDoc(collection(db, "Broadcast"), {
                   ...broadcastdata,
                   type:Select,
                   sender:name
                  });

                  console.log("Document written with ID: ", docRef.id);
                  closeModal();
                  setSelect("mentee")
                  toast.success("Broadcast added")
            }
   
            

    return (
        <div id='assignTask'>
            <button className='task_btn' onClick={openModal}>
                <strong style={{ color: "#59B08B" }}>Broadcast </strong>
                <span style={{ color: "#59B08B" }}>Send Note To  Everyone At One. </span>
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

                </div>
        
                    <h2 style={{fontFamily:"manrope",fontSize:"20px"}}> Create a post</h2>        

                <form className='task-form' >
                    <div className='modal-form' style={{height:"max-content"}}>
                   
                        <div className="modal-input">
                            <label htmlFor="assigned">Share to  </label>
                            <select name="send_to" id="" style={{fontSize:"16px",background:"rgb(0,0,0,0.04)",borderRadius:"6px",width:"95%",border:"none",padding:"1%"}}  onChange={(e)=>{setSelect(e.target.value)}}>
                            <option value="mentee">All mentees</option>
                            <option value="mentor">All mentors</option>
                            </select>
                        </div>
                        <div className="modal-input">
                            <label htmlFor="assigned">Share more about your post  </label>
                            <textarea name="Broadcast_text" className='sub-input' placeholder='Enter text here' id="" cols="30" rows="10" onChange={handledata}></textarea>
                        </div>
                       
                        {Allmentee.map((m)=>m)}
                        <div>
                        <button style={{background:"#263238",borderRadius:"4px",padding:"2% 3%",color:"#ffff",fontFamily:"manrope",float:"right",width:"30%"}} onClick={createBroadcast} >Share</button>
                        </div>

                    </div>
                   
                </form>

            </Modal>

        </div >
    )
}

export default Broadcast