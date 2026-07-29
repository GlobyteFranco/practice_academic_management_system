import React, { useEffect, useState } from "react";
import styles from "./Index.module.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const checkStorage = () => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
  };
  const getUserId = () => localStorage.getItem("userId");
  const checkUsersName = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${getUserId()}`,
      );
      if (!response.ok) {
        console.log("Fallo");
      }
      console.log("llega");

      const data = await response.json();
      setUserName(data[0].name);
    } catch {
      console.log("Fallo");
    }
  };
  const endSession = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
    window.addEventListener("storage", checkStorage);
    checkUsersName();
    return () => {
      window.removeEventListener("storage", checkStorage);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.endSessionButton}>
        <button onClick={endSession}>Cerrar Sesion</button>
      </div>

      <h1 className={styles.centeredTitle}>Welcome to index Mr. {userName}</h1>
    </div>
  );
};

export default Index;
