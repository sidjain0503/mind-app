import React, { useState } from 'react'
import './Allmentors.css'
import Modal from 'react-modal';
import { collection, addDoc, where, getDocs, query, doc, updateDoc, setDoc ,runTransaction, Timestamp} from "firebase/firestore";
import { db } from '../../mindapp/firebase';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Search from '../../Components/Navbar/Search/Search';
import connect from '../../Components/Navbar/DashboardTab/img/connect.png'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "35%",
    maxWidth:"80%",
    boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
    borderRadius: "8px"

  },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function AllMentors({ mentee_id ,menteename }) {

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [mentor, setMentor] = React.useState([]);
  const [Animate, setAnimate] = useState(false)
  const [Temp, setTemp] = useState([])

  const openModal = async () => {
    setIsOpen(true);

    const q = query(collection(db, "Mentors"), where("type", "==", "mentor"));
    const querySnapshot = await getDocs(q);

    const item = []
    const mid = []
    querySnapshot.forEach((doc) => {
      const mentorid = { id: doc.id };
      mid.push(doc.id)
      item.push({ ...doc.data(), ...mentorid })
    })
    setMentor(item)

    mid.forEach(async (id) => {

      const q = query(collection(db, "User"), where("mentor_id", "==", id));
      const querySnapshot = await getDocs(q);
      // const item =[];
      const num = [];

      querySnapshot.forEach((doc) => {

        num.push(doc.data())


      })
      const numb = num.length

          return numb; 
    },)
//for each done 
        const menteenum =[]

        console.log(menteenum)

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


  const getmenteecount = async (mentorid) => {
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


  const assignMentor = async (mentee, Smentor,mentorname) => {
    setAnimate(true)
    console.log("mentee", mentee, "mentor", Smentor)
    const UserRef = doc(db, "User", mentee);

    // Set the "capital" field of the city 'DC'
    await updateDoc(UserRef, {
      mentor_id: Smentor,
      mentor_alloted: true,
      mentor_name:mentorname,
      seen:false
    });

      const chatid = Smentor+"chat"+mentee; 

      console.log("chatid is ",chatid)
    await setDoc(doc(db, "messages",chatid ), {
      createdat: Timestamp.fromDate(new Date()),
      mentor: mentorname,
      student: menteename,
      mentee_id: mentee_id,
      mentor_id:Smentor,
      sendat:Timestamp.fromDate(new Date()),

    });

    getmenteecount(Smentor).then(()=>{
      console.log("mentor alloted to", mentee)
    setAnimate(false);
      toast.success("Mentor assigned successfully")
      closeModal(); 
  
    }); 


  


  }

  const [Search, setSearch] = useState("")

  return (
    <div id='assignTask'>
      <button className='task_btn' onClick={openModal}>
        <span>Assign Mentor</span>
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
          <strong>Mentor List  </strong>
          <span>All your mentors are listed here! Assign mentor for the selected mentee! </span>
        </div>

        <input type="text" onChange={(e)=>setSearch(e.target.value)} className="mentor-search" placeholder='Search mentor name' />

        <div className="mentor">
          <table>
            <tr>
              <th>Name</th>
              <th>Mentees Assigned</th>
              <th>Actions</th>
            </tr>
            
            {mentor.length > 0 ? <>

              {mentor.filter((m) => m.name.toLowerCase().includes(Search) || m.feild.toLowerCase().includes(Search)  ).map((mdata) => {
                return <>
                  <tr>
                    <td>{mdata.name} {mdata.feild}</td>
                    <td>{mdata.mentee_count}</td>
                    <td><button onClick={() => assignMentor(mentee_id, mdata.id,mdata.name)} style={{padding:"10px",background:"black",color:"white",borderRadius:"5px"}} >Assign </button></td>
                  </tr>
                </>
              })}

            </> : <><span style={{ width: "200%", textAlign: "center", display: "block", margin: "20px" }}>Loading mentors...</span></>}



          </table>
        </div>

       {Animate === true ? <>
        <div style={{position:"fixed",top:"0",left:"0",width:'100%',height:"100%",background:"rgb(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}} >
                            <div style={{width:"70%",height:"70%",background:"White",borderRadius:"4px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center'}}>
                                <img src={connect} alt="" style={{width:"120px",marginTop:"15px"}} />
                            <h2 style={{fontFamily:"Manrope",fontSize:"22px"}}>Assigning mentor , please wait...</h2>
                            <p style={{fontSize:"18px",fontFamily:"Manrope",marginTop:"-10px",color:'red'}}>Do not refresh the page !</p>
                            </div>
                        </div>
       </> : null} 

      </Modal>

    </div>
  )
}

export default AllMentors