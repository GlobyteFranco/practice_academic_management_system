import React, { useEffect } from "react";
import styles from "./Index.module.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const checkStorage = () => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
    window.addEventListener("storage", checkStorage);
    return () => {
      window.removeEventListener("storage", checkStorage);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <h1>Welcome to index</h1>
    </div>
  );
};

export default Index;
