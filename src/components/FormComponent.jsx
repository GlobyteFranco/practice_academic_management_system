import React, { useEffect, useState } from "react";
import styles from "./FormComponent.module.css";
const FormComponent = ({ onSubmitSuccess }) => {
  const [inputName, setInputName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [checkedUser, setInputCheckedUser] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonChanged, setButtonChanged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!response.ok) {
        throw new Error(`"El envio hay tenido un error" ${response.status}`);
      }
      const userResponse = await response.json();
      const check = userResponse.find((element) => element.email === inputMail);
      if (check) {
        console.log("Los datos fueron encontrados con exito");
        localStorage.setItem("userId", check.email);
        setInputCheckedUser(true);
        setButtonChanged(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmitSuccess();
      } else {
        console.log("Los datos no fueron encontrados");

        setInputCheckedUser(false);
      }
    } catch (error) {
      console.log("Hubo un problema ->", error.message);
    } finally {
      setFormSubmitted(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Formulario</h2>
        <div className={styles.binomialTags}>
          <label htmlFor="inputNombre">Nombre</label>
          <input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            id="inputNombre"
            required
            name="nombre"
            type="text"
          ></input>
        </div>
        <div className={styles.binomialTags}>
          <label htmlFor="inputApellido">Apellido</label>
          <input
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
            id="inputApellido"
            name="apellido"
            required
            type="text"
          ></input>
        </div>
        <div className={styles.binomialTags}>
          <label htmlFor="inputMail">Mail</label>
          <input
            value={inputMail}
            onChange={(e) => setInputMail(e.target.value)}
            id="inputMail"
            name="mail"
            required
            type="email"
          ></input>
        </div>
        <div className={styles.submitButton}>
          {buttonChanged ? (
            <button
              
              type="button"
              style={{ backgroundColor: "green", color: "black" }}
            >
              {"Iniciar Sesion"}
            </button>
          ) : (
            <button disabled={formSubmitted} type="submit">
              {formSubmitted ? "Cargando..." : "Aceptar y enviar"}
            </button>
          )}
        </div>
        {!checkedUser && <h1 className={styles.alert}>no encontrado</h1>}
      </form>
    </div>
  );
};

export default FormComponent;
