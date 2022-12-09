import React, { useState } from 'react'
import Modal from 'react-modal';
// import './AssignTask.css'
import { toast } from 'react-toastify';
import {  useNavigate  } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { async } from '@firebase/util';
import { deleteDoc, doc, runTransaction, terminate } from 'firebase/firestore';
import { db } from '../../mindapp/firebase';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "35%",
        maxWidth:"45%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function TerminateMentor({id,type,mentorid}) {

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

    const navigate = useNavigate();

    const substractmenteecount = async () => {

        const sfDocRef = doc(db, "Mentors", mentorid);
        try {
            await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                throw "Document does not exist!";
              }
              
              const menteecount = sfDoc.data().mentee_count - 1 ;
              transaction.update(sfDocRef, { mentee_count: menteecount });
            });
        await deleteDoc(doc(db, "User", id));
        toast.success("Deleted succesfuly")
        console.log("Mentee count updated successfully committed!");

            window.location.reload();       
          } catch (e) {
            console.log("Transaction failed: ", e);
          }
  }

    const terminate =async()=>{
        // set mentor_id ="" and alloted = false to all their mentees 
        // delete chats
        //delete mentor
        if(type === "mentee"){
            substractmenteecount();
            toast.success("Deleted succesfuly")
        }
        if(type === "mentor"){
            await deleteDoc(doc(db, "Mentors", id));
            window.location.reload();       
            toast.success("Deleted succesfuly")
    
            }
           
    
      }
  

    return (
        <div id='assignTask'>
            <button className='task_btn' onClick={openModal}>
                <strong style={{ color: "red",fontSize:"14px",fontFamily:"Manrope",border:"1px solid red",padding:"10px" }}>Terminate  {type === "mentor" ? <>mentor</>: null} {type === "mentee" ? <>mentee</>: null} </strong>
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
        
                    <h2 style={{fontFamily:"manrope",fontSize:"20px"}}> Are you sure you want to Terminate this {type === "mentor" ? <>mentor</>: null} {type === "mentee" ? <>mentee</>: null}  ? </h2>        

                        <button onClick={()=>{terminate();closeModal();}} style={{padding:"2%",background:"red",color:"#ffff",fontFamily:"Manrope",fontSize:"16px",border:"none",borderRadius:"4px"}}>Terminate {type === "mentor" ? <>mentor</>: null} {type === "mentee" ? <>mentee</>: null} </button>           

            </Modal>

        </div >
    )
}

export default TerminateMentor