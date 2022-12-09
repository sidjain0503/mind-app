import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import { db } from '../mindapp/firebase';
import { toast } from 'react-toastify';
import micon from '../Components/Navbar/img/users.png'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "35%",
        maxWidth: "75%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);



function Menteecount({ mentor_id }) {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [mentor, setMentor] = React.useState([]);
    const [Animate, setAnimate] = useState(false)
    const [Temp, setTemp] = useState([])

    const openModal = async () => {
        setIsOpen(true);

        const q = query(collection(db, "User"), where("mentor_id", "==", mentor_id));
        const querySnapshot = await getDocs(q);

        const item = []
        const mid = []
        querySnapshot.forEach((doc) => {
            const mentorid = { id: doc.id };
            mid.push(doc.id)
            item.push({ ...doc.data(), ...mentorid })
        })
        setMentor(item)

        //       mid.forEach(async (id) => {

        //         const q = query(collection(db, "User"), where("mentor_id", "==", id));
        //         const querySnapshot = await getDocs(q);
        //         // const item =[];
        //         const num = [];

        //         querySnapshot.forEach((doc) => {

        //           num.push(doc.data())


        //         })
        //         const numb = num.length

        //             return numb; 
        //       },)
        //   //for each done 
        //           const menteenum =[]

        //           console.log(menteenum)

    }

    function afterOpenModal(e) {
        // references are now sync'd and can be accessed.
        e.preventDefault()
        console.log("modal open")
    }

    function closeModal() {
        setIsOpen(false);
    }






    // Add a new document with a generated id. store tasks 
    const [menteeCount, setmenteeCount] = useState()
    const navigate = useNavigate();
    
 

    
    const [Search, setSearch] = useState("")

    return (
        <div id='assignTask'>
            <button onClick={openModal} style={{ background: "transparent", border: "none" }} >
                <img src={micon} />
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
                    <strong>Mentee List  </strong>
                    <strong>{mentor.length}  </strong>
                </div>

                <input type="text" onChange={(e) => setSearch(e.target.value)} className="mentor-search" placeholder='Search mentee name' />

                <div className="mentor">
                    <table>
                        <tr>
                            <th>Sno.</th>
                            <th>Name</th>
                            <th>No. of days</th>
                            <th>Joining Date</th>
                            <th>Actions</th>
                        </tr>

                        {mentor.length > 0 ? <>

                            {mentor.filter((m) => m.name.toLowerCase().includes(Search.toLowerCase())).map((mdata,index) => {
                                return <>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{mdata.name}</td>
                                        <td>{mdata.subscription_days}</td>
                                        <td> {new Date(mdata.timestamp.seconds * 1000).toLocaleDateString("en-US")}</td>
                                        <td><div className="mentees_btn">
                                    <button onClick={() =>navigate("/dashboard/chat")}>Chat</button>
                                    <button onClick={() => navigate(`/dashboard/profile/mentee/${mdata.id}`)}>Profile</button>
                                </div></td>
                                    </tr>
                                </>
                            })}

                        </> : <><span style={{ width: "200%", textAlign: "center", display: "block", margin: "20px" }}>Loading mentors...</span></>}



                    </table>
                </div>

                {Animate === true ? <>
                    <div style={{ position: "fixed", top: "0", left: "0", width: '100%', height: "100%", background: "rgb(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <div style={{ width: "70%", height: "70%", background: "White", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                            <h2 style={{ fontFamily: "Manrope", fontSize: "22px" }}>Assigning mentor , please wait...</h2>
                            <p style={{ fontSize: "18px", fontFamily: "Manrope", marginTop: "-10px", color: 'red' }}>Do not refresh the page !</p>
                        </div>
                    </div>
                </> : null}

            </Modal>

        </div>
    )
}

export default Menteecount