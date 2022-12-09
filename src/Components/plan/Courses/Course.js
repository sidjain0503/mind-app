import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Course.css'
import checktick from './img/checktick.png'

function Course({title,plan_type}){

  const pl = plan_type;
  const navigate = useNavigate();
  const [id, setid] = useState("")

  const hover = () => {
    setid("colored_course")
  }

  const colorref = useRef();
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!colorref.current.contains(e.target)) {
        setid("")
        console.log(e.target)
      }

    })
  })

  const selectplan = () => {
    window.plan = pl;
    console.log(window.plan)
    navigate("/dashboard/buy")
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (
    <div className='course'>
      <div className="course_top" onMouseEnter={hover} ref={colorref}>
        <h3 id="title">{title} </h3>
        <p id='para'>Personalized support and advanced study tips that will help your career path and scale the future  </p>
        <button id='cbtn' onClick={() => { selectplan() }}>Get enrolled →</button>
      </div>
      <div className="course_bottom">
        <h3>What you will get.</h3>

        <ul className='outside'>
          {plan_type === "Jee" ?
            <>

              <li><img src={checktick} /> <span>Personal IItian (Top Jee Ranker)</span>  </li>
              <li><img src={checktick} /><span>Unlimited Personal Calls with  Iitian</span></li>
              <li><img src={checktick} /><span>24*7 Chat Support</span></li>
              <li><img src={checktick} /><span>Material & Mock-Tests</span></li>
              <li><img src={checktick} /><span>Counselling & Motivation</span></li>
              <li></li>
            </> : null}
          {plan_type === "Neet" ?
            <>
              <li><img src={checktick} /> <span>Personal Medico (Top NEET Ranker)</span>  </li>
              <li><img src={checktick} /><span>Unlimited Personal Calls with Neet Ranker</span></li>
              <li><img src={checktick} /><span>24*7 Chat Support</span></li>
              <li><img src={checktick} /><span>Material & Mock-Tests</span></li>
              <li><img src={checktick} /><span>Counselling & Motivation</span></li>
            </>
            : null}


          {plan_type === "Counselling" ? <><li><img src={checktick} />Personal Counsellor </li>
            <li><img src={checktick} /> <span>Help in solving all problems related to college admission</span></li>
            <li><img src={checktick} /><span>Counselling for All (JOSSA , JAC Delhi, Wbjee, IIIT Hyderabad, Thapar , ComedK ,UPSEE, HBTU, MMMUT , MHTCET etc.)</span></li>
            <li><img src={checktick} /><span>Pdf of choice filling will be provided</span></li>
            
          </>
            : null}



        
        </ul>
      </div>

    </div>
  )
}

export default Course