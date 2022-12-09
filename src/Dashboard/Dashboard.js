import React, { useEffect, useState } from 'react'
import DashboardTab from '../Components/Navbar/DashboardTab/DashboardTab'
import Navbar from '../Components/Navbar/Navbar'
import Search from '../Components/Navbar/Search/Search'
import { db } from '../mindapp/firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'


function Dashboard() {

  const userid = localStorage.getItem('user') //user id of the user stored 
  const users = localStorage.getItem('type') //type of the user : student || mentor || admin 
  const navigate = useNavigate();
  const [user, setUsers] = useState([])
  const [loader, setloader] = useState(false)
  const LoginUser = async () => {

    //gets the logged in user using localstorage userid 
    const UserdocRef = doc(db, "User", userid);
    const UserdocSnap = await getDoc(UserdocRef);

    const item = []

    item.push(UserdocSnap.data())

    setUsers(item)
    setloader(true)

  }

  useEffect(() => {
    LoginUser();
  }, [loader])


  return (
    <div>

          <Search />
          <Navbar loader={loader} />
          <DashboardTab />
       

      {/* 
        <h1 style={{position:"absolute",top:"10%",left:"20%"}}>{
          user.map((uname)=>uname.name)
        }
</h1> */}
    </div>
  )
}

export default Dashboard