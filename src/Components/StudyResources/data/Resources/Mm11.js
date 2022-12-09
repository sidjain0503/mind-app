import React, { useRef, useState } from 'react'
import './StudyResources.css'
import chemistry from '../mindmaps/chemistry1.json'
import physics from '../mindmaps/physics1.json'
import maths from '../mindmaps/maths1.json'

import Embedpdf from './Embedpdf'

function Mm11() {
    const [subject, setsubject] = useState('')
    const handlesubject = (sub) => {
        setsubject(sub)
        setid("pdfs")

        //   console.log(physics11);
    }

    const [chem, setchem] = useState('')
    const handlechem = (sub) => {
        setchem(sub)
        setid("pdfs")

        
        //   console.log(physics11);
    }

    const [id, setid] = useState("")

   const scroll =()=>{
    console.log("pdfs")
    const titleElement = document.getElementById('pdfs')
    console.log(id)
    console.log(titleElement)
    titleElement.scrollIntoView({ behavior: 'smooth' })
   }


  

    return (
        < div className=''>

            <h1 style={{ fontFamily: "Manrope", fontSize: "30px", width: "95%", margin: "30px auto" }}>Find Below the Dpps of class 12 </h1>
           
            <div className='subs-container'>
                <div className="subjects">
                    <span>Physics</span>
                    <p>Give momentum to your Physicspreparationwith our Daily Practice papers.</p>
                    <button onClick={() => {handlesubject("physics"); scroll();}}>show preview</button>
                </div>
                <div className="subjects">
                    <span>Chemistry</span>
                    <p>Chemistry will come to you organically, with our Daily Practice papers.</p>
                    <button onClick={() =>{handlesubject("chemistry"); scroll(); }}>show preview</button>
                </div>
                <div className="subjects">
                    <span>Mathematics</span>
                    <p>Add-on to your Maths preparation, with our Daily Practice papers.</p>
                    <button onClick={() => {handlesubject("mathematics"); scroll();} }>show preview</button>
                </div>
            </div>


            {subject === "chemistry" ?
                <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }} id={id} >Chemistry Mind maps</h1>
                    <div className="dpp-pdfs">

                        {chemistry.map((maths) => {
                            return <>


                                <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                            </>

                        })}
                    </div>

                </> : null}
          

            {subject === "physics" ?
                <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }} id={id} >Physics Mind maps</h1>
                    <div className="dpp-pdfs">

                        {physics.map((maths) => {
                            return <>


                                <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                            </>

                        })}
                    </div>

                </> : null}

            {subject === "mathematics" ?
                <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }} id={id}>Mathematics mind maps</h1>
                    <div className="dpp-pdfs">

                    {maths.map((maths) => {
                        return <>


                            <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                        </>

                    })}
                    </div>

                </> : null}

           




        </div>

    )
}

export default Mm11



