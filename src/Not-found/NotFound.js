import React from "react";
import './NotFound.css'
import { Link } from 'react-router-dom';


function NotFound()
{
    return(
        <>
            <div className="container py-5">
                <div className="row ">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="notfound-item d-flex justify-content-between flex-column">
                            <img src={require('../assets/NotFound/404-error.jpeg')} className="w-100" alt="notfoundImage"></img>
                            <Link to="/" className="btn btn-dark w-25 text-decoration-none text-white mx-auto ">
                                        Home{""}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound;