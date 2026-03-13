import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginApi } from "../../apis/authApi";
import type { User } from "../../types/authTypes";

import styles from "../loginPage/Login.module.css";
import { useNotesContext } from "../../contexts/NotesContext";

const Login = () => {
  const {setNotes,notes} = useNotesContext();
  console.log("notes",notes)
  const navigate = useNavigate();
 
  const [user, setUser] = useState<User>({
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
      const res = await loginApi(user);
      console.log(res);
      if (res.status == 200) {
        const token = res.data?.token;
        localStorage.setItem("token", token);
        toast.success("Login Successfull")
        navigate("/dashboard");
         setNotes([]);
      }
    } catch (err:any) {
      toast.error(err.response.data.message )
      console.log("login failed...", err);
    }
  };

  const onsubmitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (user.email === "" && user.password === "") {
      return;
    }
    console.log("inside login submit handler..");
    postUser();
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
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
