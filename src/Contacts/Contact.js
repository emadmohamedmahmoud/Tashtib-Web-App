import React, { useRef } from "react";
import './contact.css'
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Contact()
{
  
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_9i61bqm', 'template_8idn5wd',  form.current , 'nG-xM6ur5aNMeJmHF')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
      };

    return(
        <>
            <div id="ContactHero">
                <div className="header ">
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <div className="ps-5">
                                <h2 className="h1">Contact</h2>
                                <ul className="paths">
                                    <li className="dvider">
                                        <Link to="/" className="text-decoration-none text-dark">
                                        Home{" "}
                                        </Link>
                                    </li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                <div className="container py-5">
                    <h2 className="h1 fw-bold text-center">Write Us</h2>
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line1"></div>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="row py-5 gy-4">
                            <h4 >Get in Touch</h4>
                            <p className="lead text-muted mt-0">Please fill out the form on this section to contact with me. Or call between 8:00 am and 10:00 pm ET, Saturday through Thurthday.</p>
                            <div className="col-lg-6">
                                <div className="contactInput">
                                    <input required type={'text'} className="form-control border-2 py-2 mb-4" placeholder="Name" name="name" id="userMessageName"></input>
                                    <input required type={'email'} className="form-control border-2 py-2 mb-4" placeholder="Email" name="email" id="userMessageEmail"></input>
                                    <input required type={'text'} className="form-control border-2 py-2" placeholder="Subject" name="subject" id="userMessageSubject"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contactInput h-100">
                                <textarea required className="contact-Message form-control border-2 py-2" placeholder="Message" name="message" id="userMessage"></textarea>
                                <button type="submit" className="btn btn-dark form-control py-2 mt-4 mt-lg-1" value={"Send"}>Send</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )
}

export default Contact;