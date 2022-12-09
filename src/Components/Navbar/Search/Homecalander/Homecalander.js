import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import '../Search.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../mindapp/firebase';
import { useEffect } from 'react';


export default function Homecalander({ calander }) {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
  }


   
 

  return (
    <div  id='homeCalander' style={{ position: "absolute", top: "8%", left: "59%", zIndex: "100", height: "315px", width: "300px", background: "white", border: "0.538854px solid #EBEBEB", borderRadius: "8px", display: "flex", justifyContent: "center", boxShadow: " 0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <Calendar
        className={"homecalander"}
        value={dateState}
        onChange={changeDate}
      />
     
    </div >
  )
}

