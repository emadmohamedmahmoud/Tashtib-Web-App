import {
  collection,
  getDocs,
  query
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CategoryPreview from "../CategoryPreview/CategoryPreview";
import { db } from "../Firebase";
import "./Category.css";
import { Link } from 'react-router-dom';

const Category = () => {

  const [getCategory, setGetCategory] = useState([]);

  useEffect(() => {
    const getCategoryMap = async () => {
    const categorymap = await getProducts();
    console.log(categorymap);
    }

    getCategoryMap()
  }, []);

  const getProducts = async () => {

    const collectionRef = collection(db, "categories");

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q)

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, products} = docSnapshot.data();
        acc[title] = products;
        setGetCategory(acc);
        return acc;
    }, {})

    return categoryMap;
  };
    console.log(getCategory);

  return (
    <>
        <div id="AboutHero">
          <div className="header ">
              <div className="container">
                  <div className="d-flex align-items-center">
                      <div className="ps-5">
                          <h2 className="h1">Shop</h2>
                          <ul className="paths">
                              <li className="dvider">
                                  <Link to="/" className="text-decoration-none text-dark">
                                  Home{" "}
                                  </Link>
                              </li>
                              <li>Shop</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      <div className="container py-5">
        <h2 className="h1 fw-bold text-center">Shop Now</h2>
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line1"></div>
        <div className="row">
        <p>{Object.keys(getCategory).map((title) => {
          const products = getCategory[title];
          return(
            <div className="container">
            <CategoryPreview key={title} title={title} products={products} />
            </div>
          )
          })}</p>
          </div>
      </div>
    </>
  );
};

export default Category;
