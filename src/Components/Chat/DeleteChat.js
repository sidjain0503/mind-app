import React, { useState } from 'react'
import Modal from 'react-modal';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { collection, deleteDoc, doc, getDocs, orderBy, query, runTransaction, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../mindapp/firebase';
import { toast } from 'react-toastify';
import mentorimg from '../../Components/Navbar/DashboardTab/img/mentor.png'
import menteeimg from '../../Components/Navbar/DashboardTab/img/student.png'
import adminimg from '../../Components/Navbar/DashboardTab/img/admin.png'

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




function DeleteChat({id,type}) {

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

        const batch = writeBatch(db)
    const navigate = useNavigate();

        const deleteChat =async ()=>{
            const chatRef = doc(db,"messages",id)
            await  deleteDoc(chatRef)

    const q = query(collection(db, `messages/${id}/message`));

    const messageSnapshot = await getDocs(q); 
            
            messageSnapshot.forEach(element => {
                batch.delete(doc(db, `messages/${id}/message` , element.id ))
                console.log("deleted ::", element.id)
            });

            await batch.commit();
            navigate("/")
        }    
  

    return (
        <div id='assignTask'>
           {type === "student" ?   <img src={menteeimg} alt="" style={{ marginLeft: '10px', width: "38px" }} onClick={openModal} /> : null}
           {type === "mentor" ?   <img src={mentorimg} alt="" style={{ marginLeft: '10px', width: "38px" }} onClick={openModal} /> : null}
           {type === "admin" ?   <img src={adminimg} alt="" style={{ marginLeft: '10px', width: "38px" }} onClick={openModal} /> : null}
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
        
                    <h2 style={{fontFamily:"manrope",fontSize:"20px"}}> This will permanently delete this chat! </h2>        

                        
                        <button onClick={deleteChat} style={{padding:"2%",fontFamily:"Manrope",fontSize:"16px",border:"none",borderRadius:"4px",background:"red"}}>Delete Chat</button>           

            </Modal>

        </div >
    )
}

export default DeleteChat