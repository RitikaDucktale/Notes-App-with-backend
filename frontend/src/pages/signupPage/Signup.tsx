import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupApi } from "../../apis/authApi";
import styles from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const postUser = async () => {
    try {
      const res = await signupApi(user);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log("sign up failed.", err);
    }
  };

  const onsubmitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("signing up..");

    if (user.email !== "" && user.password !== "") {
      console.log("inside..");
      postUser();
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onsubmitHandler}>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={onchangeHandler}
            value={user.email}
          />
          <input
            type="text"
            placeholder="Password..."
            name="password"
            onChange={onchangeHandler}
            value={user.password}
          />
          <input type="text" placeholder="Confirm Password" />
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
