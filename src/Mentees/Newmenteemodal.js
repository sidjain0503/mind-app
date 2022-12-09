import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Components/Navbar/DashboardTab/DashboardTab.css'
import newmentee from './newmentee.png'
import { useEffect } from 'react';
import { doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../mindapp/firebase';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function Newmenteemodal({menteeList}) {

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


            useEffect(()=>{
                openModal();
                console.log(menteeList)
            },[])
   

            const batch = writeBatch(db)

            const setMenteesSeen =async ()=>{

                    menteeList.forEach((mentee)=>{
                        const id = mentee.id; 

                         batch.update(doc(db,"User",id),{
                            seen:true
                        })
                            console.log("Done")
                        })
                        closeModal();
                       await batch.commit();

            }

    return (
        <div id='edit-about'>
            <button className='edit_btn' onClick={openModal}>
                Open me 
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
                <div className='modal-top' style={{alignItems:"center"}}>
                    <strong style={{color:"#4D9DF8",textAlign:"center"}}>New Mentee Alloted to you  </strong>
                    <img src={newmentee} alt="" style={{width:"80%",textAlign:'center'}}/>
                    <button onClick={setMenteesSeen} style={{padding:"2%",margin:"10px",background:"#4D9DF8",border:"none",borderRadius:"6px",fontFamily:"Manrope",fontWeight:"600",color:"white"}} >Continue Mentoring!!</button>
                </div>

               
            </Modal>


                

        </div>
    )
}

export default Newmenteemodal