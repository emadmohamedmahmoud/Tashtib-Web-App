import React from "react";
import './About.css';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function About() {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "black" }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "black" }}
                onClick={onClick}
            />
        );
    }
    var settings = {
        infinite: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        className: "center",
        centerMode: true,
        slidesToShow: 3,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <>
            <div id="AboutHero">
                <div className="header ">
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <div className="ps-5">
                                <h2 className="h1">About</h2>
                                <ul className="paths">
                                    <li className="dvider">
                                        <Link to="/" className="text-decoration-none text-dark">
                                            Home{" "}
                                        </Link>
                                    </li>
                                    <li>About</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <h2 className="h1 fw-bold text-center">About Us</h2>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line1"></div>
                <div className="row py-5 gy-3 ">
                    <div className="col-lg-6">
                        <div className="About-content">
                            <h3 className="fw-bold pb-3">OUR STORY</h3>
                            <p className="lead text-muted">We are energetic about discovering things that transcend the commonplace; that we think will get your attention and capture it. In addition, to convey these to you wherever you are and at whatever point you believe you have sufficient energy to enjoy a bit.

                            </p><p className="lead text-muted"> So we made an organization to bring you items you will become hopelessly enamored with; to allow you to make your very own space, to take advantage of those concealed abilities and make your own looks and accumulations; to enable you to impart your manifestations to companions to understand that second conclusion, to move or be enlivened; and to enable you to shop such that you will discover hypnotizing.

                            </p> 
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="About-Img">
                            <img src={require('../assets/About/About.webp')} className='w-100' alt="AboutImage"></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-5 d-none d-lg-block">
                <h2 className="h1 fw-bold text-center">All Members</h2>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line1"></div>
                <div className="row  py-5 ">
                    <Slider {...settings} className='w-75 m-auto'>

                        <div className='slider_item position-relative overflow-hidden text-center'>
                            <div className="slider_item_img position-relative overflow-hidden rounded-2">
                                <img src={require('../assets/Members/Ahmed Samy A.Baset.jpg')} className='w-100 rounded' alt="" />
                                <div className="position-absolute top-0 left-0 h-100 w-25 ">
                                    <div className="Member-Data w-100 position-absolute h-100 p-2 ">

                                    </div>
                                    <div className="Portfolio-Icons w-100 position-absolute  p-2 ">
                                        <div className="member-Social-Icons  pb-2 ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.facebook.com/ahmedroski261099/" target='_blank' rel='noreferrer' className="w-100 "><i className="fab fa-facebook-f "></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberSecondIcon pb-2  ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.instagram.com/ahmed_roski/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-instagram text-danger"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberThirdIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/ahmed-sami-a-bast-601416173/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberFourthIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://github.com/Ahmed261099" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-github text-black"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3 className="pt-2">Ahmed Samy</h3>
                        </div>

                        <div className='slider_item position-relative overflow-hidden text-center'>
                            <div className="slider_item_img position-relative overflow-hidden rounded-2">
                                <img src={require('../assets/Members/Emad Mohamed.jpg')} className='w-100 rounded' alt="" />
                                <div className="position-absolute top-0 left-0 h-100 w-25 ">
                                    <div className="Member-Data w-100 position-absolute h-100 p-2 ">

                                    </div>
                                    <div className="Portfolio-Icons w-100 position-absolute  p-2 ">
                                        <div className="member-Social-Icons  pb-2 ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.facebook.com/EmadMohamedSaleh98/" target='_blank' rel='noreferrer' className="w-100 "><i className="fab fa-facebook-f "></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberSecondIcon pb-2  ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/emadmohamed98" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-instagram text-danger"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberThirdIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/emad-mohamed-dev/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberFourthIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://github.com/emadmohamedmahmoud" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-github text-black"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3 className="pt-2">Emad Mohamed</h3>
                        </div>

                        <div className='slider_item position-relative overflow-hidden text-center'>
                            <div className="slider_item_img position-relative overflow-hidden rounded-2">
                                <img src={require('../assets/Members/esraa.jpg')} className='w-100 rounded' alt="" />
                                <div className="position-absolute top-0 left-0 h-100 w-25 ">
                                    <div className="Member-Data w-100 position-absolute h-100 p-2 ">

                                    </div>
                                    <div className="Portfolio-Icons w-100 position-absolute  p-2 ">
                                        <div className="member-Social-Icons  pb-2 ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="#" target='_blank' rel='noreferrer' className="w-100 "><i className="fab fa-facebook-f "></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberSecondIcon pb-2  ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="#" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-instagram text-danger"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberThirdIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/esraa-taha-b180a7234/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberFourthIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://github.com/esraataha22" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-github text-black"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3 className="pt-2">Esraa Taha</h3>
                        </div>

                        <div className='slider_item position-relative overflow-hidden text-center'>
                            <div className="slider_item_img position-relative overflow-hidden rounded-2">
                                <img src={require('../assets/Members/yasmin emad.jpg')} className='w-100 rounded' alt="" />
                                <div className="position-absolute top-0 left-0 h-100 w-25 ">
                                    <div className="Member-Data w-100 position-absolute h-100 p-2 ">

                                    </div>
                                    <div className="Portfolio-Icons w-100 position-absolute  p-2 ">
                                        <div className="member-Social-Icons  pb-2 ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/yasmin-emad-36a084191/" target='_blank' rel='noreferrer' className="w-100 "><i className="fab fa-facebook-f "></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberSecondIcon pb-2  ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="yasmin.emad@gmail.com" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-instagram text-danger"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberThirdIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/yasmin-emad-36a084191/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberFourthIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://github.com/Yasmin-emad" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-github text-black"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3 className="pt-2">Yasmin Emad</h3>
                        </div>

                        <div className='slider_item position-relative overflow-hidden text-center'>
                            <div className="slider_item_img position-relative overflow-hidden rounded-2">
                                <img src={require('../assets/Members/rami.jpg')} className='w-100 rounded' alt="" />
                                <div className="position-absolute top-0 left-0 h-100 w-25 ">
                                    <div className="Member-Data w-100 position-absolute h-100 p-2 ">

                                    </div>
                                    <div className="Portfolio-Icons w-100 position-absolute  p-2 ">
                                        <div className="member-Social-Icons  pb-2 ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="#" target='_blank' rel='noreferrer' className="w-100 "><i className="fab fa-facebook-f "></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberSecondIcon pb-2  ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="#" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-instagram text-danger"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberThirdIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/ramy-menassa/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberFourthIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://github.com/ramiMenasa" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-github text-black"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3 className="pt-2">Ramy Menassa</h3>
                        </div>

                        <div className='slider_item position-relative overflow-hidden text-center'>
                            <div className="slider_item_img position-relative overflow-hidden rounded-2">
                                <img src={require('../assets/Members/Zahwa Khaled.JPG')} className='w-100 rounded' alt="" />
                                <div className="position-absolute top-0 left-0 h-100 w-25 ">
                                    <div className="Member-Data w-100 position-absolute h-100 p-2 ">

                                    </div>
                                    <div className="Portfolio-Icons w-100 position-absolute  p-2 ">
                                        <div className="member-Social-Icons  pb-2 ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.facebook.com/zahwa.khaled.5" target='_blank' rel='noreferrer' className="w-100 "><i className="fab fa-facebook-f "></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberSecondIcon pb-2  ">
                                            <div className=" member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="#" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-instagram text-danger"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberThirdIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://www.linkedin.com/in/zahwa-khaled/" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div className="member-Social-Icons memberFourthIcon  pb-2 ">
                                            <div className="member-Icon Icon-shape bg-white rounded-circle">
                                                <a href="https://github.com/ZahwaKhaled" target='_blank' rel='noreferrer' className="w-100"><i className="fab fa-github text-black"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3 className="pt-2">Zahwa khaled</h3>
                        </div>

                    </Slider>
                </div>
            </div>

        </>
    )
}

export default About;