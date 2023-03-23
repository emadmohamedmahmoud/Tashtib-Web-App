import "./firstreg.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function First_Reg() {

  const history = useHistory();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      history.push("/profile");
    }
  }, [currentUser, history]);

  return (
    <>
      <body className="reg">
        <div className="container">
          <br /> <br />
          <Link className="btn btn-light p-4" id="reg_1" to={"/registercus"}>
            REGISTER AS A NEW CLIENT
          </Link>
          <br /> <br />
          <Link className="btn btn-light p-4" id="reg_2" to={"/register"}>
            REGISTER AS A NEW Engineer/Provider
          </Link>
          <br /> <br />
          <h4 id="log">
            Already have an account :{" "}
            <Link className="text-white fw-bolder" to={"/login"}>
              {" "}
              LOGIN
            </Link>
          </h4>
        </div>
      </body>
    </>
  );
}
export default First_Reg;
