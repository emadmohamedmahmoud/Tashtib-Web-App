import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { listCartItems } from "../Store/Actions/CartAction";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query,
} from "@firebase/firestore";
import { db } from "../Firebase";
import { logoutInitiate } from "../Store/Actions/AuthAction";

function Navbar() {

  const [getDB, setGetDB] = useState("");
  const [getCustomer, setGetCustomer] = useState({});
  const [getProvider, setGetProvider] = useState({});
  const [getEngineer, setGetEngineer] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  const {cartItems} = useSelector((state) => state.cartItemsList);

  const size = cartItems?.length;

  const dispatch = useDispatch()

  useEffect(() => {
      getData();
    
    cartItemsFunction();
  }, [currentUser]);


  const getData = () => {
    if(currentUser){
    const q = query(
      collection(db, "providers"),
      where("email", "==", currentUser?.email)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setGetProvider({ ...doc.data(), id: doc.id });
        if (getProvider) {
          setGetDB("providers");
        }
        console.log(doc.id, " => ", doc.data());
      });
    });

    const q2 = query(
      collection(db, "engineers"),
      where("email", "==", currentUser?.email)
    );

    onSnapshot(q2, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setGetEngineer({ ...doc.data(), id: doc.id });
        if (getEngineer) {
          setGetDB("engineers");
        }

        console.log(doc.id, " => ", doc.data());
      });
    });

    const q3 = query(
      collection(db, "users"),
      where("email", "==", currentUser?.email)
    );

    onSnapshot(q3, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setGetCustomer({ ...doc.data(), id: doc.id });
        if (getCustomer) {
          setGetDB("users");
        }
        console.log(doc.id, " => ", doc.data());
      });
    });
  }
  };

  const cartItemsFunction = () => {
    dispatch(listCartItems(getDB, currentUser?.email,true))
  }

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bolder  fs-2" to="/">
          <span className="colored fw-bolder">TASH</span>TIB
          <span className="colored fw-bolder">.</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 ">
            <li className="nav-item px-lg-1">
              <NavLink className="nav-link fs-5" aria-current="page" to="/Home">
                Home
              </NavLink>
            </li>
            <li className="nav-item px-lg-1">
              <NavLink
                className="nav-link fs-5"
                aria-current="page"
                to="/category"
              >
                Shop
              </NavLink>
            </li>

            <li className="nav-item px-lg-1">
              <NavLink
                className="nav-link fs-5"
                aria-current="page"
                to="/About"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item px-lg-1">
              <NavLink
                className="nav-link fs-5"
                aria-current="page"
                to="/Contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className=" d-flex">
            <ul className="navbar-nav ms-lg-auto me-sm-auto mb-2 mb-lg-0 me-2">
              {currentUser ? (
                <>
                  <li className="nav-item px-lg-1">
                    <NavLink
                      className="nav-link fs-5"
                      aria-current="page"
                      to="/Cart"
                    >
                      {cartItems?.length > 0 ? (
                        <Badge badgeContent={size} color={"primary"}>
                          <i class="fa-solid fa-cart-shopping"></i>
                        </Badge>
                      ) : (
                        <i class="fa-solid fa-cart-shopping"></i>
                      )}
                    </NavLink>
                  </li>
                  <li className="nav-item px-lg-1">
                    <NavLink
                      className="nav-link fs-5"
                      aria-current="page"
                      to="/Profile"
                    >
                      <i class="fa-regular fa-user"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item px-lg-1">
                    <NavLink
                      className="nav-link fs-5"
                      aria-current="page"
                      to="/login"
                      onClick={handleAuth}
                    >
                      <i className="pe-1 fa fa-sign-out"></i>
                    </NavLink>
                  </li>
                  
                </>
              ) : (
                <li className="nav-item px-lg-1">
                  <NavLink
                    className="nav-link fs-5"
                    aria-current="page"
                    to="/login"
                  >
                    <i class="fa-solid fa-right-to-bracket"></i>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
