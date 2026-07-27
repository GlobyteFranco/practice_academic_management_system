import React, { useEffect } from "react";
import FormComponent from "../components/FormComponent";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      console.log("Se ha encontrado un valor en el local storage");
      navigate("/index");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className={styles.layout}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <FormComponent onSubmitSuccess={() => navigate("/index")}></FormComponent>
    </div>
  );
};

export default Login;
