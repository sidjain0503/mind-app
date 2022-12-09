import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import AllMentors from '../Allmentors/AllMentors'
import { db } from '../../mindapp/firebase';
import './AllUsers.css'
import menteeimg from '../../Components/Navbar/DashboardTab/img/student.png'
import Pagination from '../../Components/Pagination/Pagination';

function AllUsers() {

    const [mentee , setMentee ] = useState([])


 

const Newmentee = async()=> {
    const q = query(collection(db, "User"), where("mentor_alloted", "==", false));
    const querySnapshot = await getDocs(q);

    const item =[]
    querySnapshot.forEach((doc)=>{

        console.log(doc.data())
        const menteeid = { id : doc.id }
        item.push({...doc.data(),...menteeid})
        // const newArray = new Array().fills(doc.data());
        // console.log(newArray)
    })
    setMentee(item);
    // console.log("mentee",mentee)

}

    useEffect(()=>{
        Newmentee()
        console.log("great man ")

    },[])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    return (
        <div className='allusers'>
            <h1 style={{ fontFamily: "Manrope", fontSize: "25px", marginTop: "30px" }}>New Mentees </h1>
            <span style={{ fontFamily: "Manrope", fontSize: "18px" }}>All new mentee list here ! Assign Mentors to your Mentees !</span>

            <div className="new_container">

                {/* //Those students whose mentor assigned === false // new students !   */}

                {mentee.length > 0 ? <> 

                {mentee.slice(firstPostIndex, lastPostIndex).map((mdata)=>{
                    return<>
                    
                    <div className="mentees">
                    <div className="mentees_desc">
                    <img src={menteeimg} alt="" />
                                   <div>
                                   <strong>{mdata.name}</strong>
                                    <span>{mdata.preparing_for} aspirant</span>
                                   </div>
                    </div>
                    <div className="mentees_btn">
                        <button onClick={()=>{console.log(mentee)}}><AllMentors mentee_id={mdata.id} menteename={mdata.name} menteecount={mdata.mentee_count} /></button>
                    </div>
                </div>

                    </>
                    
                    })}
               
               
             </> : <>
             
                        <h1 style={{fontFamily:"Manrope",textAlign:"center",marginTop:"0%",fontSize:"30px"}}>No New Mentees Today !! </h1>
             </>}


            </div>

                        
               <Pagination
             totalPosts={mentee.length}
             postsPerPage={postsPerPage}
             setCurrentPage={setCurrentPage}
             currentPage={currentPage}
            />

           

        </div>
    )
}

export default AllUsers