import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import '../profile.css';
import pencil from './edit.png';
import { doc, updateDoc } from "firebase/firestore";
import { db,storage } from '../../../mindapp/firebase';
import camera from './camera.png'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "70%",
    minWidth: "50%",
    height: "auto",
    boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
    borderRadius: "8px"

  },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function EditAbout({ about, goals, fluency, education_details }) {

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


  const type = localStorage.getItem("type")

  const Initial_state = {
    about: about,
    goal: goals,
    fluency: "English , Hindi",
    education_details: education_details
  }

  const Initial_mentor = {
    message: about,
    achievements: education_details,
    fluency: "English , Hindi",
    college_experience: goals
  }



  const userid = localStorage.getItem('user')
  const [profilementordata, setprofilementordata] = useState(Initial_mentor)
  const [Img, setImg] = useState(null)

  const [profiledata, setprofiledata] = useState(Initial_state)
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (type === "student") {
      setprofiledata({ ...profiledata, [name]: value })
    }
    if (type === "mentor" || type === "admin") {
      setprofilementordata({ ...profilementordata, [name]: value })

    }

  }




  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(profiledata)

    if (type === "student") {
      const washingtonRef = doc(db, "User", userid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        ...profiledata
      });
  
      closeModal();
      toast.success("Profile edited !")
  
    }
    if (type === "mentor" || type==="student") {
      const washingtonRef = doc(db, "Mentors", userid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        ...profiledata
      });
  
      closeModal();
      toast.success("Profile edited !")
  
    }

   
   

  }


  const handlementorsubmit = async (e) => {
    e.preventDefault();
    console.log(profiledata)

    if (Img != null) {

        console.log("I run")

      const cover = new Date().getTime() + Img.name;
      const storageRef = ref(storage,`profile/${cover}` );

      const uploadTask = uploadBytesResumable(storageRef,Img ).then(
        () => {

          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("downloadurl", downloadURL)
            await updateDoc(doc(db, "Mentors", userid), {
              img: downloadURL,
              ...profilementordata
            });
            closeModal();
            toast.success("Profile edited!")
          });
        }
      );

      setImg(null)

    } else{

      const washingtonRef = doc(db, "Mentors", userid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        ...profilementordata
      });
      closeModal();
      toast.success("Profile edited !")

    }

   

  

  }

  return (
    <div id='edit-about'>
      <button className='edit_btn' onClick={openModal}>
        <span> <img src={pencil} /> Edit Profile</span>
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
          <strong>Update your profile details </strong>
        </div>

        {type === "student" ? <>
          <form className='edit-form' onSubmit={handlesubmit}>

            <div className="editcontent">
              <label htmlFor="about">About</label>
              <textarea name="about" id="about" cols="20" rows="10" value={profiledata.about} onChange={handlechange}></textarea>
            </div>

            <div className="editcontent">
              <label htmlFor="goals">Goals for 2022

              </label>
              <textarea name="goal" id="goals" cols="20" rows="10" value={profiledata.goal} onChange={handlechange}  ></textarea>
            </div>

            <div className="editcontent">
              <label htmlFor="stream">Education Details</label>
              <textarea name="education_details" id="stream" cols="20" rows="10" value={profiledata.education_details} onChange={handlechange} placeholder="Fill your education detais , as : 12 Pcm , Academic world school bemetara. 11th (92%)  " ></textarea>
            </div>

            <div className="editcontent">
              <label htmlFor="fluency">Fluency</label>
              <input name="fluency" id="fluency" value={profiledata.fluency} onChange={handlechange} />
            </div>

            <div >
              <button type='submit' id='editsubmit-btn'>Share</button>

            </div>

          </form>
        </> : null}


        {type === "mentor" || type==="admin" ? <>
          <form className='edit-form' onSubmit={handlementorsubmit}>
          <div className="editcontent">
            <label htmlFor="file" style={{display:'flex',alignItems:"center"}}> <img src={camera} alt="" srcset="" style={{width:"35px"}} /> <span>Upload image</span></label>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) =>{setImg(e.target.files[0])  } }
            />
          </div>
            

            <div className="editcontent">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" cols="20" rows="10" value={profilementordata.message} onChange={handlechange}></textarea>
            </div>

            <div className="editcontent">
              <label htmlFor="college_experience">College and experience

              </label>
              <textarea name="college_experience" id="college_experience" cols="20" rows="10" value={profilementordata.college_experience} onChange={handlechange}  ></textarea>
            </div>

            <div className="editcontent">
              <label htmlFor="achievements">Achievements</label>
              <textarea name="achievements" id="achievements" cols="20" rows="10" value={profilementordata.achievements} onChange={handlechange} placeholder="Fill your education detais , as : 12 Pcm , Academic world school bemetara. 11th (92%)  " ></textarea>
            </div>

            <div className="editcontent">
              <label htmlFor="fluency">Fluency</label>
              <input name="fluency" id="fluency" value={profilementordata.fluency} onChange={handlechange} />
            </div>

            <div >
              <button type='submit' id='editsubmit-btn'>Share</button>

            </div>

          </form>
        </> : null}

      </Modal>

    </div>
  )
}

export default EditAbout