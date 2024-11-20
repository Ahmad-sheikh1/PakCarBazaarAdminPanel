import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import axios from 'axios'
import { baseuRL } from '../../app/api'
import { useDispatch, useSelector } from "react-redux"
import { LoginUserData } from './loginSlice'




function Login() {

    const INITIAL_LOGIN_OBJ = {
        password: "",
        email: ""
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)
    const [hide, setHide] = useState(false)

    const Login = async () => {
        try {
            const res = await axios.post(`${baseuRL}/api/userAccount/admin/login`, loginObj);
            console.log(res.data.data);
            if (res.data) {
                localStorage.setItem("token", res.data.token);
                window.location.href = '/app/dashboard';
                dispatch(LoginUserData(res.data.isExists));
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login Error: ", error);
        }
    }
    

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
    
        if (!loginObj.email.trim()) {
            setErrorMessage("Email Id is required!");
            setLoading(false);
            return;
        }
    
        if (!loginObj.password.trim()) {
            setErrorMessage("Password is required!");
            setLoading(false);
            return;
        }
    
        Login();  // If validation passed, proceed to login
    }
    
    // const user = useSelector(state => state.login.User)


    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }
    // console.log(user);
    const toggelhide = () => {
        setHide(!hide)
    }
    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />

                                <InputText hide={hide} toggelhide={toggelhide} defaultValue={loginObj.password} type={hide ? "password" : "text"} updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            {/* <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div> */}

                            {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                            {/* <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login