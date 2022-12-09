import { addDoc, collection, doc, getDocs, query, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import sendMsg from '../img/send-msg.png'
import attachment from '../img/msg-attachment.png'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { db, storage } from '../../../mindapp/firebase'



function Input(chatid) {


  const userid = localStorage.getItem("user");
  const [msg, setMsg] = useState('');
  const [img, setImg] = useState(null);


  const senddata = {
    sendat: Timestamp.fromDate(new Date()),
    sender: userid,
    text: msg
  }


  const sendMessage = async (e) => {
    e.preventDefault();
    // console.log(msg)
    console.log("clicked")
    console.log(senddata)


    if (img) {
      const cover = new Date().getTime() + img.name;
      const storageRef = ref(storage, `images/${cover}`);

      const uploadTask = uploadBytesResumable(storageRef, img).then(
        () => {

          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("downloadurl", downloadURL)
            await addDoc(collection(db, "messages", chatid.chatid, "message"), {
              img: downloadURL,
              sendat: Timestamp.fromDate(new Date()),
              sender: userid,
              status:false,
              text:""
            });
          });
        }
      );

      setImg(null)

        
      const LastRef = doc(db, "messages", chatid.chatid);
      await updateDoc(LastRef, {
        sender:senddata.sender,
        sendat:senddata.sendat,
        status:false
      });

    } else {



      if (msg.length > 0) {
        const docRef = await addDoc(collection(db, "messages", chatid.chatid, "message"), { ...senddata,status:false });

        const LastRef = doc(db, "messages", chatid.chatid);
        await updateDoc(LastRef, {
          last_msg: senddata.text,
          sender:senddata.sender,
          sendat:senddata.sendat,
          status:false
        });


        setMsg("")

        if (docRef.id) {
          console.log("Document written with ID: ", docRef.id);
        } else (
          console.error()
        )
      }

    }


  }

  return (
    <form onSubmit={sendMessage}>


      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <div className="send-message">

        <input type="text" placeholder='Write your message' value={msg} onChange={e => setMsg(e.target.value)} />

        <div className='input-button-container' >

          <label htmlFor="file">
            {img ? <div style={{ position: "relative", width: "10px", height: '10px', borderRadius: "50%", background: "blue" }} onClick={() => setImg(null)} ></div> : null}
            <img src={attachment} alt=""
              style={{ cursor: "pointer" }}
            />
          </label>
          <button type='submit' style={{ background: "transparent", border: "none" }}>
            <img src={sendMsg} alt="" style={{ width: "40px" }} />
          </button>
        </div>

      </div>




    </form>
  )
}

export default Input