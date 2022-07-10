import React, { Fragment, useState,useEffect } from "react";
import "./SignUp.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { Link } from "react-router-dom";
import { clearErrors, register } from "../../actions/UserAction";
import { useDispatch,useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const dispatch=useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();
  const{loading,error,isAuth} =useSelector((state)=>state.user);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/3135715.png");
  const [avatarPreview, setAvatarPreview] = useState("/3135715.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuth) {
      navigate("/account")
    }
  }, [dispatch, error, alert, navigate, isAuth]);

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <form className="register" encType="multipart/form-data" onSubmit={registerSubmit} autoComplete={"off"}>
            <h2 className="SignUph2">Register</h2>
            <div>
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage" style={{ marginLeft: "-74px" }}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                style={{ marginTop: "1px" }}
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          <p className="signupLoginP"> Have already an account ?  <Link to={"/login"} style={{ textDecoration:"none",color:"rgb(81, 81, 144);"}}>Login here </Link></p>

          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
