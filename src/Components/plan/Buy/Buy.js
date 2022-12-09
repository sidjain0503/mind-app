import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Buy.css'
import Pay from './PayNowModal/Pay';
// import Pay from './PayNowModal/Pay';
// import { AmountContext } from '../../Context/AmountContext';
// import planimg from './plan_page.png'
import Plans from './Plans.json'

function Buy({ }) {

  const navigate = useNavigate();

  useEffect(() => {

    if (window.plan) {
      
      navigate("/dashboard/buy")

    } else {
      navigate("/dashboard")
    }
  }, [])


  return (<>

    <div className='Buy_course' style={{position:"absolute",top:"10%",left:"20%",height:"85%",overflowY:"scroll"}}>
      {/* <h1>Lets make this your best investment</h1> */}
      <h1>Extend Courses For {window.plan} Mentoring</h1>
      <p style={{fontSize:'17px',width:"80%",margin:"auto",fontFamily:"Manrope"}}>Want to extend your experience with us , or your plan is just going to expire ! Hurry up extend your plan now !</p>
      <div className="plans">
       
        <div className="plans_right">
          
          {Plans.map((plan)=>{
            return <>
             <div className="plan">
            <span>  {plan.amount}/<span>{plan.duration}</span> </span>
            <Pay amount={plan.amount} plan_duration={plan.duration} subs_days={plan.subscription_days} />
          </div>
            </>
          })}

        </div>
      </div>
     

    </div>
  </>
  )
}

export default Buy