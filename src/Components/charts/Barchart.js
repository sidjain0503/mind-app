import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { db } from '../../mindapp/firebase';

function Barchart() {

                
    
            const uid = localStorage.getItem("user")
            const [data, setdata] = useState([])
            const getTransactions=async ()=>{
                const q = query(collection(db, "Transactions"), where("mentor_id", "==", uid));
                const querySnapshot = await getDocs(q);

                    const dataarr =[]

                querySnapshot.forEach((element)=>{
                    const date = new Date(element.data().transaction_date.seconds * 1000).toLocaleDateString("en-US")

                    const name = {name: date}
                    const uv ={ uv : element.data().impact_points}

                    dataarr.push({...name,...uv,pv: 300, amt: 300 })

                    console.log("name",name,"uv:",uv)
                    console.log(dataarr)
                    
                })
                setdata(dataarr)

            }

            useEffect(()=>{
                getTransactions();
            },[])

    return (
        <div>
            <BarChart width={350} height={160} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 50, backgroundColor: '#ccc' }} />
                {/* <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} /> */}
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={15} />
            </BarChart>
        </div>
    )
}

export default Barchart