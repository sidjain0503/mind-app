import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast} from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../../../mindapp/firebase';
import '../DashboardTab.css'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "30%",
        maxWidth:'60%',
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function EditMentorTask({ task, title , id }) {

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

    const Initial_state = {
        Task: task,
        Title: title
      }
    
      const userid = localStorage.getItem('user')
    
      const [profiledata, setprofiledata] = useState(Initial_state)
      const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setprofiledata({ ...profiledata,[name]: value })
      }

    const handlesubmit =async (e) => {
        e.preventDefault();
        console.log(profiledata)
    
        const Updateref = doc(db, "Tasks", id );
    
        // Set the "capital" field of the city 'DC'
        await updateDoc(Updateref, {
          ...profiledata
        });

        console.log(Updateref.empty)
        closeModal();

        toast.success("Succesfully updated")
    
      }
    

   
    return (
        <div id='edit-about'>
            <button className='edit_btn' onClick={openModal}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3372 4.09044L14.8632 2.11144C14.6905 2.01281 14.4858 1.98605 14.2935 2.03694C14.1012 2.08782 13.9366 2.21227 13.8352 2.38344L6.00022 15.7654C5.9508 15.8495 5.91883 15.9427 5.90622 16.0394L5.22022 21.1724C5.20094 21.3185 5.22578 21.467 5.29153 21.5989C5.35728 21.7307 5.46095 21.8399 5.58922 21.9124C5.71837 21.9863 5.86638 22.0205 6.01483 22.0109C6.16328 22.0013 6.30564 21.9483 6.42422 21.8584L10.5862 18.6994C10.6642 18.6405 10.7298 18.5668 10.7792 18.4824L16.6702 8.42344L18.6132 5.09944C18.6617 5.01516 18.693 4.92211 18.7054 4.82566C18.7178 4.72922 18.7109 4.63128 18.6853 4.53749C18.6596 4.44369 18.6156 4.35591 18.5559 4.27918C18.4962 4.20246 18.4219 4.13831 18.3372 4.09044ZM9.55122 17.6164L6.95122 19.5874L7.38022 16.3804L12.8202 7.08644L14.9922 8.32344L9.55122 17.6164ZM15.7432 7.03844L13.5712 5.79944L14.7622 3.76544L16.9342 5.00244L15.7432 7.03844Z" fill="black" fill-opacity="0.65" />
                </svg>
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
                    <strong>Edit Task </strong>
                </div>

                <form action="" onSubmit={handlesubmit}>
                    <div className="task-container">
                        <label htmlFor="title">Task title</label>
                        <input type="text" name="Title" id="title" value={profiledata.Title} onChange={handlechange} />
                    </div>

                    <div className="task-container">
                        <label htmlFor="task">Task </label>
                        <input type="text" name="Task" id="task" value={profiledata.Task}  onChange={handlechange} />
                    </div>

                        <button type='submit'id='edittask-btn'>Update task</button>

                </form>
            </Modal>


                

        </div>
    )
}

export default EditMentorTask