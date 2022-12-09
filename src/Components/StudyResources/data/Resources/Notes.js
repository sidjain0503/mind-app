import React, { useState } from 'react'
import './StudyResources.css'

// import '../FreeResources/FreeResources.css'
import Dpp11 from './Dpp11'
import Dpp12 from './Dpp12'
import Physics12 from './Physics12'
import Chemistry12 from './Chemistry12'
import Maths12 from './Maths12'
function Notes() {

        const [subjetct, setsubjetct] = useState()

        const showsubjects=(sub)=>{
            setsubjetct(sub)
        }

       

  return (
    <div className='freeresource-container'>
        
        <h1 style={{ fontFamily: "Manrope",fontSize:"30px",width:"90%",margin:"auto" }}>Find Below the PDF of Notes by choosing subjects </h1>
            <p style={{ fontFamily: "Manrope",fontSize:"15px",width:"90%",margin:"auto" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ratione quod aut accusamus cumque libero eligendi. Nobis, eos amet modi voluptatum reprehenderit iste dolorem cum distinctio soluta maiores praesentium atque, voluptas alias ratione omnis!</p>

        <div className='notes'>
            <div className="subjects">
            <button onClick={()=>{showsubjects("Physics")}}>Physics </button>
            </div>

            <div className="subjects">
            <button onClick={()=>showsubjects("Chemistry")}>Chemistry </button>
            </div>

            <div className="subjects">
            <button onClick={()=>showsubjects("Mathematics")}>Mathematics </button>
            </div>
    </div>

    {subjetct === "Physics"?<><Physics12 /></>:null }
    {subjetct === "Chemistry"?<><Chemistry12/></>:null }
    {subjetct === "Mathematics"?<><Maths12/></>:null }




    </div>
  )
}

export default Notes