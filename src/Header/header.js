import React from 'react'
import './header.css'
import { Link } from 'react-router-dom';

function header()
{
    return(
            <div id="carouselExampleCaptions" className="carousel slide vh-100 ">
                <div className="carousel-inner ">
                    <div className="carousel-item active ">
                    <img src={require('../assets/HeaderSilder/hero-1.jpg')} className="d-block w-100 vh-100" alt="" />
                    <div className="carousel-caption d-none d-md-block top-50">
                        <div className='carousel-caption-visibility'>
                            <h5 className='h1'>Category</h5>
                            <p className='h2 text-center'>You can see all products from here.</p>
                            <Link to='/category' className='btn btn-dark rounded-5  px-4 py-2 text-text-decoration-none'>Shop Now</Link>
                        </div>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={require('../assets/HeaderSilder/hero-2.jpg')} className="d-block w-100 vh-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block top-50">
                        <div className='carousel-caption-visibility'>
                            <h5 className='h1'>About us</h5>
                            <p className='h2 text-center'>You can know more about team.</p>
                            <Link to='/About' className='btn btn-dark rounded-5  px-4 py-2 text-text-decoration-none'>About us</Link>
                        </div>
                    </div>
                    </div>
                </div>
                <button className="carousel-control-prev slide-btn" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next slide-btn" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
    )
}
export default header;