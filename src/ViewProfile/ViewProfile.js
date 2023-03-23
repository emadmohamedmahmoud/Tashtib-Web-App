import React, { useEffect, useState } from "react";
import "./ViewProfile.css";
import Carousel from "react-bootstrap/Carousel";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase.js";
import { ToastContainer, toast } from "react-toastify";
import { addProductToCart, deleteFromCart, listCartItems } from "../Store/Actions/CartAction";

function ViewProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const param = useParams();

  const dispatch = useDispatch();

  const history = useHistory();

  const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
  const regPass = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  const cartItems = useSelector((state) => state.cartItemsList.cartItems);

  const [getProvidor, setGetProvidor] = useState({});
  const [getEngineer, setGetEngineer] = useState({});
  const [getProduct, setGetProduct] = useState({});
  const [getUser, setGetUser] = useState({});
  const [product, setProduct] = useState({});
  const [getAddress, setAddress] = useState([]);
  const [getFeedback, setFeedback] = useState([]);
  const [getPortofolio, setPortofolio] = useState([]);
  const [getDB, setGetDB] = useState("");
  const [getDBViewer, setGetDBViewer] = useState("");
  const [getMessage, setMessage] = useState([]);
  const [message, setGetMessages] = useState("");
  const [getViewProvidor, setGetViewProvidor] = useState({});
  const [getViewEngineer, setGetViewEngineer] = useState({});
  const [getViewUser, setGetViewUser] = useState({});
  const [getViewer, setGetViewer] = useState({});
  const [getUser2, setGetUser2] = useState({});

  useEffect(() => {
    getData();
    getViewerData();
  }, []);

  const getViewerData = () => {
    if (currentUser) {
      const q = query(
        collection(db, "providers"),
        where("email", "==", currentUser.email)
      );

      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setGetViewProvidor({ ...doc.data(), id: doc.id });
          if (getViewProvidor) {
            setGetViewer({ ...doc.data(), id: doc.id });
            setGetDBViewer("providers");
          }
          console.log(doc.id, " => ", doc.data());
        });
      });

      const q2 = query(
        collection(db, "engineers"),
        where("email", "==", currentUser.email)
      );

      onSnapshot(q2, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setGetViewEngineer({ ...doc.data(), id: doc.id });
          if (getViewEngineer) {
            setGetViewer({ ...doc.data(), id: doc.id });
            setGetDBViewer("engineers");
          }

          console.log(doc.id, " => ", doc.data());
        });
      });

      const q3 = query(
        collection(db, "users"),
        where("email", "==", currentUser.email)
      );

      onSnapshot(q3, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setGetViewUser({ ...doc.data(), id: doc.id });
          if (getViewUser) {
            setGetViewer({ ...doc.data(), id: doc.id });
            setGetDBViewer("users");
          }
          console.log(doc.id, " => ", doc.data());
        });
      });
    } else console.log("You Should Signin First");
  };

  const getData = () => {
    if (param.role === "Provider") {
      const docRef = doc(db, "providers", param.id);
      onSnapshot(docRef, (snapshot) => {
        setGetProvidor({ ...snapshot.data(), id: snapshot.id });
        setGetUser({ ...snapshot.data(), id: snapshot.id });
        setAddress(snapshot.data().address);
        setFeedback(snapshot.data().feedback);
        setMessage(snapshot.data().messages);
        setPortofolio(snapshot.data().portofolio);
        setGetDB("providers");
      });
    } else if (param.role === "Engineer") {
      const docRef = doc(db, "engineers", param.id);
      onSnapshot(docRef, (snapshot) => {
        setGetEngineer({ ...snapshot.data(), id: snapshot.id });
        setGetUser({ ...snapshot.data(), id: snapshot.id });
        setAddress(snapshot.data().address);
        setFeedback(snapshot.data().feedback);
        setMessage(snapshot.data().messages);
        setPortofolio(snapshot.data().portofolio);
        setGetDB("engineers");
      });
    } else if (param.role === "customer") {
      const docRef = doc(db, "users", param.id);
      onSnapshot(docRef, (snapshot) => {
        setGetUser2({ ...snapshot.data(), id: snapshot.id });
        setGetUser({ ...snapshot.data(), id: snapshot.id });
        setAddress(snapshot.data().address);
        setMessage(snapshot.data().messages);
        setGetDB("users");
      });
    } else {
      const docRef = doc(db, "categories", param.role);
      onSnapshot(docRef, (snapshot) => {
        setGetUser({ ...snapshot.data(), id: snapshot.id });
        console.log(snapshot.data());
        const data = snapshot
          .data()
          .products.filter((item) => item.id === param.id);
        console.log(data);
        setGetProduct(data);
        setGetDB("categories");
      });
    }
  };
  console.log(getUser["products"], getDB);
  console.log(getProduct);

  const [userData, setUserData] = useState({
    city: "",
    street: "",
    title: "",
    caption: "",
    comment: "",
    rating: "",
    img: "",
    image: "",
    newPassword: "",
    confirmpassword: "",
    message: "",
  });

  const [error, setErros] = useState({
    name: null,
    username: null,
    image: null,
    email: null,
    role: null,
    spetialization: null,
    street: null,
    city: null,
    phone: null,
    experience: null,
    img: null,
    title: null,
    caption: null,
    comment: null,
    rating: null,
    password: null,
    newPassword: null,
    confirmpassword: null,
  });
  const cartButtons = document.querySelectorAll(".cart-button");

  cartButtons.forEach((button) => {
    button.addEventListener("click", cartClick);
  });

  function cartClick() {
    let button = this;
    button.classList.add("clicked");
  }
  const addUserData = (e) => {
    if (e.target.name === "img") {
      if (e.target.files[0]) {
        setUserData({
          ...userData,
          img: e.target.files[0],
        });
      }
      setErros({
        ...error,
        img:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "message") {
      setUserData({
        ...userData,
        message: e.target.value,
      });
      setErros({
        ...error,
        message:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "title") {
      setUserData({
        ...userData,
        title: e.target.value,
      });

      setErros({
        ...error,
        title:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "caption") {
      setUserData({
        ...userData,
        caption: e.target.value,
      });

      setErros({
        ...error,
        caption:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "comment") {
      setUserData({
        ...userData,
        comment: e.target.value,
      });

      setErros({
        ...error,
        comment:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "rating") {
      if(e.target.value==='rating'||e.target.value===''){
        setUserData({
          ...userData,
          rating:0,
        });
      }else{
        setUserData({
          ...userData,
          rating: e.target.value,
        })
      }
      setErros({
        ...error,
        // rating: e.target.value === 'rating' ? "This Field is Required" : null,
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
    } else if (e.target.name === "newPassword") {
      setUserData({
        ...userData,
        newPassword: e.target.value,
      });

      setErros({
        ...error,
        newPassword:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 8
            ? "Min Length is 8"
            : regPass.test(e.target.value)
            ? ""
            : "Invalid Password",
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
            : e.target.value === userData.newPassword
            ? ""
            : "Password and confirm password should be the same",
      });
    }
  };
  const changeUserData = (e) => {
    if (e.target.name === "name") {
      setGetUser({
        ...getUser,
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
      setGetUser({
        ...getUser,
        email: e.target.value,
      });

      setErros({
        ...error,
        email: reg.test(e.target.value) ? "" : "Invalid email address",
      });
    } else if (e.target.name === "image") {
      if (e.target.files[0]) {
        setGetUser({
          ...getUser,
          image: e.target.files[0],
        });
      }
      setErros({
        ...error,
        image: e.target.value.length === 0 ? "This Field is Required" : null,
      });
    } else if (e.target.name === "username") {
      setGetUser({
        ...getUser,
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
    } else if (e.target.name === "role") {
      setGetUser({
        ...getUser,
        role: e.target.value,
      });

      setErros({
        ...error,
        role:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 3
            ? "Min Length is 3 Char"
            : null,
      });
    } else if (e.target.name === "experience") {
      setGetUser({
        ...getUser,
        experience: e.target.value,
      });

      setErros({
        ...error,
        experience:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 10
            ? "Min Length is 10 Char"
            : null,
      });
    } else if (e.target.name === "spetialization") {
      setGetUser({
        ...getUser,
        spetialization: e.target.value,
      });

      setErros({
        ...error,
        spetialization:
          e.target.value.length === 0 ? "This Field is Required" : null,
      });
    } else if (e.target.name === "rate") {
      setGetUser({
        ...getUser,
        rate: e.target.value,
      });

      setErros({
        ...error,
        rate: e.target.value.length === 0 ? "This Field is Required" : null,
      });
    } else if (e.target.name === "phone") {
      setGetUser({
        ...getUser,
        phone: e.target.value,
      });

      setErros({
        ...error,
        phone:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value.length < 11
            ? "Min Length is 11"
            : null,
      });
    } else if (e.target.name === "password") {
      setErros({
        ...error,
        password:
          e.target.value.length === 0
            ? "This Field is Required"
            : e.target.value === getUser.password
            ? ""
            : "password is not correct",
      });
    }
  };

  const calcRating = () => {
    getUser.rate = 0;
    let count = 0;

    getFeedback?.forEach((element, index) => {
      getUser.rate += parseInt(element.rating);
      count = index;
    });
    getUser.rate = getUser.rate / (count + 1);

    return getUser.rate;
  };
  const drawStar = (rateing) => {
    let rate = parseInt(rateing);
    var star = [];
    for (let index = 0; index < rate; index++) {
      star.push(<i key={index} className=" fa-star fa-solid"></i>);
    }
    for (let index = 0; index < 5 - rate; index++) {
      star.push(<i key={index + 10} className="fa-star fa-regular"></i>);
    }

    return star;
  };

  const submitData = (e) => {
    e.preventDefault();
  };

  const handleButtonComment = () => {
    if(userData.rating==='')
    {
      getUser.feedback.push({
        comment: userData.comment,
        rating: 0,
      })
    }else{
    getUser.feedback.push({
      comment: userData.comment,
      rating: userData.rating,
    });}

    const docRef = doc(db, getDB, getUser.id);

    updateDoc(docRef, {
      feedback: getUser.feedback,
      rate: getUser.rate,
    })
      .then(() => {
        console.log("done feedback");
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
    console.log(getUser.feedback);
    userData.comment = "";
    userData.rating = "";
  };
  console.log(userData.comment, userData.rating);
  console.log(getProduct);
  console.log(getDB);
  const handleButtonCommentProduct = () => {
    getProduct[0].feedback.push({
      comment: userData.comment,
      rating: userData.rating,
    });

    const docRef = doc(db, "chairs", getProduct[0].id);

    updateDoc(docRef, {
      feedback: getProduct[0].feedback,
      rate: getProduct[0].rate,
    })
      .then(() => {
        console.log("done feedback");
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });

    userData.comment = "";
    userData.rating = "";
  };
  const sendMessage = () => {
    console.log(getDB);
    const docRef2 = doc(db, getDB, getUser.id);
    getUser.messages.push({
      text: userData.message,
      name: getViewer.name,
      uid: getViewer.id,
      role: getViewer.role,
    });
    updateDoc(docRef2, {
      messages: getUser.messages,
    })
      .then(() => {
        toast("Message Sent Succussfully");
        console.log("message sent successfully");
      })
      .catch((error) => {
        console.log("Error" + error);
      });
    getMessage.text = "";
  };

  const exists = (wish) => {
    if (getViewer?.wishlist?.filter((item) => item.id === wish.id).length > 0) {
      return true;
    }

    return false;
  };

  const addToWhishList = (item) => {
    const added = getViewer?.wishlist.find(({ id }) => id === item.id);
    console.log(added);
    if (!added) {
      if (getDB === "engineers" || getDB === "providers") {
        getViewer?.wishlist.push({
          name: item.name,
          id: item.id,
          role: item.role,
        });
      } else {
        getViewer?.wishlist.push({
          name: item.name,
          id: item.id,
          role: item.spetialization,
          spetialization:item.spetialization,
          quantity:1,
          description:item.description,
          price:item.price,
          image:item.image,
        });    
      }
      const docRef = doc(db, getDBViewer, getViewer?.id);
      updateDoc(docRef, {
        wishlist: getViewer?.wishlist,
      })
        .then(() => {
          toast("added to wishlist");
        })
        .catch((error) => {
          console.log("ERROR" + error);
        });
    } else {
      toast("Item is already added!");
    }
  };
  const removeFromWhishList = (item) => {
    const index = getViewer?.wishlist.findIndex(({ id }) => id === item.id);
    getViewer?.wishlist.splice(index, 1);

    const docRef = doc(db, getDBViewer, getViewer?.id);

    updateDoc(docRef, {
      wishlist: getViewer?.wishlist,
    })
      .then(() => {
        toast("item removed from wishlist");
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  };
  console.log(getDB);

  const existsInCart = (product) => {
    if (
      getViewer?.cart?.filter((item) => item.name === product.name).length > 0
    ) {
      return true;
    }

    return false;
  };

  const addToCart = (myProduct) => {
    const exist = getViewer?.cart?.find(({ name }) => name === product.name);
    if (exist) {
      console.log(exist);
    } else {
      // history.push("/Cart");
    }
    console.log(myProduct, currentUser, getViewer, getDBViewer);
    dispatch(addProductToCart(myProduct, currentUser, getViewer, getDBViewer))
      .then(() => {
        console.log("added successfully");
      })
      .catch((error) => {
        toast("error " + error);
      });

      dispatch(listCartItems(getDBViewer, getViewer?.email,true))
  };

  const removeFromCart = (product) => {
    const exist = getViewer?.cart?.find(({ name }) => name === product.name);
    dispatch(deleteFromCart(getViewer, exist.id, getDBViewer));
    dispatch(listCartItems(getDBViewer, getViewer?.email,true))
  };

  return (
    <>
      {getDB === "engineers" || getDB === "providers" || getDB === "users" ? (
        <div id="profile">
          {/* start of header */}
          <div className="header ">
            <div className="container">
              <div className="d-flex align-items-center">
                {/* start op p.p */}

                <div className="d-flex ">
                  <img
                    className="imgprofile"
                    src={
                      getUser.image
                        ? getUser.image
                        : require("../assets/DeaultImages/default3.jpg")
                    }
                    alt=""
                  ></img>
                </div>

                {/* end op p.p */}
                <div className="ps-5">
                  <div className="d-flex">
                    <h2 className="ps-0 fs-1">{getUser.name}</h2>
                    <div className="m-3">{drawStar(calcRating())}</div>
                  </div>
                  <ul className="paths ">
                    <li className="dvider">
                      <Link to="/" className="text-decoration-none text-dark">
                        Home{" "}
                      </Link>
                    </li>
                    <li>My Account</li>
                  </ul>
                  {currentUser ? (
                    exists(getUser) ? (
                      <button
                        className="btn btn-dark"
                        onClick={() => removeFromWhishList(getUser)}
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => addToWhishList(getUser)}
                      >
                        Add to wishlist
                      </button>
                    )
                  ) : (
                    <Link className="btn btn-outline-dark" to="/login">
                      Add to wishlist
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* end of header */}

          {/* start of carousel */}
          <div className="container mt-5">
            <Carousel fade className="align-center w-100 ">
              {getPortofolio?.map((onePort, index) => {
                return (
                  <Carousel.Item key={index} className=" ">
                    <img
                      className="d-block w-100 "
                      height={"400px"}
                      src={onePort.image}
                      alt=""
                    />
                    <Carousel.Caption>
                      <div className="transbox">
                        <h3 className="">{onePort.title}</h3>
                        <p>{onePort.caption}</p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
          {/* end of Carousel */}
          {/*start section buttons and content  */}
          <div className="mt-5  p-5">
            <div className="container">
              <div className="col-12">
                <div className="row">
                  {/* start section of buttons */}

                  <div className="col-xl-3 col-12 mb-5">
                    <div className=" flex-column  nav" role="tablist">
                      <button
                        className="btn btn-outline-dark text-start border-secondary-subtle  rounded-0 p-3 text-uppercase active"
                        type="button"
                        id="info-tab"
                        data-bs-target="#info"
                        data-bs-toggle="tab"
                        role="tab"
                        aria-selected="true"
                      >
                        <i className="pe-2 fa fa-dashboard"></i>
                        info
                      </button>
                      {getDB === "users" ? null : (
                        <button
                          className="btn btn-outline-dark text-start border-secondary-subtle rounded-0 p-3 text-uppercase"
                          type="button"
                          id="feedback-tab"
                          data-bs-target="#feedback"
                          data-bs-toggle="tab"
                          role="tab"
                          aria-controls="feedback"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          <i className="pe-2 fa fa-comment"></i>
                          FeedBack
                        </button>
                      )}
                      <button
                        className="btn btn-outline-dark text-start border-secondary-subtle rounded-0 p-3 text-uppercase"
                        type="button"
                        id="message-tab"
                        data-bs-target="#message"
                        data-bs-toggle="tab"
                        role="tab"
                        aria-controls="message"
                        aria-selected="false"
                        tabIndex="-1"
                      >
                        <i className="pe-2 fa fa-message"></i>
                        Message
                      </button>{" "}
                      <button
                        className="btn btn-outline-dark text-start border-secondary-subtle rounded-0 p-3 text-uppercase"
                        type="button"
                        id="address-tab"
                        data-bs-target="#address-edit"
                        data-bs-toggle="tab"
                        role="tab"
                        aria-controls="address-edit"
                        aria-selected="false"
                        tabIndex="-1"
                      >
                        <i className="pe-2 fa fa-map-marker"></i>
                        address
                      </button>
                    </div>
                  </div>
                  {/* end section of buttons */}
                  {/* start section of content */}
                  <div className="col-xl-9 col-12 w-xl-100">
                    <div className="tab-content" id="myaccountContent">
                      {/* <!-- Single Tab Content Start --> */}

                      <div
                        className="tab-pane fade show active"
                        id="info"
                        role="tabpanel"
                        aria-labelledby="info-tab"
                        tabIndex="0"
                      >
                        <div className="border p-4">
                          <h3 className="border-bottom pb-2 mb-4">Info</h3>

                          <div>
                            <p>
                              <strong>Name :</strong> {getUser.name}{" "}
                            </p>
                            <p>
                              <strong>Email :</strong> {getUser.email}{" "}
                            </p>
                            {getDB === "users" ? null : (
                              <div>
                                <p>
                                  <strong>Role :</strong> {getUser.role}{" "}
                                </p>
                                <p>
                                  <strong>Spectialization :</strong>{" "}
                                  {getUser.spetialization}{" "}
                                </p>
                                <p>
                                  <strong>Experience :</strong>{" "}
                                  {getUser.experience}{" "}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Tab Content End --> */}
                      {/* <!-- Single Tab Content Start --> */}
                      <div
                        className="tab-pane fade"
                        id="feedback"
                        role="tabpanel"
                        aria-labelledby="feedback-tab"
                        tabIndex="0"
                      >
                        <div className="border p-4">
                          <h3 className="border-bottom pb-2 mb-4">FeedBack</h3>

                          {getFeedback?.map((feedback, index) => {
                            return (
                              <>
                                <div
                                  className="bg-body-secondary rounded-3 d-flex m-2 align-items-center"
                                  key={index}
                                >
                                  <p className="m-4 w-75">
                                    <strong>{feedback.comment}</strong>
                                  </p>
                                  <div className="m-4 d-flex justify-content-end w-25">
                                    {drawStar(feedback.rating)}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                          <hr />
                          <form onSubmit={(e) => submitData(e)}>
                            <div className="col-12 ">
                              <textarea
                                className="border m-2 border-secondary-subtle w-100 p-3 d-block "
                                placeholder="Left FeedBack"
                                type="text"
                                name="comment"
                                onChange={(e) => addUserData(e)}
                              />
                              <p className="text-danger ms-2">
                                {" "}
                                <small>{error.comment}</small>{" "}
                              </p>
                            </div>
                            <div className="mb-3 d-flex">
                              <select
                                name="rating"
                                onChange={(e) => addUserData(e)}
                                className="border m-2 border-secondary-subtle w-50 p-3 d-block"
                              >
                                <option selected>rating</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>

                              <div className="m-4 d-flex justify-content-center w-50">
                                {drawStar(userData.rating)}
                              </div>
                            </div>
                            <div className="col-12">
                              {currentUser ? (
                                <button
                                  className="btn btn-outline-dark text-uppercase p-2 m-2"
                                  disabled={
                                    error.rating ||
                                    error.comment ||
                                    userData.comment === ""
                                  }
                                  onClick={() => handleButtonComment()}
                                  type="reset"
                                >
                                  Comment
                                </button>
                              ) : (
                                <Link
                                  className="btn btn-outline-dark text-uppercase p-2 m-2"
                                  to="/login"
                                >
                                  Comment
                                </Link>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* <!-- Single Tab Content End --> */}
                      {/* <!-- Single Tab Content Start --> */}
                      <div
                        className="tab-pane fade"
                        id="message"
                        role="tabpanel"
                        aria-labelledby="message-tab"
                        tabIndex="0"
                      >
                        <div className="border p-4">
                          <h3 className="border-bottom pb-2 mb-4">Message</h3>

                          <form onSubmit={(e) => submitData(e)}>
                            <div className="col-12 ">
                              <textarea
                                className="border m-2 border-secondary-subtle w-100 p-3 d-block "
                                placeholder="Send Message"
                                type="text"
                                name="message"
                                onChange={(e) => addUserData(e)}
                              />
                            </div>
                            <div className="col-12">
                              {currentUser ? (
                                <button
                                  className="btn btn-outline-dark text-uppercase p-2 m-2"
                                  type="reset"
                                  disabled={getMessage.text === ""}
                                  onClick={() => sendMessage()}
                                >
                                  Send
                                </button>
                              ) : (
                                <Link
                                  className="btn btn-outline-dark text-uppercase p-2 m-2"
                                  to="/login"
                                >
                                  {" "}
                                  Send{" "}
                                </Link>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* <!-- Single Tab Content End --> */}
                      {/* <!-- Single Tab Content Start --> */}
                      <div
                        className="tab-pane fade"
                        id="address-edit"
                        role="tabpanel"
                        aria-labelledby="address-tab"
                        tabIndex="0"
                      >
                        <div className="border p-4">
                          <h3 className="border-bottom pb-2 mb-4">
                            Billing Address
                          </h3>
                          {getAddress?.map((address, index) => {
                            return (
                              <>
                                <div key={index}>
                                  <p>
                                    <strong>{address.city}</strong>
                                  </p>
                                  <p>{address.street}</p>
                                </div>
                              </>
                            );
                          })}

                          <p>Mobile: {getUser.phone}</p>
                        </div>
                      </div>
                      {/* <!-- Single Tab Content End --> */}
                    </div>
                  </div>
                  {/* end section of content */}
                </div>
              </div>
            </div>
          </div>
          {/*end section of buttons and content */}
        </div>
      ) : (
        <div className="container">
          {Object.keys(getProduct).map((title) => {
            const products = getProduct[title];
            return (
              <div class="row gy-2 rounded overflow-hidden flex-md-row m-5 shadow-sm h-md-250 position-relative shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <div class="col-lg-7  d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-dark">
                    Product Name
                  </strong>
                  <div className="d-flex">
                    <p class="mb-1 fs-1 fw-bolder text-success-emphasis">
                      {products.name}
                    </p>
                  </div>
                  <div class="mb-1 text-muted">{products.spetialization}</div>
                  <p class="card-text mb-auto">
                    {products.description ? (
                      <p className="card-text mb-auto">
                        {products.description}
                      </p>
                    ) : (
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    )}
                  </p>
                </div>
                <div class="col-lg-5 ">
                  {products.image === "" ? (
                    <img
                      src={require("./../assets/Products/product-1.jpg")}
                      alt=""
                      className=""
                    ></img>
                  ) : (
                    <img
                      className="w-100 rounded"
                      src={products.image}
                      alt=""
                    ></img>
                  )}
                </div>
                <div className="col-lg-7 ">
                  <div className="d-flex align-items-center w-100 ">
                    <p className="fs-3 me-2">Price:</p>
                    <p className=" text-success fs-3 text-danger">
                      {products.price} EGP
                    </p>
                  </div>
                </div>
                <div className="col-lg-5 d-lg-flex text-center align-items-center">
                  {currentUser ? (
                    existsInCart(products) ? (
                      <button
                        class="cart-button btn btn-outline-primary me-lg-2 mb-2 mb-lg-0"
                        onClick={() => removeFromCart(products)}
                      >
                        <span class="">remove from cart</span>
                        <i class="fas fa-shopping-cart"></i>
                        <i class="fas fa-box"></i>
                      </button>
                    ) : (

                      <button
                        class="cart-button btn btn-outline-primary me-lg-2 mb-2 mb-lg-0"
                        onClick={() => addToCart(products)}
                      >
                        <span class="">Add to Cart </span>
                        {/* <i class="fa-solid fa-cart-shopping"></i> */}
                        {/* <i class="fas fa-box"></i> */}
                      </button>
                    )
                  ) : (
                    <Link className="cart-button btn btn-outline-primary me-lg-2 mb-2 mb-lg-0" to="/login">
                        <span class="add-to-cart">Add to Cart </span>
                        {/* <i class="fas fa-box"></i>
                        <i class="fa-solid fa-cart-shopping"></i> */}
                    </Link>
                  )}

                  {currentUser ? (
                    exists(products) ? (
                      <button
                        className="btn btn-dark py-3 w-50"
                        onClick={() => removeFromWhishList(products)}
                      >
                        remove from wishlist
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-dark  py-3 w-50"
                        onClick={() => addToWhishList(products)}
                      >
                        Add to wishlist
                      </button>
                    )
                  ) : (
                    <Link className="btn btn-outline-dark py-3 " to="/login">
                      Add to wishlist
                    </Link>
                  )}
                </div>

                {/*start section buttons and content  */}
                <div className="mt-5 py-4 mb-5">
                  <div className="container">
                    <div className="col-12">
                      <div className="row">
                        {/* start section of buttons */}

                        <div className="col-xl-3 col-12 mb-5">
                          <div className=" flex-column  nav" role="tablist">
                            <button
                              className="btn btn-outline-dark text-start border-secondary-subtle  rounded-0 p-3 text-uppercase active"
                              type="button"
                              id="info-tab"
                              data-bs-target="#info"
                              data-bs-toggle="tab"
                              role="tab"
                              aria-selected="true"
                            >
                              <i className="pe-2 fa fa-dashboard"></i>
                              more info
                            </button>
                          </div>
                        </div>
                        {/* end section of buttons */}

                        {/* start section of content */}
                        <div className="col-xl-9 col-12 w-xl-100">
                          <div className="tab-content" id="myaccountContent">
                            {/* <!-- Single Tab Content Start --> */}

                            <div
                              className="tab-pane fade show active"
                              id="info"
                              role="tabpanel"
                              aria-labelledby="info-tab"
                              tabIndex="0"
                            >
                              <div className="border p-4">
                                <h3 className="border-bottom pb-2 mb-4">
                                  Info
                                </h3>

                                <div className="">
                                  <p>
                                    <strong>Quantity :</strong>{" "}
                                    {products.quantity}{" "}
                                  </p>
                                  {/* <p>
                                      <strong>Rate :</strong> {products.rate}{" "}
                                    </p> */}
                                  <p>
                                    <strong>Category :</strong>{" "}
                                    {products.spetialization}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* <!-- Single Tab Content End --> */}
                            {/* <!-- Single Tab Content Start --> */}
                            <div
                              className="tab-pane fade"
                              id="feedback"
                              role="tabpanel"
                              aria-labelledby="feedback-tab"
                              tabIndex="0"
                            >
                              <div className="border p-4">
                                <h3 className="border-bottom pb-2 mb-4">
                                  FeedBack
                                </h3>

                                {getFeedback?.map((feedback, index) => {
                                  return (
                                    <>
                                      <div
                                        className="bg-body-secondary rounded-3 d-flex m-2 align-items-center"
                                        key={index}
                                      >
                                        <p className="m-4 w-75">
                                          <strong>{feedback.comment}</strong>
                                        </p>
                                        <div className="m-4 d-flex justify-content-end w-25">
                                          {drawStar(feedback.rating)}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                                <hr />
                                <form onSubmit={(e) => submitData(e)}>
                                  <div className="col-12 ">
                                    <textarea
                                      className="border m-2 border-secondary-subtle w-100 p-3 d-block "
                                      placeholder="Left FeedBack"
                                      type="text"
                                      name="comment"
                                      onChange={(e) => addUserData(e)}
                                    />
                                    <p className="text-danger ms-2">
                                      {" "}
                                      <small>{error.comment}</small>{" "}
                                    </p>
                                  </div>
                                  <div className="mb-3 d-flex">
                                    <select
                                      name="rating"
                                      onChange={(e) => addUserData(e)}
                                      className="border m-2 border-secondary-subtle w-50 p-3 d-block"
                                    >
                                      <option selected>rating</option>
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </select>

                                    <div className="m-4 d-flex justify-content-center w-50">
                                      {drawStar(products.rating)}
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <button
                                      className="btn btn-outline-dark text-uppercase p-2 m-2"
                                      disabled={
                                        error.rating ||
                                        error.comment ||
                                        userData.comment ==="" ||
                                        userData.rating ==="rating"
                                      }
                                      onClick={() =>
                                        handleButtonCommentProduct()
                                      }
                                      type="reset"
                                    >
                                      Comment
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default ViewProfile;
