import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { db } from "../Firebase";
import "./register.css";
import { registerInitiate } from "../Store/Actions/AuthAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
const regPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
const regPhone = RegExp(/^01[0125][0-9]{8}$/);
function Register() {
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  const dispatch = useDispatch();

  const [newRole, setNewRole] = useState("Engineer");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    street: "",
    city: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setErros] = useState({
    name: null,
    email: null,
    username: null,
    street: null,
    city: null,
    phone: null,
    password: null,
    confirmpassword: null,
  });

  const changeUserData = (e) => {
    if (e.target.name == "name") {
      setUserData({
        ...userData,
        name: e.target.value,
      });

      setErros({
        ...error,
        name:
          e.target.value.length == 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name == "email") {
      setUserData({
        ...userData,
        email: e.target.value,
      });

      setErros({
        ...error,
        email: reg.test(e.target.value) ? "" : "Invalid email address",
      });
    } else if (e.target.name == "username") {
      setUserData({
        ...userData,
        username: e.target.value,
      });

      setErros({
        ...error,
        username:
          e.target.value.length == 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name == "street") {
      setUserData({
        ...userData,
        street: e.target.value,
      });

      setErros({
        ...error,
        street:
          e.target.value.length == 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name == "city") {
      setUserData({
        ...userData,
        city: e.target.value,
      });

      setErros({
        ...error,
        city:
          e.target.value.length == 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name == "phone") {
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
    } else if (e.target.name == "password") {
      setUserData({
        ...userData,
        password: e.target.value,
      });

      setErros({
        ...error,
        password:
          e.target.value.length == 0
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
          e.target.value.length == 0
            ? "This Field is Required"
            : e.target.value.length < 8
            ? "Min length is 8"
            : e.target.value == userData.password
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
      collection(db, "providers"),
      where("email", "==", userData.email)
    );

    var newProvider;
    const data = await getDocs(q);
    data.forEach((doc) => {
      newProvider = doc.data();
      console.log(doc.id, " => ", doc.data());
    });

    const q2 = query(
      collection(db, "providers"),
      where("email", "==", userData.email)
    );

    var newEngineer;
    const data2 = await getDocs(q2);
    data2.forEach((doc) => {
      newEngineer = doc.data();
      console.log(doc.id, " => ", doc.data());
    });

    console.log(newProvider);
    console.log(newEngineer);
    console.log(newRole);

    if (!newProvider || !newEngineer) {
      // handle error
      // toast("email already in use !");
      // } else {
      console.log("email does not exists");
      let database = "";

      if (newRole === "Engineer") {
        database = "engineers";
      } else {
        database = "providers";
      }
      addDoc(collection(db, database), {
        // ...userData,
        name: userData.name,
        username: userData.username,
        password: userData.password,
        email: userData.email.toLowerCase(),
        emailFormated: userData.email,
        image: "",
        role: newRole,
        experience: "",
        spetialization: "",
        portofolio: [],
        wishlist: [],
        address: [{ city: userData.city, street: userData.street }],
        phone: userData.phone,
        cart: [],
        rate: "",
        feedback: [],
        messages: [],
        timestamp: serverTimestamp(),
      })
        .then(function (res) {
          // alert("added successfuly");
          // history.push("/profile")
          console.log("added successfuly");
        })
        .catch(function (error) {
          console.log("ERROR " + error);
          console.log("ERROR " + error);
        });

      // push record to Firebase
    }
    console.log(newRole);
  };

  return (
    <body className="reg">
      <div className="container">
        <div className="offset-md-3 col-md-6">
          <br />
          <h1 className="h1 text-light"> Sign up </h1> <br />
          <form
            onSubmit={(e) => submitData(e)}
            className="border border-light rounded p-5 blur"
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
                    className="form-control p-2 me-3 "
                    value={userData.city}
                    onChange={(e) => changeUserData(e)}
                  />
                  <p className="text-danger"> {error.city} </p>
                </div>

                <div className="w-100">
                  <input
                    name="street"
                    placeholder="Enter your street"
                    className="form-control p-2 ms-3 w-100"
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
            <div className="mb-3">
              <label className="form-label text-light">Roll</label> <br />
              <select
                name="roll"
                className="form-control  p-2"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="Engineer">Engineer</option>
                <option value="Provider">Provider</option>
              </select>
            </div>
            <br />
            <input
              className="btn btn-outline-light"
              id="btn"
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
          </form>
          <ToastContainer />
          <br /> <br />
        </div>
      </div>
    </body>
  );
}

export default Register;
