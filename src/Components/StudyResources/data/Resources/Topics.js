import React, { useState } from 'react'
import './StudyResources.css'

import Chemistry12 from './Chemistry12'
import Dpp from './Dpp'
import Maths12 from './Maths12'
import Physics12 from './Physics12'
import Pyq from './Pyq'
import Mm from './Mm'

function Topics({ type }) {
    const [subject, setsubject] = useState()

    const showsubject = (sub) => {
        setid("pdfs")
        setsubject(sub)
        console.log(id)
    }


    const [id, setid] = useState("")

   const scroll =()=>{
    console.log("pdfs")
    const titleElement = document.getElementById('pdfs')
    titleElement.scrollIntoView({ behavior: 'smooth' })
   }

    return (
        <div className='freeresource-container'>
            {type === "notes" ? <>

                <h1 style={{ fontFamily: "Manrope", fontSize: "30px", width: "75%", margin: "auto" }}>Find Below the Notes of each subject </h1>
                <p style={{ fontFamily: "Manrope", fontSize: "15px", width: "75%", margin: "auto" }}>
                    We at MIND put the student first. Their needs, their resources take priority over money for us. It
                    is their success that is the real profit for us. Their success is our success.
                    As such, anyone can download notes, sample papers and other resources free-of-cost. It's free
                    as in 'free beer' and free as in 'freedom'. There's nothing more tragic than gatekeeping
                    knowledge.
                    This is not all though; our YouTube channel provides video format lessons. From the comfort of
                    your home, at your pace. It's your journey, you decide how fast to go through it
                </p>

                <div className='content'>
                    <div className="subjects">
                        <span>Physics</span>
                        <p>Get your Physics prep up-to speed with our plan! Physics is meant to be intuitive, and we make it as such.</p>
                        <button onClick={() =>{showsubject("physics"); scroll();}}>Preview physics</button>
                    </div>
                    <div className="subjects">
                        <span>Chemistry</span>
                        <p>No more endless unproductive hours sunk into Chemistry. The most scoring subject will now be the easiest one.</p>
                        <button onClick={() =>{ showsubject("chemistry"); scroll(); }}>Preview Chemistry</button>
                    </div>
                    <div className="subjects">
                        <span>Mathematics</span>
                        <p>Multiply your scores with our Mathematics package. Logic is the foundation of Maths, and with our guidance you’ll never see Maths as something to be mugged up.</p>
                        <button onClick={() => {showsubject("mathematics"); scroll();}}>Preview Mathematics</button>
                    </div>
                </div>

                <div className="documents">
                    {subject === "physics" ? <>
                        <h1 style={{ fontFamily: "Manrope", fontSize: "24px", width: "75%", margin: "auto", marginTop: "20px", marginBottm: "20px" }} id={id} >Find below Physics notes</h1>
                        <Physics12 />
                    </> : null}
                    {subject === "chemistry" ? <>
                        <h1 style={{ fontFamily: "Manrope", fontSize: "24px", width: "75%", margin: "auto", marginTop: "20px", marginBottm: "20px" }} id={id}>Find below Chemistry notes</h1>
                        <Chemistry12 />
                    </> : null}
                    {subject === "mathematics" ? <>
                        <h1 style={{ fontFamily: "Manrope", fontSize: "24px", width: "75%", margin: "auto", marginTop: "20px", marginBottm: "20px" }} id={id}>Find below Mathematics notes</h1>
                        <Maths12 />
                    </> : null}
                </div>

            </> : null}

            {type === "dpp" ? <>

                <Dpp />

            </> : null}

            {type === "pyq" ? <>
                <Pyq />
            </> : null}

            {type === "mindmaps" ? <>
                <Mm />
            </> : null}

        </div>

    )
}

export default Topics