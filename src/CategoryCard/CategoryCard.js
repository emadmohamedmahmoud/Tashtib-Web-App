import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import { addProductToCart, CartCounter, listCartItems } from "../Store/Actions/CartAction";
import "./Category.css";
import { ToastContainer } from "react-toastify";

const CategoryCard = (props) => {
  const cartItems = useSelector((state) => state.cartItemsList.cartItems);


  const product = props.products;

  const { id, name, price, image, spetialization } = product;

  const dispatch = useDispatch();

  const [getDB, setGetDB] = useState("");
  const [getUser, setGetUser] = useState({});
  const [getCustomer, setGetCustomer] = useState({});
  const [getProvider, setGetProvider] = useState({});
  const [getEngineer, setGetEngineer] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) getData();
  }, []);

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
      });
    });
  };

  const exists = (wish) => {
    if (getUser?.wishlist?.filter((item) => item.id === wish.id).length > 0) {
      return true;
    }

    return false;
  };

  const addToWhishList = (item) => {
    console.log(db, getDB, getUser?.id);
    const added = getUser?.wishlist.find(({ id }) => id === item.id);
    if (!added) {
        getUser?.wishlist.push({
          name: item.name,
          id: item.id,
          role: item.spetialization,
          spetialization:item.spetialization,
          quantity:1,
          description:item.description,
          price:item.price,
          image:item.image,
        });        
     
      const docRef = doc(db, getDB, getUser?.id);
      updateDoc(docRef, {
        wishlist: getUser?.wishlist,
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
    const index = getUser?.wishlist.findIndex(({ id }) => id === item.id);
    getUser?.wishlist.splice(index, 1);

    const docRef = doc(db, getDB, getUser?.id);

    updateDoc(docRef, {
      wishlist: getUser?.wishlist,
    })
      .then(() => {
        toast("item removed from wishlist");
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  };
  
  const existsInCart = (product) => {
    if (
      getUser?.cart?.filter((item) => item.name === product.name).length > 0
    ) {
      return true;
    }

    return false;
  };

  const addToCart = () => {
    const exist = getUser?.cart?.find(({ name }) => name === product.name);
    if (exist) {
      console.log(exist);
    } else {
      // history.push("/Cart");
      console.log("not exist");
    }
    console.log(product, currentUser, getUser, getDB);

    dispatch(addProductToCart(product, currentUser, getUser, getDB))
      .then(() => {
        console.log("added successfully");
      })
      .catch((error) => {
        toast("error " + error);
      });

      dispatch(listCartItems(getDB, currentUser?.email,true))
  };

  return (
    <div className=" contain col-lg-3 col-md-6  col-sm-12 d-block pt-4 pb-4 card-Eng ">
      <div className=" overflow-hidden position-relative text-center">
        <div className="card-img overflow-hidden">
          <img
            src={
              image
                ? image
                : require("../assets/DeaultImages/defaultProductImage.jpg")
            }
            alt={`${name}`}
            className="img-fluid img w-100 h-100"
          />
        </div>

        <div className=" footer text-center mb-2 mt-1 d-flex flex-row justify-content-between ">
          <span className="name ">{name}</span>
          <span className="price ">{price} EGP</span>
        </div>
        <div className="  Item-Icon  rounded-circle position-absolute  py-4 ">
          {currentUser ? (
            existsInCart(product) ? (
              <div className=" view-Icon bg-warning my-2 Icon-shape rounded-circle ">
                <i
                  className="fa-solid fa-cart-shopping text-white"
                  onClick={addToCart}
                ></i>
              </div>
            ) : (
              <div className=" view-Icon bg-white my-2 Icon-shape rounded-circle ">
                <i
                  className="fa-solid fa-cart-shopping"
                  onClick={addToCart}
                ></i>
              </div>
            )
          ) : (
            <Link
              className=" view-Icon bg-white my-2 Icon-shape rounded-circle "
              to="/login"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          )}

          {currentUser ? (
            exists(product) ? (
              <div className=" favorite-Icon bg-danger Icon-shape rounded-circle ">
                <i
                  className="fa-solid fa-heart text-white"
                  onClick={() => removeFromWhishList(product)}
                ></i>
              </div>
            ) : (
              <div className=" favorite-Icon bg-white Icon-shape rounded-circle ">
                <i
                  className="fa-regular fa-heart"
                  onClick={() => addToWhishList(product)}
                ></i>
              </div>
            )
          ) : (
            <Link
              className="favorite-Icon bg-white Icon-shape rounded-circle"
              to="/login"
            >
              <i className="fa-regular fa-heart"></i>
            </Link>
          )}
        </div>
        <Link to={`/view/${spetialization}/${id}`}>
          <button className="rounded-5 px-4 py-2 text-center btn btn-outline-dark">
            View Product
          </button>
        </Link>
      </div>
      <div></div>
      <ToastContainer />
    </div>
  );
};

export default CategoryCard;
