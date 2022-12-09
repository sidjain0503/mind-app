import React, { useState } from 'react'
import './StudyResources.css'

// import '../FreeResources/FreeResources.css'
import Dpp11 from './Dpp11'
import Dpp12 from './Dpp12'
function Dpp() {

        const [subjetct, setsubjetct] = useState()

        const showsubjects=(sub)=>{
            setsubjetct(sub)
        }

       

  return (
    <div className='freeresource-container'>
        
        <h1 style={{ fontFamily: "Manrope",fontSize:"30px",width:"95%",margin:"auto" }}>Find Below the PDF of Dpps by choosing your class </h1>
            <p style={{ fontFamily: "Manrope",fontSize:"15px",width:"95%",margin:"auto" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ratione quod aut accusamus cumque libero eligendi. Nobis, eos amet modi voluptatum reprehenderit iste dolorem cum distinctio soluta maiores praesentium atque, voluptas alias ratione omnis!</p>

        <div className='dpp-class'>
            <div className="subjects">
            <button onClick={()=>{showsubjects("class11")}}>Class 11 </button>
            </div>

            <div className="subjects">
            <button onClick={()=>showsubjects("class12")}>Class 12 </button>

            </div>
    </div>

    {subjetct === "class11"?<><Dpp11 /></>:null }
    {subjetct === "class12"?<><Dpp12/></>:null }




    </div>
  )
}

export default Dpp