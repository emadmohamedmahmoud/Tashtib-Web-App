 import React from 'react'
import './home.css'
import Header from '../Header/header'
import Banners from '../Banners/banners'
import { NavLink } from 'react-router-dom'


function home()
{
    var Engineers = [
        {
            engName:"Ahmed Samy",
            engImage:"../assets/Engineers/client-1.png",
            engRate:8,
        },
        {
            engName:"Mohamed Amer",
            engImage:"../assets/Engineers/client-2.png",
            engRate:9,
        },
        {
            engName:"Omar salah",
            engImage:"../assets/Engineers/client-3.png",
            engRate:5,
        },
        {
            engName:"Rami Menissa",
            engImage:"../assets/Engineers/client-4.png",
            engRate:10,
        },
        {
            engName:"Engy Nader",
            engImage:"../assets/Engineers/client-5.png",
            engRate:7,
        },
        {
            engName:"Eslam Elwy",
            engImage:"../assets/Engineers/client-6.png",
            engRate:9,
        },
        {
            engName:"Ahmed Yosry",
            engImage:"../assets/Engineers/client-7.png",
            engRate:6,
        },
        {
            engName:"Moaaz Taha",
            engImage:"../assets/Engineers/client-8.png",
            engRate:9.3,
        },
    ]

    var Products = [
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
        {
            productName:"Chair",
            productPrice:1000,
            productDiscount:"10%",
            productPriceAfterDiscount:900,
            count:20,
            productRate:9.4
        },
    ]
    return(
        <div className='bg-white'>
          <Header></Header>
          <Banners></Banners>


            <section id='Popular-Eng' className='pt-5'>
                <div className='container text-center'>
                    <h2 className='fw-bold'>Popular Engineers</h2>
                    <div class="line line1"></div>
                    <div class="line line2"></div>
                    <div class="line line1"></div>
                    <div  className='row py-3 gy-2'>
                        {
                            Engineers.map((item) => {
                                return(
                                    <div className='col-lg-3'>
                                        <div className='card-Eng position-relative'>
                                            <div className='card-Eng-img'>
                                                <img src={require('../assets/Engineers/client-1.png')} className='w-100' alt=''/>
                                            </div>
                                            <h3 className='py-2'>{item.engName}</h3>
                                            <div className='d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1'>
                                                {item?.engRate && <>
                                                <i class="fa-solid fa-star star pe-1 text-warning" ></i>
                                                <p className='mb-0 star text-warning'>{item?.engRate?.toFixed(1)}</p>
                                                </>}   
                                                {!item.engRate && null}   
                                            </div>
                                            <div className='Item-Icon position-absolute rounded-circle  py-4'>
                                                <div className='favorite-Icon bg-white Icon-shape rounded-circle'>
                                                    <i className="fa-regular fa-heart "></i>
                                                </div>
                                                <div className='view-Icon bg-white my-2 Icon-shape rounded-circle'>
                                                    <i className="fa-regular fa-eye"></i>
                                                </div>
                                            </div>
        
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                    </div>
                </div>
            </section>

            <section id='Popular-Proivers' className='pt-5'>
                <div className='container text-center'>
                    <h2 className='fw-bold'>Popular Providers</h2>
                    <div class="line line1"></div>
                    <div class="line line2"></div>
                    <div class="line line1"></div>
                    <div  className='row py-3 gy-2'>
                        {
                            Engineers.map((item) => {
                                return(
                                    <div className='col-lg-3'>
                                        <div className='card-Eng position-relative'>
                                            <div className='card-Eng-img'>
                                                <img src={require('../assets/Engineers/client-4.png')} className='w-100' alt=''/>
                                            </div>
                                            <h3 className='py-2'>{item.engName}</h3>
                                            <div className='d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1'>
                                                {item?.engRate && <>
                                                <i class="fa-solid fa-star star pe-1 text-warning" ></i>
                                                <p className='mb-0 star text-warning'>{item?.engRate?.toFixed(1)}</p>
                                                </>}   
                                                {!item.engRate && null}   
                                            </div>
                                            <div className='Item-Icon position-absolute rounded-circle  py-4'>
                                                <div className='favorite-Icon bg-white Icon-shape rounded-circle'>
                                                    <i className="fa-regular fa-heart "></i>
                                                </div>
                                                <div className='view-Icon bg-white my-2 Icon-shape rounded-circle'>
                                                    <i className="fa-regular fa-eye"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                    </div>
                </div>
            </section>


            <section id='Popular-Products' className='pt-5'>
                <div className='container text-center'>
                    <h2 className='fw-bold'>Popular Products</h2>
                    <div class="line line1"></div>
                    <div class="line line2"></div>
                    <div class="line line1"></div>
                    <div  className='row py-3 gy-2'>
                        {
                            Products.map((item) => {
                                return(
                                    <div className='col-lg-3'>
                                        <div className='card-Eng position-relative'>
                                            <div className='card-Eng-img'>
                                                <img src={require('../assets/Products/product-1.jpg')} className='w-100' alt=''/>
                                            </div>
                                            <h3 className='pt-2'>{item.productName}</h3>
                                            <div className='Item-Extra-Data d-flex justify-content-center'>
                                                <h5 className='text-danger pe-4'>{item.productPriceAfterDiscount}$</h5>
                                                <h5 className='text-muted text-decoration-line-through'>{item.productPrice}$</h5>
                                            </div>
                                            <div className='d-flex align-items-center position-absolute item-vote bg-white fw-bolder p-1'>
                                                {item?.productRate && <>
                                                <i class="fa-solid fa-star star pe-1 text-warning" ></i>
                                                <p className='mb-0 star text-warning'>{item?.productRate?.toFixed(1)}</p>
                                                </>}   
                                                {!item?.productRate && null}   
                                            </div>
                                            <div className='Item-Icon position-absolute rounded-circle  py-4'>
                                               <div className='view-Icon bg-white my-2 Icon-shape rounded-circle'>
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                </div>
                                                <div className='favorite-Icon bg-white Icon-shape rounded-circle'>
                                                    <i className="fa-regular fa-heart "></i>
                                                </div>
                                                <div className='view-Icon bg-white my-2 Icon-shape rounded-circle'>
                                                    <i className="fa-regular fa-eye"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}
export default home;