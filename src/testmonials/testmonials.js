import React from "react";
import  './testmonial.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
function testmonials()
{
  var Reviews = [
    {
      Auther:"Ahmed Samy",
      AuthorRole:"Engineer",
      AuthorReview:"I am very much happy to buy product from TASHTIB., they provide the best quality. Product quality is very satisfactory, Although the creative designers and engineers are on their website."
    },
    {
      Auther:"Mohamed Amer",
      AuthorRole:"Client",
      AuthorReview:"I am very much happy to buy product from TASHTIB., they provide the best quality. Product quality is very satisfactory, Although the creative designers and engineers are on their website."
    },
    {
      Auther:"Ahmed Mostafa",
      AuthorRole:"Provider",
      AuthorReview:"I am very much happy to buy product from TASHTIB., they provide the best quality. Product quality is very satisfactory, Although the creative designers and engineers are on their website."
    },
  ];
  var settings = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    slidesToShow: 1,
    speed: 600,
    arrows: false,
  };
    return(
      <div className="container">
            <div className="row pb-5 mb-5 testmonialSection"  >
                <div className="col-12 " >
                  <Slider  {...settings}  className=' w-75 py-5 mx-auto'  >
                      {
                        Reviews.map((review) => 
                        {
                          return(
                              <div className="container w-100 ">
                                <div className="row text-center gx-0 gx-lg-5 gx-xl-0 text-lg-start gy-2">
                                  <div className="col-lg-2">
                                    <div className="testmonial-member-Img rounded-circle overflow-hidden mx-auto">
                                      <img src={require('../assets/Engineers/client-7.png')} className="w-100" alt="reviews"></img>
                                    </div>
                                  </div>
                                  <div className="col-lg-10 d-flex flex-column justify-content-around">
                                    <div className="testmonial-member-header ">
                                      <h5 className="fw-bold lead">{review.Auther}</h5>
                                      <h6 className="lead">{review.AuthorRole}</h6>
                                    </div>
                                  </div>
                                  
                                  <div className="col-lg-10 offset-lg-2 ">
                                    <div className="testmonial-member-review">
                                        <p className="lead text-muted">"{review.AuthorReview}"</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          )
                        })
                      }
                    </Slider>

                </div>
            </div>
      </div>
    )
     
}
export default testmonials;