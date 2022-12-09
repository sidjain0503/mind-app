import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function StudyResources() {
    
    const navigate = useNavigate();
  return (
    <div className='freeresource-container'>
        
        <h1 style={{ fontFamily: "Manrope",fontSize:"30px",width:"75%",margin:"auto" }}>Find Below the PDF of Notes by choosing subjects </h1>
            <p style={{ fontFamily: "Manrope",fontSize:"15px",width:"75%",margin:"auto" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ratione quod aut accusamus cumque libero eligendi. Nobis, eos amet modi voluptatum reprehenderit iste dolorem cum distinctio soluta maiores praesentium atque, voluptas alias ratione omnis!</p>

        <div className='notes' style={{width:"90%",margin:"20px auto "}}>
            <div className="subjects">
            <button onClick={()=>{navigate("/dashboard/studyresources/jee/notes")}}  style={{height:"80px"}} >NOTES </button>
            </div>

            <div className="subjects">
            <button onClick={()=>{navigate("/dashboard/studyresources/jee/dpps")}}  style={{height:"80px"}} >DPPs </button>
            </div>

            <div className="subjects">
            <button onClick={()=>{navigate("/dashboard/studyresources/pyq")}} style={{height:"80px"}} >PYQ </button>
            </div>

            <div className="subjects">
            <button onClick={()=>{navigate("/dashboard/studyresources/mindmaps")}} style={{height:"80px"}} >MIND MAPS </button>
            </div>
    </div>

    </div>
  )
}

export default StudyResources