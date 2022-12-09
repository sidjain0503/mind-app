import React, { useState } from 'react'
import Modal from 'react-modal';
// import './AssignTask.css'
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { async } from '@firebase/util';
import { deleteDoc, doc, terminate, query, getDocs, collection, addDoc, serverTimestamp, runTransaction, updateDoc, where, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../mindapp/firebase';
import './Transaction.css'
import connect from '../../Components/Navbar/DashboardTab/img/connect.png'
import transactionimg from '../../Components/Navbar/img/transaction.png'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "45%",
        maxWidth:"75%",
        height:"80%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function Transaction({ transaction_data, id, home , all }) {

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
    const [Animate, setAnimate] = useState(false)
    const [newtransaction, setnewtransaction] = useState(false)
    const [Transactions, setTransactions] = useState([])
    const getAlltransactions = async () => {
        const q = query(collection(db, "Transactions"));
        const querySnapshot = await getDocs(q);

        const item = []
        querySnapshot.forEach((doc) => {

            // console.log(doc.data())
            const menteeid = { id: doc.id }
            item.push({ ...doc.data(), ...menteeid })
            // const newArray = new Array().fills(doc.data());
            // console.log(newArray)
        })
        setTransactions(item);
    }

    const createTransaction = async (e) => {
        e.preventDefault();
        setAnimate(true)

        const data = {
            transaction_date:Timestamp.fromDate(new Date()),
            impact_points: transaction_data.impact_points,
            mentor_name: transaction_data.name,
            mentor_id: id,
            amount:amount
        }


        await addDoc(collection(db, "Transactions"), { ...data });

        const sfDocRef = doc(db, "Mentors", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(sfDocRef, {
            impact_points: 0
        });

        console.log("transaction complete")
        setAmount(0)
        closeModal();
        toast.success("Transaction completed")
    }
    const [Allmentor, setAllmentor] = useState([])
    const [amount, setAmount] = useState(0)
    const Allmentordata = async () => {
        const q = query(collection(db, "User"), where("type", "==", "mentor"));
        const querySnapshot = await getDocs(q);

      
        const menteeItem = [];

        querySnapshot.forEach(element => {
            // console.log("MenteelistAlltime =>", element.data())
            const menteeid = { id: element.id }
            menteeItem.push({ ...element.data(), ...menteeid })
        })
        setAllmentor(menteeItem)
    }

    useEffect(() => {
        getAlltransactions();
        Allmentordata();
    }, [])

    return (
        <div id='assignTask'>
            <button className='task_btn' onClick={openModal}>
               
                {home === true || all === true? <>
                    {all === true ? <img src={transactionimg} style={{width:"24px"}} /> :
                    <>
                      <strong style={{ color: "#D98A19" }}>Transcation Panel </strong>
                    <span style={{ color: "#D98A19" }}>Quick Action And History</span>
                    </>
                    }
                   
                </> :  
                <>
                <strong style={{ color: "rgb(77, 157, 248)", fontSize: "14px", fontFamily: "Manrope" }}>Transaction </strong>
               
                </>

                }
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

                <h2 style={{ fontFamily: "manrope", fontSize: "20px" }}> Transaction's </h2>
                <p style={{ color: "rgba(0, 0, 0, 0.5)", fontFamily: "manrope", fontSize: '14px' }}>Hello admin ,Here's the transaction details for this Mentor. </p>

                {newtransaction === true ? <> {id ? 
                <button style={{ background: "White", padding: "3%", color: "#4D9DF8", fontFamily: "Manrope", border: "1px solid #4D9DF8", borderRadius: "6px" }} onClick={() => setnewtransaction(true)}>New Transaction</button> : 
               <button style={{ background: "#4D9DF8", padding: "3%", color: "white", fontFamily: "Manrope", border: "none", borderRadius: "6px", marginRight: "10px" }} onClick={()=>navigate("/dashboard/allMentors")}>New Transaction </button>
                
                }
                </>
                
                : 
                <button style={{ background: "White", padding: "3%", color: "#4D9DF8", fontFamily: "Manrope", border: "1px solid #4D9DF8", borderRadius: "6px" }} onClick={() => setnewtransaction(true)}>New Transaction</button>}

                {newtransaction === false ? <button style={{ background: "#4D9DF8", padding: "3%", color: "white", fontFamily: "Manrope", border: "none", borderRadius: "6px", marginLeft: "10px" }} onClick={() => setnewtransaction(false)}>Transactions</button> : <button style={{ background: "White", padding: "3%", color: "#4D9DF8", fontFamily: "Manrope", border: "1px solid #4D9DF8", borderRadius: "6px" }} onClick={() => setnewtransaction(false)}>Transactions</button>}

                {newtransaction === true ? <>

                    <form style={{margin:"10px 0px"}}>
                        {id ? <>
                            
                            {transaction_data.impact_points !== 0 ? <>                            
                            <div className="modal-input">
                                <label htmlFor="date">Mentor name</label>
                                <input type="text" name='date' value={transaction_data.name} id='date' disabled />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="date">Mentor id</label>
                                <input type="text" name='date' id='date' value={id} disabled />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="date">Impact point this month</label>
                                <input type="text"  value={transaction_data.impact_points} disabled />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="date">Enter Amount in Rs.</label>
                                <input type="number" name='date' id=' ' value={amount} onChange={(e)=>setAmount(e.target.valueAsNumber)} />
                            </div>
                            <button onClick={createTransaction} style={{ background: "#4D9DF8", padding: "3%", color: "white", fontFamily: "Manrope", border: "none", borderRadius: "6px", marginRight: "10px" }} >Create transaction</button>
                            </>:
                            <>
                            <span style={{color:"red",fontFamily:"Manrope",margin:"10px 0px"}}>This transaction has been already recorded !!</span>

                            <div className="modal-input">
                                <label htmlFor="date">Mentor name</label>
                                <input type="text" name='date' value={transaction_data.name} id='date' disabled />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="date">Mentor id</label>
                                <input type="text" name='date' id='date' value={id} disabled />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="date">Impact point this month</label>
                                <input type="text"  value={transaction_data.impact_points} disabled />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="date">Amount in Rs.</label>
                                <input type="number" name='date' id=' ' value={transaction_data.amount}  disabled/>
                            </div>
                            </>}
                        </> :
                            <>
                            </>}



                    </form>
                </> : null}

                {newtransaction === false ? <>

                    <div className="transactions_this_month">
                        <h2 style={{ fontFamily: "manrope", fontSize: "18px" }}> Transaction's this month.</h2>
                        <div className="transactions">
                            {Transactions.map((t, index) => {
                                return <>
                                    <div className="transaction">
                                        <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                            <strong style={{ color: "#1565D8", fontFamily: "Manrope", fontSize: "18px" }}>Payment {index + 1}</strong>
                                            <span>Transaction Date : {new Date(t.transaction_date.seconds * 1000).toLocaleDateString("en-US")} </span>
                                            <span>Impact points : {t.impact_points}</span>
                                            <span>Mentor name  : {t.mentor_name}</span>
                                            <span>Mentor id : {t.mentor_id}</span>
                                            <span>amount : ₹{t.amount}</span>


                                        </div>
                                    </div>

                                </>
                            })}

                        </div>

                    </div>
                </> : null}

                {Animate === true ? <>
        <div style={{position:"fixed",top:"0",left:"0",width:'100%',height:"100%",background:"rgb(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}} >
                            <div style={{width:"70%",height:"70%",background:"White",borderRadius:"4px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center'}}>
                                <img src={connect} alt="" style={{width:"120px",marginTop:"15px"}} />
                            <h2 style={{fontFamily:"Manrope",fontSize:"22px",width:"90%",margin:"auto",textAlign:"center"}}>Creating transaction record , please wait...</h2>
                            <p style={{fontSize:"18px",fontFamily:"Manrope",marginTop:"-10px",color:'red'}}>Do not refresh the page !</p>
                            </div>
                        </div>
       </> : null} 

            </Modal>

        </div >
    )
}

export default Transaction