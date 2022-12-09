const functions = require("firebase-functions");

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore()                               
const batch = db.batch();

const  Razorpay =require("razorpay");

const instance = new Razorpay({ key_id: "rzp_live_qdOLUuGhVMwBo4", key_secret:"SfXFAv7jbY4ShYBFtJN84wKv" })
const express = require("express")
const bodyparser = require("body-parser")
  
const cors = require('cors');

const app = express(); 



app.use(cors({origin: true,}));
app.use(bodyparser.json());

app.get("/get",(req,res)=>{
    res.status(200).send("Hello this function runs");
})

app.post("/order",async(req, res) => {
      try{
        const amt = req.body.amount;
        console.log(amt)
        console.log("Body",req.body)
        const order = await instance.orders.create({
            amount:amt,
            currency: 'INR',
            payment_capture: 1
          });
        res.send(order);
    }catch(e){
        console.log("The error is this",e);
        res.status(403).send({error: 'Something went wrong',e});
    }
  
  })

exports.createOrder = functions.https.onRequest(app);



exports.UpdateSubscription = functions.pubsub.schedule('0 0 * * *')
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {

    const UserRef = db.collection("User")
    const snapshot = await UserRef.where("type", "==", "student").get();

    const arr = []
    snapshot.forEach((doc) => {
      arr.push(doc.id)
    });

    // const promises = []


    arr.forEach(async (d) => {
      const sfDocRef = db.collection('User').doc(d);
     
      return db.runTransaction(async (transaction) => {
       const sfDoc = await transaction.getAll(sfDocRef);


        const subscriptionDays = sfDoc.data().subscription_days - 1;
        if (sfDoc.data().subscription_days == 1) {
          // updatementeecount(sfDoc.data().mentor_id);
        console.log("Deleted user",sfDoc.data().name ,sfDoc.id )

        return transaction.delete(sfDocRef); 

         
        }
        else {
              console.log("student ==> ", sfDoc.data().name, subscriptionDays , sfDoc.data().subscription_days)
       return transaction.update(sfDocRef, { subscription_days: subscriptionDays })
        }

      });  

    })
  });


exports.UpdateMentorImpactpoints = functions.pubsub.schedule('0 0 * * *')
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {

    const UserRef = db.collection("Mentors")
    const snapshot = await UserRef.get();

    const promises = []

    const arr = []
    snapshot.forEach((doc) => {
      console.log("mentor",doc.id)
      arr.push(doc.id)
    });

    arr.forEach(async (d) => {
      const sfDocRef = db.collection("Mentors").doc(d)

     return db.runTransaction(async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);

        const impactpoints = sfDoc.data().mentee_count + sfDoc.data().impact_points;
        const totalimpactpoints = sfDoc.data().mentee_count + sfDoc.data().total_impact_points;
        const workingdays = sfDoc.data().working_days + 1;

        promises.push(
          transaction.update(sfDocRef,{
            impact_points: impactpoints,
            total_impact_points: totalimpactpoints,
            working_days: workingdays
          }))

      });
    })

    return Promise.all(promises).then(()=>{
      console.log("Updated impact points!");

    }).catch((error)=>{
      console.error("Impact points not updated ", error)
    })

  })


// exports.UpdateMenteeCount2 = functions.pubsub.schedule('0 0 * * *')
//   .timeZone("Asia/Kolkata")
//   .onRun(async (context) => {

//     const UserRef = db.collection("User")
//     const snapshot = await UserRef.where("type", "==", "mentor").get(); //gets all mentors

//     const mentorArray = []
//     snapshot.forEach(async (doc) => {

//       const menid = { id: doc.id }

//       const snapshot = await UserRef.where("type", "==", "student").where("mentor_id", "==", doc.id).get(); //students for every mentor

//       const countarr = []
//       snapshot.forEach((element) => {
//         countarr.push(element.data())
//       })

//       const count = { count: countarr.length }

//       mentorArray.push({ ...menid, ...count });

//     });

//     if (mentorArray.length > 0) {
//       mentorArray.forEach((data) => {

//         const sfRef = db.collection('User').doc(data.id);
//         return batch.update(sfRef, { mentee_count: data.count });

//       })
//     }

//   })

exports.UpdateMenteeCount = functions.pubsub.schedule('45 23 * * *')
.timeZone("Asia/Kolkata")
.onRun(async (context) => {

  const UserRef = db.collection("User")
  const snapshot = await UserRef.where("type", "==", "student").get();

  snapshot.forEach((element)=>{
     const studentData = element.data();
    // const studentData = change.after.data(); //gives the after change data ! 
    // console.log(studentData)
    
    if (studentData.subscription_days === 1) { //if subscription ==1 then runs the next part 

      // docs where id == studentdata.mentor_id
      console.log("student name: ", studentData.name)
      console.log("mentor-id:",studentData.mentor_id)

      const MentorsDocRef =  db.doc(`Mentors/${studentData.mentor_id}`) // docs where id = mentorid 
      const promises =[];
          try {
            console.log("mentee count runs")
          db.runTransaction(async (transaction) => {      
            const sfDoc = await transaction.get(MentorsDocRef);
  
            const menteeCount = sfDoc.data().mentee_count -1;
              console.log(sfDoc.id," ",menteeCount)
  
             promises.push(  
              transaction.update(MentorsDocRef,
              {
                mentee_count: menteeCount
              }))
           
  
          });
          console.log("Mentee count updated !");
        } catch (error) {
          console.log("Mentee count failed !",error);
            
        }

        return Promise.all(promises).then(()=>{
          console.log("Mentee count updated successfully ! ")
        })
       
    } else {
      console.log("Mentee count operation failed")
    }
  })


  });




