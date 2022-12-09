import React, { useState } from 'react'
import Modal from 'react-modal';
import './AddUser.css'
import { collection, Timestamp, setDoc, doc, runTransaction } from "firebase/firestore";
import { db } from '../../mindapp/firebase';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';



const customStyles = {
    content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "50%",
        maxWidth: "80%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
        height:"75%"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function AddUser({ Allmentor }) {

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

    const [Select, setSelect] = useState("student");
    const [menid, setmenid] = useState("")
    const [menName, setmenName] = useState("")

    const INITIAL_STATE = {
        phone_number: "+91"
    };
    const [SubDays, setSubDays] = useState(30)
    const [MemberData, setMemberData] = useState(INITIAL_STATE)
    const [searchquery, setsearchquery] = useState(null)
    const { phone_number } = MemberData;
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (Select === "student") {
            setMemberData({ ...MemberData, [name]: value, type: Select, mentor_alloted: true, education_details: "", about: "", goal: "", fluency: "English,Hindi" })
        }
        if (Select === "mentor") {
            setMemberData({ ...MemberData, [name]: value, type: Select ,message: '',achievements: '',fluency: "English , Hindi",college_experience: '' })
        }
    }

    const addmenteecount = async (mentorid) => {
        const sfDocRef = doc(db, "Mentors", mentorid);
        try {
            await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                throw "Document does not exist!";
              }
              
              const menteecount = sfDoc.data().mentee_count + 1 ;
              transaction.update(sfDocRef, { mentee_count: menteecount });
            });
            console.log("Transaction successfully committed!");
          } catch (e) {
            console.log("Transaction failed: ", e);
          }
  }
  
  

    const AddMember = async (e) => {
        e.preventDefault();
        const passwordString = `${MemberData.name.slice(0, 4)}_${MemberData.university}@mind${Math.floor(Math.random() * 101)}`;
        const password = passwordString.toLowerCase().replace(" ", "_")
        console.log(password)
        const newMemberRef = doc(collection(db, "User"));
        const newMentorRef = doc(collection(db, "Mentors"));
        // later...
        if (Select === "student") {
            addmenteecount(menid);
            await setDoc(newMemberRef, { ...MemberData, mentor_id: menid,mentor_name:menName, subscription_days: SubDays,seen:false, timestamp: Timestamp.fromDate(new Date())});
        }
        if (Select === "mentor") {
            await setDoc(newMentorRef, { ...MemberData, password: password, working_days: 0, total_impact_points: 0, impact_points: 0, mentee_count: 0, join_date: Timestamp.fromDate(new Date()) });
        }
        setmenid("")
        setmenName("")
        setMemberData(INITIAL_STATE)
        setsearchquery(null)
        setSelect("student")
        closeModal();
        toast.success("Member added successfully")
    }



    return (
        <div id='assignTask'>
            <button className='task_btn' onClick={openModal}>
                <strong style={{ color: "#038FDB" }}>Add Mentee or Mentor </strong>
                <span style={{ color: "#038FDB" }}>Assgin Mentee To Mentors </span>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                <button onClick={closeModal} className='modal-close-btn' style={{display:'inline'}}>✖</button>
                <div className='modal-top'>

                </div>

                <h2 style={{ fontFamily: "manrope", fontSize: "20px" }}> Add member</h2>

                <form className='task-form' >
                    <div className='modal-form' style={{height:"auto"}}>


                        <div className="modal-input">
                            <label htmlFor="assigned">Whom you are adding   </label>
                            <select name="" id="" style={{ fontSize: "16px", background: "rgb(0,0,0,0.04)", borderRadius: "6px", width: "95%", border: "none", padding: "1%" }} onChange={(e) => { setSelect(e.target.value); setMemberData(INITIAL_STATE); setsearchquery(null); console.log(Select) }} >
                                <option value="student">Mentee</option>
                                <option value="mentor">Mentor</option>
                            </select>
                        </div>
                        {/* mentor */}

                        {Select === "mentor" ? <>


                            <div className="modal-input">
                                <label htmlFor="name">Name of the mentor</label>
                                <input type="text" name='name' id='name' placeholder='Enter name of the member' onChange={handleChange} />
                            </div>

                            <div className="modal-input">
                                <label htmlFor="university">University</label>
                                <input type="text" name='university' id='name' placeholder='Enter university' onChange={handleChange} />
                            </div>

                            <div className="modal-input">
                                <label htmlFor="Feild">Feild(Jee/Neet)</label>
                                <input type="text" name='feild' id='name' placeholder='Enter feild' onChange={handleChange} />
                            </div>


                            <div className="modal-input">
                                <label htmlFor="number">Contact info</label>
                                <input type="text" name='phone_number' id='number' value={phone_number} placeholder='Enter phonenumber' onChange={handleChange} />
                            </div>

                            <div className="modal-input">
                                <label htmlFor="number">Email</label>
                                <input type="email" name='email' id='number' placeholder='Enter email' onChange={handleChange} />
                            </div>

                            <div className="modal-input">
                                <label htmlFor="note">Note</label>
                                <textarea type="text" name='note' id='note' placeholder='Enter name of the member' onChange={handleChange} />
                            </div>

                            <button style={{ backgroundColor: "#263238", border: "none", padding: "2%", width: "20%", marginRight: "15px", marginLeft: "auto", color: "#ffff", borderRadius: "4px" }} onClick={AddMember} >Add mentor</button>

                        </> : null}



                        {/* Mentee */}

                        {Select === "student" ? <>


                            <div className="modal-input">
                                <label htmlFor="name">Name of the mentee</label>
                                <input type="text" name='name' id='name' placeholder='Enter name of the mentee' onChange={handleChange} />
                            </div>

                            <div className="modal-input">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='name' placeholder='Enter email' onChange={handleChange} />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="number">Contact info</label>
                                <input type="text" name='phone_number' id='number' placeholder='Enter number' value={phone_number} onChange={handleChange} />
                            </div>


                            <div className="modal-input">
                                <label htmlFor="branch">Branch(Jee/Neet)</label>
                                <input type="text" name='preparing_for' id='branch' placeholder='Enter branch of the student Jee/Neet' onChange={handleChange} />
                            </div>

                            <div className="modal-input">
                                <label htmlFor="name">Timeline of subscription</label>
                                <input type="number" value={SubDays} onChange={(e) => setSubDays(e.target.valueAsNumber)} />
                                 
                            </div>



                            <div className="modal-input">
                                <label htmlFor="mentor">Alloted to</label>
                                <input type="text" name='mentor' id='mentor' placeholder='Search mentor and select to allot mentor' value={searchquery} onChange={(e) => setsearchquery(e.target.value)} />
                                <div className="searchlist" style={{ position: "relative", left: '5px', marginBottom: "15px" }}>
                                    <ul style={{ padding: "0px", margin: "0px" }}>
                                        {Allmentor.filter((mentee) => mentee.name.toLowerCase().includes(searchquery) || mentee.feild.toLowerCase().includes(searchquery) ).slice(0, 1).map((mentee) => {
                                            return <>
                                                <li onClick={() => { setsearchquery(mentee.name); setmenid(mentee.id); setmenName(mentee.name) ; console.log(menid) }} > {mentee.name} ({mentee.feild})
                                                </li>
                                            </>
                                        })}
                                    </ul>
                                </div>
                            </div>

                            {searchquery ?
                                <button style={{ backgroundColor: "#263238", border: "none", padding: "2%", width: "20%", marginRight: "15px", marginLeft: "auto", color: "#ffff", borderRadius: "4px" }} onClick={AddMember} >Add mentee</button>
                                : <div style={{ width: "100%", height: "30px" }}></div>}

                        </> : null}

                    </div>
                </form>

            </Modal>

        </div >
    )
}

export default AddUser