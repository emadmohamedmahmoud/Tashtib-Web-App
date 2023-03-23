import React from "react";
import './footer.css';

function footer()
{
    return(
        <section id="Footer" className="container-fluid  p-0 m-0 ">
            <div className="container pb-3">
                <div className="row gy-2 d-flex justify-content-center align-items-center">
                    <div className="col-lg-3">
                        <div className="footer-logo">
                            <img className="w-100" src={require('../assets/Footer/My project-1 (1).png')} alt="footer"></img>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="opening-time">
                            <h5 className="fw-bold pb-2">Opening Time</h5>
                            <p><i class="fa-solid fa-chevron-right pe-2"></i>Sat – Thurs: 8AM – 10PM</p>
                            <p><i class="fa-solid fa-chevron-right pe-2"></i>Fri: 1PM - 12AM</p>
                            <p><i class="fa-solid fa-chevron-right pe-2"></i>We Work All The Holidays</p>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <div className="Solutions">
                        <h5 className="fw-bold pb-2">Solutions</h5>
                            <p><i class="fa-solid fa-chevron-right pe-2"></i>Price Optimization</p>
                            <p><i class="fa-solid fa-chevron-right pe-2"></i>Recommendations</p>
                            <p><i class="fa-solid fa-chevron-right pe-2"></i>Records</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="opening-time">
                           <h5 className="fw-bold pb-2">Subscribe Our Newsletter</h5>
                           <p className="text-muted">Subscribe Today for free and save 10% on your first purchase.</p>
                           <div class="newsletter-form">
                                <form id="mc-form" class="mc-form" novalidate="true">
                                    <input type="email" placeholder="Enter Your Email Address" required="" name="EMAIL"/>
                                    <button type="submit" value="submit">SUBSCRIBE!</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-end">
                  <div className="container py-3 ">
                    <div className="row gy-2">
                        <div className="col-lg-8 ">
                            <div className="copyRight-Content ">
                                <p class="lead text-white-50 fw-bolder my-auto">© Copyright 2022-2023. All rights are reserved.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="social-media ms-auto pe-0 w-75 d-flex justify-content-between ">
                                <a href="https://www.facebook.com/ahmedroski261099/" target='_blank' rel='noreferrer'><i class="fab fa-facebook-f text-white "></i></a>
                                <a href="https://twitter.com/A_Sami261099" target='_blank' rel='noreferrer'><i class="fab fa-twitter text-white"></i></a>
                                <a href="https://www.instagram.com/ahmed_roski/" target='_blank' rel='noreferrer'><i class="fab fa-instagram text-white "></i></a>
                                <a href="https://github.com/Ahmed261099" target='_blank' rel='noreferrer'><i class="fab fa-github text-white "></i></a>
                                <a href="https://www.linkedin.com/in/ahmed-sami-a-bast-601416173/" target='_blank' rel='noreferrer'><i class="fa-brands fa-linkedin-in text-white"></i></a>
                            </div>
                        </div>
                    </div>
                  </div>
            </div>
        </section>
    )
}

export default footer;