import React, { useRef, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EMAIL_REGEX,PASSWORD_REGEX } from "../../constants/Constants";
import openEyeImg from "../../assets/eye.png";
import closeEyeImg from "../../assets/closed-eyes.png";
import { signupApi } from "../../apis/authApi";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Signup.module.css";

const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    email: "",
    password: "",
  });
  const [showPass, setshowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const onclickShowPass = () => {
    setshowPass((prev) => !prev);
  };

  const onclickShowConfirmPass = () => {
    setshowConfirmPass((prev) => !prev);
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  };

  const postUser = async () => {
    try {
      const res = await signupApi(user);
      if (res.status === 200) {

        toast.success("Signup Succesfull..");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log(err.response.data);
    }
  };

  const onsubmitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("signing up..");
    console.log(user)
    if (user.email !== "" && user.password !== "") {
      console.log("inside..");
      postUser();
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onsubmitHandler}>
        <h1>Create a new account</h1>
        <div className={styles.inputContainer}>

           <div className={styles.inputField}>
            <input
              type="text"
              placeholder="First Name..."
              name="firstName"
              onChange={onchangeHandler}
              value={user.firstName}
            />
          </div>
           <div className={styles.inputField}>
            <input
              type="text"
              placeholder="Last Name..."
              name="lastName"
              onChange={onchangeHandler}
              value={user.lastName}
            />
          </div>

          <div className={styles.inputField}>
            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={onchangeHandler}
              value={user.email}
            />
          </div>

          <div className={styles.inputField}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password..."
              name="password"
              onChange={onchangeHandler}
              value={user.password}
              ref={passwordInput}
            />
            {showPass ? (
              <img
                src={openEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowPass}
              />
            ) : (
              <img
                src={closeEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowPass}
              />
            )}
          </div>

          <div className={styles.inputField}>
            <input type={showConfirmPass ? 'text': 'password'} placeholder="Confirm Password" />
            {showConfirmPass ? (
              <img
                src={openEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowConfirmPass}
              />
            ) : (
              <img
                src={closeEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowConfirmPass}
              />
            )}
          </div>

          <button type="submit">Sign Up</button>
           <p style={{textAlign:"center"}}>
            Already have an account ? <NavLink to="/login" style={{textDecoration:"none"}}>Login</NavLink>
           </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
