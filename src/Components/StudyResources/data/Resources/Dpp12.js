import React, { useRef, useState } from 'react'
import './StudyResources.css'
import physics11 from '../dpps/physics11.json'
import maths11 from '../dpps/maths12.json'
import physical11 from '../dpps/physical12.json'
import organic11 from '../dpps/organic12.json'
import inorganic11 from '../dpps/inorganic12.json'

import Embedpdf from './Embedpdf'

function Dpp12() {
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

            {subject === "chemistry" ? <>
                <div className="topics-container" id={id}>
                    <div className="subs" onClick={() => { handlechem("organic"); scroll() }}>Organic chemistry </div>
                    <div className="subs" onClick={() => {handlechem("physical"); scroll()}}>Physical chemistry </div>
                    <div className="subs" onClick={() => {handlechem("inorganic"); scroll()}}>Inorganic chemistry </div>

                </div>

                {chem === "physical" ?
                <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }} id={id}>Physical Chemistry Dpp</h1>

                    <div className="dpp-pdfs">

                        {physical11.map((maths) => {
                            return <>


                                <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                            </>

                        })}

                    </div>
                </> : null} {chem === "organic" ?
                    <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}  id={id} >Organic Chemistry Dpp</h1>

                    <div className="dpp-pdfs">


                        {organic11.map((maths) => {
                            return <>


                                <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                            </>

                        })}
                    </div>

                    </> : null} {chem === "inorganic" ?
                        <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}  id={id} >Inorganic Chemistry Dpp</h1>

                        <div className="dpp-pdfs">


                            {inorganic11.map((maths) => {
                                return <>


                                    <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                                </>

                            })}
                        </div>

                        </> : null}


            </> : null}

            {subject === "physics" ?
                <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }} id={id} >Physics Dpp</h1>
                    <div className="dpp-pdfs">

                        {physics11.map((maths) => {
                            return <>


                                <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                            </>

                        })}
                    </div>

                </> : null}

            {subject === "mathematics" ?
                <>
                    <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "75%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }} id={id}>Mathematics Dpp</h1>
                    <div className="dpp-pdfs">

                    {maths11.map((maths) => {
                        return <>


                            <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.charAt(0).toUpperCase() + maths.file_name.replace("-", " ").replace("-", " ").replace("-", " ").replace("_", " ").slice(1, -4)} />

                        </>

                    })}
                    </div>

                </> : null}

           




        </div>

    )
}

export default Dpp12



