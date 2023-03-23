import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../Register/register.css";
import { loginInitiate } from "../Store/Actions/AuthAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


// const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
//  const regPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
function Login() {

    const history = useHistory();

    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();

  
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const [error, setErros] = useState({
        email: null,
        password: null,
    })

    const changeUserData = (e) => {
        
        if (e.target.name === "email") {
            setUserData({
                ...userData,
                email: e.target.value
            })

            setErros({
                ...error,
                email:e.target.value.length == 0?'This Field is Required':""
            })
        }
        else {
            setUserData({
                ...userData,
                password: e.target.value
            })

            setErros({
                ...error,
                password: e.target.value.length == 0 ? "This Field is Required" : "" 
            })
        }
    }

    useEffect(() => {
        if(currentUser){
            history.push("profile")
        }
    }, [currentUser, history])

      
    const submitData = (e) => {
        e.preventDefault()

        dispatch(loginInitiate(userData.email, userData.password))
        
    }

    return (
        <body className="reg" >
        <div className="container">
            <h1 className="h1 text-light pt-5"> Login  </h1>
            <br/>
            <div className="offset-md-3 col-md-6">
            <form onSubmit={(e) => submitData(e)} className="border border-light login blur rounded p-5" >

                <div className="mb-3">
                    <label className="form-label text-light" htmlFor="email">Email</label> <br/>
                    <input name="email" className="form-control p-2" placeholder="Enter your email" value={userData.email} onChange={(e) => changeUserData(e)} />
                    <p className="text-danger"> {error.email} </p>
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Password</label>  <br/>
                    <input type="password" name="password" className="form-control p-2" placeholder="Enter your password" value={userData.password} onChange={(e) => changeUserData(e)} />
                    <p className="text-danger"> {error.password} </p>
                </div>
                <input className="btn btn-outline-light" id="btn2" type="submit" value={'Login'} disabled={!userData.email || !userData.password || error.email || error.password} />
            </form>
            <ToastContainer />
            <br/>
        </div>
        <h3 className="text-center text-white">You don't have an account: <Link className="text-decoration-underline text-white border-0 fs-4 fw-bolder"  to={"/firstreg"}>SignUp</Link></h3>
        </div>
        </body>
    )



}

export default Login;