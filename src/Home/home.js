import React from 'react'
import './home.css'
import Header from '../Header/header'
import Banners from '../Banners/banners'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "./../Firebase";
import { useDispatch, useSelector } from 'react-redux'
import {
  collection,
  onSnapshot,
  query,
  limit,
  orderBy
} from "firebase/firestore";

import Testmonial from '../testmonials/testmonials' ;
// import Footer from '../Footer/footer';

function Home()
{
    const [dataEng, setDataEng] = useState([]);
    const [dataCont, setDataCont] = useState([]);

    const [dataCategory, setDataCategory] = useState([]);
    const [dataEngFilter, setDataEngFilter] = useState([]);
    const [dataContFilter, setDataContFilter] = useState([]);
    const [dataProFilter, setDataProFilter] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [keyword, setKeyword] = useState("providers");
    const [operation, setOperation] = useState("");
    const dataEngColl = query(collection(db, "engineers"),orderBy("rate","asc"), limit(4) );
    const dataContColl = query(collection(db, `providers`), limit(4), orderBy("rate","asc"));
    // const dataProdColl = query(collection(db, `products`), limit(4));
    console.log(dataEngColl);
    const dataRef = collection(db, `${keyword}`);
    const [getDB, setGetDB] = useState("");
    const [getUser2, setGetUser2] = useState({});
    const [getProvidor, setGetProvidor] = useState({});
  const [getEngineer, setGetEngineer] = useState({});
  const [getCustomer, setGetCustomer] = useState({});
    const dispacth = useDispatch()
    const history = useHistory();
    const loadDataFilter = async () => {
      if(keyword==="engineers"){
        const dataRefEng = collection(db, "engineers");
        onSnapshot(dataRefEng, (snapshot) => {
          setDataEngFilter(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              role: doc.data().role,
              phone: doc.data().phone,
              rate: doc.data().rate,
              spetialization: doc.data().spetialization,
              image : doc.data().image
            }))
          );
        });
        
      }else if(keyword==="providers"){
        const dataRefCont = collection(db, "providers");
        onSnapshot(dataRefCont, (snapshot) => {
          setDataContFilter(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              role: doc.data().role,
              phone: doc.data().phone,
              rate: doc.data().rate,
              spetialization: doc.data().spetialization,
              image : doc.data().image
            }))
          );
        });
      }else{
        const dataRefPro = collection(db, "categories");
        onSnapshot(dataRefPro, (snapshot) => {
          setDataProFilter(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              title: doc.data().title,
              products: doc.data().products,
              spetialization: doc.data().spetialization,
              image : doc.data().image
            }))
          );
        });

      }
     
    };
    const loadDataEng = async () => {
      onSnapshot(dataEngColl, (snapshot) => {
        setDataEng(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            role: doc.data().role,
            phone: doc.data().phone,
            rate: doc.data().rate,
            spetialization: doc.data().spetialization,
            image : doc.data().image
          }))
        );
      });
    };
    
    const loadDataCont = async () => {
      onSnapshot(dataContColl, (snapshot) => {
        setDataCont(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            role: doc.data().role,
            phone: doc.data().phone,
            rate: doc.data().rate,
            spetialization: doc.data().spetialization,
            image : doc.data().image
          }))
        );
      });
    };
    const loadDataCategory = async () => {
      const collectionRef = collection(db, "categories");

      const q = query(collectionRef, limit(4));

      onSnapshot(q, (snapshot) => {
        setDataCategory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            products: doc.data().products,
            spetialization: doc.data().spetialization,
            image : doc.data().image
          }))
        );
      });
    };

    const handleFilter = (e) => {
      let value = e.target.value;
      setSortValue(value);
      setOperation("filter");
      setKeyword(value);
    };
  
    const handleRest = async () => {
      setOperation("");
      setSearchValue("");
      setSortValue("");
      loadDataEng();
      loadDataCont();
      loadDataCategory();
    };
    const handleSearch = async (e) => {
      e.preventDefault();
      loadDataEng();
      loadDataCont();
      loadDataCategory();
    };
    
    useEffect(() => {
      loadDataEng();
      loadDataCont();
      loadDataCategory();
      loadDataFilter();
    
      }, [keyword]);

    return(
        <div className='bg-white'>
          <Header></Header>
          <Banners></Banners>


          <div className="container">
           <div className=" row d-flex justify-content-evenly w-75 mx-auto">
              <div className="col-lg-6 mt-3 d-flex flex-row">
                <h3 className="col-xl-5 col-md-5">Filter By Category:</h3>
                <select
                  onChange={(e) => handleFilter(e)}
                  className="form-select "
                  value={sortValue}
                >
                  <option selected>Select By Category</option>
                  <option value="engineers">Engineers</option>
                  <option value="providers">Providers</option>
                  <option value="categories">Product Categories</option>
                </select>
              </div>
              <div className='col-lg-6 mt-3 d-flex flex-row'>
                  <Form className="d-flex flex-row w-100" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Search By Specialization..."
                      className="me-2 w-75"
                      aria-label="Search"
                      value={searchValue}
                      onChange={(e) => 
                          setSearchValue(e.target.value)
                      }
                    />
                    <Button variant="outline-danger ms-2 w-25" onClick={() => handleRest()}>
                      Reset
                    </Button>
                  </Form>
              </div>
            </div>
      {operation === "filter" ? (
        <section id="Popular-Eng" className="pt-5">
          <div className="container text-center">
            <h2 className="fw-bold">{keyword}</h2>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line1"></div>
            <div className="row py-3 gy-2">
              {keyword==="engineers"?(
                dataEngFilter.filter(user=>user.spetialization.toLowerCase().includes(`${searchValue}`.toLowerCase())).map((item) => {
                  return(
                      
                      <div className="col-lg-3">
                      <div className="card-Eng position-relative">
                        <div className="card-Eng-img">
                        <div className='card-Eng-img category-Img overflow-hidden'>
                           <img src={item.image?item.image:require("../assets/DeaultImages/default3.jpg")} className='w-100 h-100' alt=''/>
                        </div>
                        </div>
                        <h3 className="py-2">{item.name}</h3>
                        <div className="d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1">
                          {item?.rate && (
                            <>
                              <i class="fa-solid fa-star star pe-1 text-warning"></i>
                              <p className="mb-0 star text-warning">
                                {item?.rate?.toFixed(1)}
                              </p>
                            </>
                          )}
                          {!item.rate && null}
                        </div>
                       
                        <div className="Item-Icon position-absolute rounded-circle  py-4">
                          
                          <Link  className='text-decoration-none text-success-emphasis' to={`view/${item.role}/${item.id}`}> <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                            <i className="fa-regular fa-eye"></i>
                            </div>
                            </Link>
                        </div>
                      </div>
                    </div>
                  )
          
                })
              ):keyword==="providers"?(
                dataContFilter.filter(user=>user.spetialization.toLowerCase().includes(`${searchValue}`.toLowerCase())).map((item) => {
                  return(
                      
                      <div className="col-lg-3">
                      <div className="card-Eng position-relative">
                        <div className="card-Eng-img">
                        <div className='card-Eng-img category-Img overflow-hidden'>
                           <img src={item.image?item.image:require("../assets/DeaultImages/default3.jpg")} className='w-100 h-100' alt=''/>
                        </div>
                        </div>
                        <h3 className="py-2">{item.name}</h3>
                        <div className="d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1">
                          {item?.rate && (
                            <>
                              <i class="fa-solid fa-star star pe-1 text-warning"></i>
                              <p className="mb-0 star text-warning">
                                {item?.rate?.toFixed(1)}
                              </p>
                            </>
                          )}
                          {!item.rate && null}
                        </div>
                       
                        <div className="Item-Icon position-absolute rounded-circle  py-4">
                          
                          <Link  className='text-decoration-none text-success-emphasis' to={`view/${item.role}/${item.id}`}> <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                            <i className="fa-regular fa-eye"></i>
                            </div>
                            </Link>
                        </div>
                      </div>
                    </div>
                  )
          
                })
              ):(
                dataProFilter.filter(user=>user.title.toLowerCase().includes(`${searchValue}`.toLowerCase())).map((item) => {
                return(
                    
                    <div className="col-lg-3">
                    <div className="card-Eng position-relative">
                      <div className="card-Eng-img">
                      <div className='card-Eng-img category-Img overflow-hidden'>
                          <img src={item.image?item.image:require("../assets/DeaultImages/defaultProductImage.jpg")} className='w-100 h-100' alt=''/>
                      </div>
                      </div>
                      <h3 className="py-2">{item.title}</h3>
                      <div className="Item-Icon position-absolute rounded-circle  py-4">
                          
                      <Link  className='text-decoration-none text-success-emphasis' to={`/category/${item.id}`}> <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                            <i className="fa-regular fa-eye"></i>
                            </div>
                            </Link>
                      </div>
                    </div>
                  </div>
                )
        
              }))}
            </div>
          </div>
        </section>
      ) : operation === "" ? (
        <div>
          <section id="Popular-Eng" className="pt-5">
            <div className="container text-center">
              <h2 className="fw-bold">Popular Engineers</h2>
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line1"></div>
              <div className="row py-3 gy-2">
                {dataEng.map((item) => {
                  return (
                    <div className="col-lg-3">
                      <div className="card-Eng position-relative">
                        <div className="card-Eng-img category-Img overflow-hidden">
                        
                        <img src={item.image?item.image:require("../assets/DeaultImages/default3.jpg")} className='w-100 h-100' alt=''/>
                                           
                        </div>
                        <h3 className="py-2">{item.name}</h3>
                        <h3>{item.role}</h3>
                        <div className="d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1">
                          {item?.rate && (
                            <>
                              <i className="fa-solid fa-star star pe-1 text-warning"></i>
                              <p className="mb-0 star text-warning">
                                {item?.rate?.toFixed(1)}
                              </p>
                            </>
                          )}
                          {!item.rate && null}
                        </div>
                        <div className="Item-Icon position-absolute rounded-circle  py-4">
                        
                          <Link  className='text-decoration-none text-success-emphasis' to={`view/${item.role}/${item.id}`}> <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                          <i className="fa-regular fa-eye"></i>
                          </div>
                          </Link>
                            
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="Popular-Proivers" className="pt-5">
            <div className="container text-center">
              <h2 className="fw-bold">Popular Providers</h2>
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line1"></div>
              <div className="row py-3 gy-2">
                {dataCont.map((item) => {
                  return (
                    <div className="col-lg-3">
                      <div className="card-Eng position-relative">
                        <div className="card-Eng-img category-Img overflow-hidden">
                        <img src={item.image?item.image:require("../assets/DeaultImages/default3.jpg")} className='w-100 h-100' alt=''/>
                        </div>
                        <h3 className="py-2">{item.name}</h3>
                        <h3 >{item.role}</h3>
                        <div className="d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1">
                          {item?.rate && (
                            <>
                              <i className="fa-solid fa-star star pe-1 text-warning"></i>
                              <p className="mb-0 star text-warning">
                                {item?.rate?.toFixed(1)}
                              </p>
                            </>
                          )}
                          {!item.rate && null}
                        </div>
                        <div className="Item-Icon position-absolute rounded-circle  py-4">
                          <Link  className='text-decoration-none text-success-emphasis' to={`view/${item.role}/${item.id}`}> <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                          <i className="fa-regular fa-eye"></i>
                          </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>


          <section id="Popular-Categories" className="pt-5">
            <div className="container text-center">
              <h2 className="fw-bold">Popular Categories</h2>
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line1"></div>
              <div className="row py-3 gy-2">
                {dataCategory.map((item) => {
                  return (
                    <div className="col-lg-3">
                      <div className="card-Eng position-relative">
                        <div className="card-Eng-img overflow-hidden category-Img">
                        <img src={item.image?item.image:require("../assets/DeaultImages/defaultProductImage.jpg")} className='w-100 h-100' alt=''/>
                        </div>
                       <h3 className="py-2">{item.title}</h3>
                        <div className="Item-Icon position-absolute rounded-circle  py-4">                          
                          <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                          <Link  className='text-decoration-none text-success-emphasis' to={`/category/${item.id}`}> <div className="view-Icon bg-white my-2 Icon-shape rounded-circle">
                            <i className="fa-regular fa-eye"></i>
                            </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      ) :dataEngFilter.length===0 ||dataContFilter.length===0||dataProFilter===0?(
        <h3 className="text-danger">No data</h3>
      ):(<div></div>)}
    </div>
    <Testmonial/>
        </div>
    )
}
export default Home;