import React, { useEffect, useState } from 'react';
import './Login.css'
import welcomeimg from './welcome.jpeg'
import { db } from '../../mindapp/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify'

function Login() {

	const userid = localStorage.getItem('user');
	const navigate = useNavigate();

	useEffect(() => {
		if (!userid ) {
			navigate("/")
		} else {
			navigate("/dashboard")
		}
	}, [])


	const countrycode = "+91";
	const [phoneNumber, setPhoneNumber] = useState(countrycode);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	const handleChange = (e) => {
		setPhoneNumber(e.target.value)
	}

	const [error, seterror] = useState(false)

	const LoginUser = async (e) => {

		e.preventDefault();

		if (Logintype === "student") {

			const q = query(collection(db, "User"), where("phone_number", "==", phoneNumber));
			const querySnapshot = await getDocs(q);

			if (phoneNumber.length >= 12) {

				if (querySnapshot.empty === true) {
					toast.error("Enter your registered mobile number ")
				}

				querySnapshot.forEach((doc) => {
					const phonenumber = doc.data().phone_number;
					const type = doc.data().type;


					if (phoneNumber === phonenumber && type == "student") {
						localStorage.setItem('user', doc.id)
						localStorage.setItem('type', doc.data().type)
						localStorage.setItem('username', doc.data().name)
						localStorage.setItem('mentorid', doc.data().mentor_id)
						localStorage.setItem('number', doc.data().phone_number)

						navigate("/dashboard")
					} else {
						seterror(true);
					}

				})
			}
		} else {
			if (Logintype === "mentor") {
				const menq = query(collection(db, "Mentors"), where("email", "==", email), where("password", "==", password));
				const querySnapshot = await getDocs(menq);


				if (querySnapshot.empty == true) {
					toast.error("Enter correct email and password ")
				} else {
					querySnapshot.forEach((doc) => {

						const email = doc.data().email;
						const type = doc.data().type;

						if (email == email && type == "mentor") {

							localStorage.setItem('user', doc.id)
							localStorage.setItem('type', doc.data().type)
							localStorage.setItem('username', doc.data().name)
							localStorage.setItem('mentorid', doc.data().mentor_id)
							localStorage.setItem('college', doc.data().university)

							navigate("/dashboard")
						} else {
							seterror(true);
						}
					})
				}
			} else {
				if (Logintype === "admin") {
					const admq = query(collection(db, "Mentors"), where("email", "==", email), where("password", "==", password));
					const querySnapshot = await getDocs(admq);

					if (querySnapshot.empty == true) {
						toast.error("Enter correct email and password ")
					}

					querySnapshot.forEach((doc) => {
						const email = doc.data().email;
						const type = doc.data().type;


						if (email == email && type == "admin" && password === password) {

							localStorage.setItem('user', doc.id)
							localStorage.setItem('type', doc.data().type)
							localStorage.setItem('username', doc.data().name)
							localStorage.setItem('password', doc.data().password)

							navigate("/dashboard")
						} else {
							seterror(true);

						}

					})
				}
			}
		}

	}

	const [Logintype, setLogintype] = useState("student")


	return (<>
		<div className="loginpage">

			<div className="loginpage_right">
				<img id='loginimg' src={welcomeimg} alt="" style={{ width: "50%", marginLeft: "-35px" }} />
				<div className='loginpage_container'>

					{Logintype === "student" ? <>
						<h1>Hello Mentee!! 😍</h1>
						<p>Login with your number to continue and start learning from the masters from your field</p>

					</> : null}

					{Logintype === "mentor" ? <>
						<h1>Hello Mentor !!😍</h1>

						<p>Login with your  official email and start mentoring. </p>
						<br />

					</> : null}

					{Logintype === "admin" ? <>
						<h1>Hello  Admin !!😍 </h1>
					</> : null}


					<form onSubmit={LoginUser} >
						{Logintype === "student" ? <>
							<div >
								<label>Phone Number</label>
								<input type="text" placeholder="Enter PhoneNumber" value={phoneNumber} onChange={handleChange} />
								{error === true ? <p style={{ color: "red", fontSize: '14px' }}>Enter correct details</p> : null}

							</div>

							<button type='submit'>
								Mentee Login
							</button>

							<button>
								<a className="switch-btn" style={{ fontSize: "12px", marginTop: "30px", color: "black", textDecoration: "none", background: "#4D9DF8", padding: "2%",  borderRadius: "6px", cursor: "pointer" }} onClick={() => setLogintype("mentor")} >Login As Mentor</a>
							</button>
							<button>
								<a className="switch-btn" style={{ fontSize: "12px", marginTop: "30px", color: "black", textDecoration: "none", background: "#4D9DF8", padding: "2%",  borderRadius: "6px", cursor: "pointer" }} onClick={() => setLogintype("admin")} >Login As Admin</a>
							</button>



						</> : null}


						{Logintype === "mentor" ? <>
							<div >
								<label>Email</label>
								<input type="text" placeholder="Enter email" value={email} onChange={(e) => { setemail(e.target.value) }} />
								<input type="password" placeholder="Enter password" value={password} onChange={(e) => { setpassword(e.target.value) }} />

								{error === true ? <p style={{ color: "red", fontSize: '14px' }}>Enter correct details</p> : null}


							</div>

							<button type='submit'>
								Mentor Login
							</button>

							<button>
								<a className="switch-btn" style={{ fontSize: "12px", marginTop: "30px", color: "black", textDecoration: "none", background: "#4D9DF8", padding: "2%",  borderRadius: "6px", cursor: "pointer" }} onClick={() => setLogintype("student")} >Login As Mentee</a>
							</button>

							<button>
								<a className="switch-btn" style={{ fontSize: "12px", marginTop: "30px", color: "black", textDecoration: "none", background: "#4D9DF8", padding: "2%",  borderRadius: "6px", cursor: "pointer", }} onClick={() => setLogintype("admin")} >Login As Admin</a>
							</button>


						</> : null}

						{Logintype === "admin" ? <>
							<div >
								<label>Email</label>
								<input type="text" placeholder="Enter email" value={email} onChange={(e) => { setemail(e.target.value) }} />
								<input type="password" placeholder="Enter password" value={password} onChange={(e) => { setpassword(e.target.value) }} />

								{error === true ? <p style={{ color: "red", fontSize: '14px' }}>Enter correct details</p> : null}


							</div>

							<button type='submit'>
								Admin Login
							</button>

							<button>
								<a className="switch-btn" style={{ fontSize: "12px", marginTop: "30px", color: "black", textDecoration: "none", background: "#4D9DF8", padding: "2%",  borderRadius: "6px", cursor: "pointer" }} onClick={() => setLogintype("student")} >Login As Mentee</a>
							</button>
							<button>
								<a className="switch-btn" style={{ fontSize: "12px", marginTop: "30px", color: "black", textDecoration: "none", background: "#4D9DF8", padding: "2%",  borderRadius: "6px", cursor: "pointer" }} onClick={() => { setLogintype("mentor"); console.log(Logintype) }} >Login As Mentor</a>
							</button>

						</> : null}


					</form>
				</div>

			</div>
		</div>


	</>
	);
}


export default Login;
