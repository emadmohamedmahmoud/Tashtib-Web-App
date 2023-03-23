import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./register.css";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase.js";
import { registerInitiate } from "../Store/Actions/AuthAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
const regPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
const regPhone = RegExp(/^01[0125][0-9]{8}$/);
function Register() {

  const history = useHistory();

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    city: "",
    street: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setErros] = useState({
    name: null,
    email: null,
    username: null,
    city: null,
    street: null,
    phone: null,
    password: null,
    confirmpassword: null,
  });

  const changeUserData = (e) => {
    if (e.target.name === "name") {
      setUserData({
        ...userData,
        name: e.target.value,
      });

      setErros({
        ...error,
        name:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "email") {
      setUserData({
        ...userData,
        email: e.target.value,
      });

      setErros({
        ...error,
        email: reg.test(e.target.value) ? "" : "Invalid email address",
      });
    } else if (e.target.name === "username") {
      setUserData({
        ...userData,
        username: e.target.value,
      });

      setErros({
        ...error,
        username:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "city") {
      setUserData({
        ...userData,
        city: e.target.value,
      });

      setErros({
        ...error,
        city:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "street") {
      setUserData({
        ...userData,
        street: e.target.value,
      });

      setErros({
        ...error,
        street:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "phone") {
      setUserData({
        ...userData,
        phone: e.target.value,
      });

      setErros({
        ...error,
        phone:
          e.target.value.length == 0
            ? "This Field is Required"
            : e.target.value.length < 11 
            ? "Min Length is 11" 
            : regPhone.test(e.target.value) 
            ? ""
            : "Please Enter phone number",
      });
    } else if (e.target.name === "password") {
      setUserData({
        ...userData,
        password: e.target.value,
      });

      setErros({
        ...error,
        password:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 8
            ? "Min Length is 8"
            : regPass.test(e.target.value)
            ? ""
            : "Password should contain uppercase & lowercase letters & special character & numbers",
      });
    } else {
      setUserData({
        ...userData,
        confirmpassword: e.target.value,
      });

      setErros({
        ...error,
        confirmpassword:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 8
            ? "Min length is 8"
            : e.target.value === userData.password
            ? ""
            : "Password and confirm password should be the same",
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push("/profile");
    }
  }, [currentUser, history]);

  const submitData = async (e) => {
    e.preventDefault();

    dispatch(
      registerInitiate(
        userData.email,
        userData.password,
        userData.username,
        userData.phone
      )
    );

    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );

    var newUser;
    const data = await getDocs(q);
    console.log(data);
    data.forEach((doc) => {
      newUser = doc.data();
      console.log(doc.id, " => ", doc.data());
    });

    console.log(newUser);
    console.log(userData.email)

    // if(userData.email !== ""){
      if (!newUser) {
        // handle error
        // toast("email already in use !");
        // alert("email already in use");
      // } else {
        console.log("email does not exists");
        addDoc(collection(db, "users"), {
          // ...userData,
          name: userData.name,
          username: userData.username,
          password: userData.password,
          email: userData.email.toLowerCase(),
          emailFormated: userData.email,
          image: "",
          role: "customer",
          wishlist: [],
          address: [{ city: userData.city, street: userData.street }],
          messages: [],
          phone: userData.phone,
          cart: [],
          timestamp: serverTimestamp(),
        })
          .then(function (res) {
            toast("added successfuly ");
          })
          .catch(function (error) {
            console.log("ERROR " + error);
          });
        // push record to Firebase
      }
    // }
  };

  return (
    <body className="reg">
      <div className="container">
        <div className="offset-md-3 col-md-6">
          <h1 className="h1 text-light pt-5"> Sign up </h1> <br />
          <form
            onSubmit={(e) => submitData(e)}
            className="border border-light blur rounded p-5"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-light">
                Name
              </label>{" "}
              <br />
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className={`form-control p-2 ${error.name && "border-danger"}`}
                value={userData.name}
                onChange={(e) => changeUserData(e)}
              />
              <p className="text-danger"> {error.name} </p>
            </div>

            <div className="mb-3">
              <label className="form-label text-light" htmlFor="email">
                Email
              </label>{" "}
              <br />
              <input
                name="email"
                placeholder="Enter your email"
                className="form-control p-2"
                value={userData.email}
                onChange={(e) => changeUserData(e)}
              />
              <p className="text-danger"> {error.email} </p>
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Username</label> <br />
              <input
                name="username"
                placeholder="Enter your username"
                className="form-control p-2"
                value={userData.username}
                onChange={(e) => changeUserData(e)}
              />
              <p className="text-danger"> {error.username} </p>
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Address</label> <br />
              <div className="d-flex justify-content-between">
                <div className="w-100">
                  <input
                    name="city"
                    placeholder="Enter your city"
                    className="form-control p-2  me-3"
                    value={userData.city}
                    onChange={(e) => changeUserData(e)}
                  />
                  <p className="text-danger"> {error.city} </p>
                </div>

                <div className="w-100">
                  <input
                    name="street"
                    placeholder="Enter your street"
                    className="form-control p-2 ms-3"
                    value={userData.street}
                    onChange={(e) => changeUserData(e)}
                  />
                  <p className="text-danger"> {error.street} </p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Phone</label> <br />
              <input
                name="phone"
                placeholder="Enter your phone"
                className="form-control p-2"
                value={userData.phone}
                onChange={(e) => changeUserData(e)}
              />
              <p className="text-danger"> {error.phone} </p>
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Password</label> <br />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="form-control p-2"
                value={userData.password}
                onChange={(e) => changeUserData(e)}
              />
              <p className="text-danger"> {error.password} </p>
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Confirm Password</label>{" "}
              <br />
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm your password"
                className="form-control p-2"
                value={userData.confirmpassword}
                onChange={(e) => changeUserData(e)}
              />
              <p className="text-danger"> {error.confirmpassword} </p>
            </div>
            <br />
            <input
              className="btn btn-outline-light"
              id="btn1"
              type="submit"
              value={"Sign up"}
              disabled={
                !userData.name ||
                !userData.username ||
                !userData.email ||
                !userData.phone ||
                !userData.street ||
                !userData.city ||
                !userData.password ||
                !userData.confirmpassword ||
                error.name ||
                error.email ||
                error.username ||
                error.phone ||
                error.street ||
                error.city ||
                error.password ||
                error.confirmpassword
              }
            />
          <br /> <br />
            </form>
            <ToastContainer />
            <br/> <br/>
        </div>
        </div>
    </body>
  );
}

export default Register;