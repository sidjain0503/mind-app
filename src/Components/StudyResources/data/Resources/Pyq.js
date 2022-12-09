import React from 'react'
import { useState } from 'react'
import previousyearquestions from '../../data/pyquestions.json'
import Embedpdf from './Embedpdf'
import './StudyResources.css'
function Pyq() {
    return (
        <div className='topics freeresource-container' style={{position:"absolute",top:"10%",left:"20%",height:"90%",overflowY:"scroll"}}>
            <div className="topics-top">

            </div>
            <h1 style={{ fontFamily: "Manrope", fontSize: "30px", width: "95%", margin: "auto" }}>Find Below the PDF of Previous Year Questions </h1>
            <p style={{ fontFamily: "Manrope", fontSize: "15px", width: "95%", margin: "auto" }}>
                We at MIND put the student first. Their needs, their resources take priority over money for us. It
                is their success that is the real profit for us. Their success is our success.
                As such, anyone can download notes, sample papers and other resources free-of-cost. It's free
                as in 'free beer' and free as in 'freedom'. There's nothing more tragic than gatekeeping
                knowledge.
                This is not all though; our YouTube channel provides video format lessons. From the comfort of
                your home, at your pace. It's your journey, you decide how fast to go through it
            </p>

            <h1 style={{ fontFamily: "Manrope", margin: "auto", width: "95%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}>2021</h1>
            <div className="topic-list">

                {previousyearquestions.map((pyq) => {
                    return <>
                        {pyq.file_name.includes(2021) ? <>

                            <Embedpdf pyqembed={pyq.embed_link} pyqname={pyq.file_name.slice(0, -4)} />

                        </> : null}
                    </>
                })}
            </div>
            <h2 style={{ fontFamily: "Manrope", margin: "auto", width: "95%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}>2020</h2>
            <div className="topic-list">

                {previousyearquestions.map((pyq) => {
                    return <>
                        {pyq.file_name.includes(2020) ? <>

                            <Embedpdf pyqembed={pyq.embed_link} pyqname={pyq.file_name.slice(0, -4)} />

                        </> : null}
                    </>
                })}
            </div>

            <h2 style={{ fontFamily: "Manrope", margin: "auto", width: "95%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}>2019</h2>
            <div className="topic-list">

                {previousyearquestions.map((pyq) => {
                    return <>
                        {pyq.file_name.includes(2019) ? <>

                            <Embedpdf pyqembed={pyq.embed_link} pyqname={pyq.file_name.slice(0, -4)} />

                        </> : null}
                    </>
                })}
            </div>

            <h2 style={{ fontFamily: "Manrope", margin: "auto", width: "95%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}>2018</h2>
            <div className="topic-list">

                {previousyearquestions.map((pyq) => {
                    return <>
                        {pyq.file_name.includes(2018) ? <>

                            <Embedpdf pyqembed={pyq.embed_link} pyqname={pyq.file_name.slice(0, -4)} />

                        </> : null}
                    </>
                })}
            </div>

            <h2 style={{ fontFamily: "Manrope", margin: "auto", width: "95%", fontSize: "34px", borderBottom: "1px solid black", marginTop: "30px" }}>2017</h2>
            <div className="topic-list">

                {previousyearquestions.map((pyq) => {
                    return <>
                        {pyq.file_name.includes(2017) ? <>

                            <Embedpdf pyqembed={pyq.embed_link} pyqname={pyq.file_name.slice(0, -4)} />

                        </> : null}
                    </>
                })}
            </div>

        </div>
    )
}

export default Pyq