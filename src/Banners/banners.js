import React from 'react'
import './banners.css'
import { NavLink } from 'react-router-dom'


function banners()
{
    return(
   
          <section id='Banners' className='py-5 mt-5'>
            <div className='container'>
                <div className='row gx-4 gy-4'>
                    <div className='col-lg-6'>
                        <div className='banner-item banner-item01 position-relative'>
                            <img src={require('../assets/Banners/banner1.webp')} className='w-100' alt='' />
                            <div className='banner-item01-caption text-center'>
                                <p className='h3 fw-bolder'>OFFICE <br></br><span>FURNITURE</span> </p> 
                                <NavLink className="nav-link fs-5 text-decoration-underline " aria-current="page" onClick={()=>{}} to="/Category">SHOP NOW</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='banner-item banner-item02 position-relative'>
                            <img src={require('../assets/Banners/banner2.webp')} className='w-100' alt='' />
                            <div className='banner-item02-caption text-center'>
                                <p className='h3 fw-bolder'>HOME <br></br><span>FURNITURE</span> </p> 
                                <NavLink className="nav-link fs-5 text-decoration-underline " aria-current="page" onClick={()=>{}} to="/Category">SHOP NOW</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
    )
}
export default banners;