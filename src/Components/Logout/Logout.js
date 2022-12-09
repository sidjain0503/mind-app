import React, { useState } from 'react'
import Modal from 'react-modal';
// import './AssignTask.css'
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
        minWidth: "25%",
        maxWidth:'70%',
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function Logout() {

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

    const logout =()=>{
        localStorage.clear();
        navigate("/")
    
      }
  

    return (
        <div id='assignTask'>
            <button className='task_btn' onClick={openModal}>
                <strong style={{ color: "red",fontSize:"16px",fontFamily:"Manrope" }}>Logout </strong>
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
        
                    <h2 style={{fontFamily:"manrope",fontSize:"20px"}}> Are you sure you want to logout? </h2>        

                        <button onClick={()=>{logout();closeModal();}} style={{padding:"2%",background:"red",color:"#ffff",fontFamily:"Manrope",fontSize:"16px",border:"none",borderRadius:"4px"}}>Logout</button>           

            </Modal>

        </div >
    )
}

export default Logout