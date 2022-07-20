import React, { Fragment,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "./LoginSignUp.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/UserAction";
import { useNavigate,useLocation } from "react-router-dom";

import { useAlert } from "react-alert";
import Loader from "../Loading/Loader";

const LoginSignUp = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  let navigate = useNavigate();
  const location=useLocation();

  const{loading,error,isAuth} =useSelector((state)=>state.user);
  console.log(isAuth);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  console.log(loginEmail);
  const loginSubmit = (e) => {
    e.preventDefault();
  dispatch(login(loginEmail,loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account"
  console.log(redirect);

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors);
    }
    if(isAuth){
      navigate(redirect);
    }

  },[alert,error,isAuth,navigate,dispatch,redirect])
  return (
   <Fragment>
     {loading ? (
      <Loader cards={5} />
    ): (<Fragment>
      <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
    <form className="loginForm" onSubmit={loginSubmit} autoComplete="off">
      <h2 className="Loginh2">Login</h2>
      <div className="loginEmail">
        <MailOutlineIcon />
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="off"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </div>
      <div className="loginPassword">
        <LockOpenIcon />
        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="off"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>
      <Link to="/password/forgot">Forget Password ?</Link>
      <input type="submit" value="Login" className="loginBtn" />
      <Link className="SignupLink" to={"/signup"} style={{fontSize:"19px",color:"#7285A5", fontFamily:"Nunito"}}>Don't have an account yet?  Sign Up </Link>
    </form>

    </div>
    </div>
  </Fragment>)}
   </Fragment>
  );
};

export default LoginSignUp;
