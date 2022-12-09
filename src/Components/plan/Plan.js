import React, { useEffect } from 'react'
import { useState } from 'react';
import Course from './Courses/Course.js'
import './Courses/Course.css'
import { doc, getDoc, } from "firebase/firestore";
import { db } from '../../mindapp/firebase.js';

function Plan() {
  const [userdata, setUsers] = useState([]);
  const [loader, setloader] = useState(false)
  const userid = localStorage.getItem("user")
  const plandata = async () => {

    const UserdocRef = doc(db, "User", userid);
    const UserdocSnap = await getDoc(UserdocRef);

    const item = []
    if (UserdocSnap.exists()) {
      item.push(UserdocSnap.data())
      setUsers(item)
      setloader(true)
    } else {
      console.log("some error occured ");
    }
  }

  useEffect(() => {
    plandata();
  }, [loader])

  return (
    <div className='plan-details' style={{ position: "absolute", top: "10%", left: "20%", height: "90%", overflowY: "scroll", zIndex: "-1" }}>
      <div className="current-plan" style={{ height: "max-content" }}>
        <h1 style={{ fontFamily: "Manrope", textAlign: "center", margin: "30px 0 30px 0" }}>Your Current pPlan</h1>
        <div className="plan" style={{ width: '90%', height: 'max-content', background: "rgb(0,0,0,0.01)", margin: "auto", borderLeft: "4px solid black" }}>
          <div> <strong style={{ fontFamily: "Manrope", fontSize: "18px" }} >Student Name :</strong> <span>{userdata.map(n => n.name)}</span></div>
          <div> <strong style={{ fontFamily: "Manrope", fontSize: "18px" }} >Preparing For :</strong> <span>{userdata.map(n => n.preparing_for)}</span></div>
          <div> <strong style={{ fontFamily: "Manrope", fontSize: "18px" }} >Joining Date :</strong> <span>{userdata.map((data) => {
            return <>
              <span> {new Date(data.timestamp.seconds * 1000).toLocaleDateString("en-US")}</span>
            </>
          })}</span></div>
          <div><strong style={{ fontFamily: "Manrope", fontSize: "18px" }} >Days Left :</strong> <span>{userdata.map(n => n.subscription_days)}</span></div>
        </div>
      </div>

      <div >
        <div className='course_details'>
          <h1 style={{ fontFamily: "Manrope", textAlign: "center", margin: "30px 0 30px 0" }}>Choose A Plan That’s Right For Your Future</h1>
          <div className="courses" >
            <Course title="JEE/BITSAT & other Engineering Entrance" id='colored_course' plan_type={"Jee"} />
            <Course title="NEET & other Medical &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Entrance" id="colored_course" plan_type={"Neet"} />
            <Course title="College Counseeling for Engineering & Medical" plan_type={"Counselling"} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Plan