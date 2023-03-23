import { collection, onSnapshot, query, where,doc,updateDoc,addDoc, setDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { db } from "../Firebase";
import { listCartItems } from "../Store/Actions/CartAction";
import "./CartComponent.css";
import StripeCheckout from 'react-stripe-checkout';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from "react-toastify";

const CartComponent = () => {
  const cartItems = useSelector((state) => state.cartItemsList.cartItems);

  console.log(cartItems);

  const dispatch = useDispatch();

  const [getDB, setGetDB] = useState("");
  const [getCustomer, setGetCustomer] = useState({});
  const [getProvider, setGetProvider] = useState({});
  const [getEngineer, setGetEngineer] = useState({});
  const [getUser, setGetUser] = useState({});
  const [getOrder, setOrder] = useState({});


  const { currentUser } = useSelector((state) => state.user);

  const getData = () => {
    const q = query(
      collection(db, "providers"),
      where("email", "==", currentUser.email)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setGetProvider({ ...doc.data(), id: doc.id });
        if (getProvider) {
          setGetUser({ ...doc.data(), id: doc.id });
          setGetDB("providers");
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
        setGetEngineer({ ...doc.data(), id: doc.id });
        if (getEngineer) {
          setGetUser({ ...doc.data(), id: doc.id });
          setGetDB("engineers");
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
        setGetCustomer({ ...doc.data(), id: doc.id });
        if (getCustomer) {
          setGetUser({ ...doc.data(), id: doc.id });
          setGetDB("users");
        }
        console.log(doc.id, " => ", doc.data());
        console.log(getCustomer);
      });
    });
    console.log(getDB);

    return getDB;
  };

  console.log(getDB);

  useEffect(() => {
    if (currentUser) {
      getData();
      dispatch(listCartItems(getDB, currentUser.email,true));
      console.log(getDB);

    } else {
      console.log("no user");
    }
  }, [currentUser, dispatch, getDB]);

  const onToken = (token) => {
    addToOrders();
    console.log(token)
  }

  var settings = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    speed: 6000,
    arrows: false,
  };

  const addToOrders = () => {
    const oid = new Date().getTime() + getUser.email;

    setOrder({
      id: oid,
      name:getUser.name,
      email:getUser.email,
      image:getUser.image,
      order:cartItems
    })

    // const docRef = doc(db,'orders',getUser.id,getUser.email);
    addDoc(collection(db, "orders"), {
      getOrder
    })
      .then(() => {
        console.log("added to Orders");
      })
      .catch((error) => {
        console.log("ERROR on add orders" + error);
      });

      const docRef = doc(db, getDB, getUser?.id);
      updateDoc(docRef, {
        cart: [],
      })
        .then(() => {
          toast("success bayment");
          window.location.reload();
        })
        .catch((error) => {
          console.log("ERROR" + error);
        });
  };

  return (
    <div>
      <div id="AboutHero">
        <div className="header ">
          <div className="container">
            <div className="d-flex align-items-center">
              <div className="ps-5">
                <h2 className="h1">Shopping Cart</h2>
                <ul className="paths">
                  <li className="dvider">
                    <Link to="/" className="text-decoration-none text-dark">
                      Home{" "}
                    </Link>
                  </li>
                  <li>Shopping Cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cartItems?.length === 0 ? (
        <div className="text-center mb-5 mt-5">
          <img
            src={require("../assets/cart/empty-cart.png")}
            alt="no cart items"
          />
          <h2 className="fw-bolder fs-3 cart">No items in your cart!</h2>
        </div>
      ) : (
        <div className=" cart-section section pt-90 pt-lg-70 pt-md-60 pt-sm-50 pt-xs-45  pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20 mt5 ">
          <div className="container py-5">
            <h2 className="h1 fw-bold text-center">Cart</h2>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line1"></div>
            <div className="row py-5">
              <div className="col-12">
                <div className="cart-table table-responsive mb-30">
                  <table className="table">
                    <thead className="Cart-table-head">
                      <tr>
                        <th className="pro-thumbnail">Image</th>
                        <th className="pro-title">Product</th>
                        <th className="pro-price">Price</th>
                        <th className="pro-quantity">Quantity</th>
                        <th className="pro-subtotal">Total</th>
                        <th className="pro-remove">Remove</th>
                      </tr>
                    </thead>
                    {cartItems?.map((item) => (
                      <Cart cartItem={item} user={getUser} database={getDB} />
                    ))}
                  </table>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Total: {cartItems?.reduce(function (acc, item) {
                  return acc + item.quantity * item.price;
                }, 0)} EGP</h2>

                <StripeCheckout
                  className="  btn btn-dark py-2 px-2 "
                  token={onToken}
                  name="Tashtib Payment"
                  currency="USD"
                  amount={cartItems?.reduce(function (acc, item) {
                    return acc + item.quantity * item.price;
                  }, 0)}
                  stripeKey="pk_test_51MjONIGFP9mleeqXzwIgHARKFUsnPzGg5WkYtfbVrknjsR9f7y8nAArefFFzgLnD9hsa12bkBASJPyU2XixDuicE00Vo38WcKv"
                  
                />

              </div>
              <Slider {...settings} className='w-100 m-auto text-center'>
                <img  src={require('../assets/testemonial/payment.png')} alt='payment Methods' className="pay-Image  opacity-25 mt-5 " />
                <img src={require('../assets/testemonial/payment.png')} alt='payment Methods' className="pay-Image  opacity-25 mt-5 " />
              </Slider>
            </div>
          </div>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartComponent;
