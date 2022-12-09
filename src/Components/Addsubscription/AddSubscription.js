import React, { useState } from 'react'
import Modal from 'react-modal';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { doc, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../../mindapp/firebase';
import { toast } from 'react-toastify';


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




function AddSubscription({id,subsdays}) {

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
    const [subdays, setsubdays] = useState(0)

    const updatesubscription =async()=>{

        console.log(subdays)

        
try {
    await runTransaction(db, async (transaction) => {
        const sfDocRef = doc(db, "User", id)
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
  
      const subscriptionDays = sfDoc.data().subscription_days + subdays;
      transaction.update(sfDocRef, { subscription_days: subscriptionDays });
      toast.success("Plan Added Successfully")

    });
  } catch (e) {
        console.log("Transaction failed: ", e);
  }
  


       
    
      }
  

    return (
        <div id='assignTask'>
                <strong onClick={openModal} style={{ color:"black",fontSize:"14px",fontFamily:"Manrope",border:"1px solid #dddd",padding:"10px",cursor:"pointer" }}>Add plan </strong>
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
        
                    <h2 style={{fontFamily:"manrope",fontSize:"20px"}}> Are you sure you want to increase this mentee's subsription days? </h2>        

                        
                            <input type="number" value={subdays} onChange={(e)=>{setsubdays(e.target.valueAsNumber)}} style={{background:"#dddd",border:"none",padding:"10px",borderRadius:"4px",display:"block",margin:"15px 0px"}} />
                        <button onClick={()=>{updatesubscription();closeModal();}} style={{padding:"2%",fontFamily:"Manrope",fontSize:"16px",border:"none",borderRadius:"4px"}}>Add plan</button>           

            </Modal>

        </div >
    )
}

export default AddSubscription