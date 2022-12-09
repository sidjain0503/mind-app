import { addDoc, collection, doc, runTransaction, Timestamp, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../mindapp/firebase';
function Razorpay({ registerState ,order}) {

    const navigate = useNavigate()
    const userid = localStorage.getItem("user")

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')

            script.src = src;

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)

            console.log(registerState)
        })
    }
    const uploadData = async () => {
        const docRef = doc(db, "User", userid)
        
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }

                const subscriptionDays = sfDoc.data().subscription_days + registerState.subscription_days;
                console.log(sfDoc.data().subscription_days)
                const amt = sfDoc.data().amount + registerState.amount;
                //   console.log(amount)

                transaction.update(docRef, { subscription_days: subscriptionDays, amount: amt });
            });
            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
        }

        console.log("added data")
        navigate("/")

        toast.success("Payment done succesfully ! Your plan has been extended ! Happy Learning. ")


    }

    const displayRazorpay = async (amount) => {



        console.log("clicked")

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        setTimeout(() => {
            if (!res) {
                toast.error("Cannot process payment ! Check your network")
            }
        }, 2000);


        const options = {
            key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
            currency: "INR",
            amount: amount * 100,
             prefill: {
                contact: registerState.phone_number,
                email: registerState.email
            },
            order_id:order,
            handler:  (response) => {
                console.log(response)
                window.id = response.razorpay_payment_id;
                if(response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature){
                 uploadData();

                }
            }


        }
        

        if(order.length > 0 ){
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            // console.log(order.length)
        }else{
            toast.error("Try Again")
            
        }
       

    }

    return (
        <div style={{ display: "inline", float: "left", padding: "3%", background: "red", border: "none", color: "#ffff", borderRadius: "4px", display: "inline" }}>

            <button onClick={() => displayRazorpay(registerState.amount)} style={{ fontSize: "18px", background: "transparent", border: "none", color: "#ffff" }}>Select Payment Method </button>


        </div>
    )
}

export default Razorpay