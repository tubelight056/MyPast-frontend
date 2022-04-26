import React, { useState } from "react";

import "./register.css";

const Register = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [missValue, setMissValue] = useState([]);
  const validName = new RegExp("^[a-zA-Zs]+$");
  const validemail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const atleastOneLower = new RegExp("(?=.*[a-z])");
  const atleastOneUpper = new RegExp("(?=.*[A-Z])");
  const atleastOneSymbol = new RegExp("(?=.*[!@#$%^&*])");
  const atleastOneNumber = new RegExp("(?=.*[0-9])");
  const checkPassword = () => {
    if (
      password === undefined ||
      (password.length === 0 && !missValue.includes(2))
    ) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password is missing");
    } else if (!atleastOneLower.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password must contain atleast lowercase letter");
    } else if (!atleastOneUpper.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password must contain atleast UpperCase letter");
    } else if (!atleastOneNumber.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password must contain atleast one number");
    } else if (!atleastOneSymbol.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password must contain atleast one symbol");
    } else if (password.length < 8 && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password must contain more than  8 letters");
    }
  };
  const checkEmail = () => {
    if (email === "" && !missValue.includes(3)) {
      setMissValue([...missValue, 3]);
      props.errorCallBack("Email is missing");
    } else if (!validemail.test(email) && !missValue.includes(3)) {
      props.errorCallBack("Enter a valid E-mail");
      setMissValue([...missValue, 3]);
    }
  };

  const onSubmitHandler = () => {
    checkName();
    checkEmail();
    checkPassword();
    if (missValue.length === 0) {
      setemail(email.toLowerCase());
      props.callBack({ name, email, password });
    }
  };
  const checkName = () => {
    if (name === "" && !missValue.includes(1)) {
      setMissValue([...missValue, 1]);
      props.errorCallBack("Your Name is missing");
    } else if (!validName.test(name) && !missValue.includes(1)) {
      props.errorCallBack("Enter a valid name");
    }
  };

  return (
    <div className="outerboxr">
      <div className="innerboxr">
        <h1 className="titler">
          Welcome to <span className="highlighter">MyPast</span>{" "}
        </h1>
        <div className="containerr">
          <input
            type="text"
            name="name"
            placeholder="Your beautiful name please"
            required
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 1));
            }}
            onBlur={() => {
              checkName();
            }}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <p className="responseForName">{missValue.includes(1) && "X"}</p>
        </div>
        <div className="containerr">
          <input
            type="email"
            name="email"
            placeholder="Your unique E-mail please"
            required
            onBlur={() => {
              checkEmail();
            }}
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 3));
            }}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <p className="responseForEmail">{missValue.includes(3) && "X"}</p>
        </div>
        <div className="containerr">
          <input
            type="password"
            name="password"
            placeholder="Your secret password please"
            required
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 2));
            }}
            onBlur={() => {
              checkPassword();
            }}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <p className="responseForEmail">{missValue.includes(2) && "X"}</p>
        </div>
        <input
          type="button"
          className="btnr"
          value="Continue"
          onClick={() => {
            onSubmitHandler();
          }}
        />
        <h5 className="separator">
          <span>or</span>
        </h5>
        <input
          type="button"
          className="loginbtnr"
          value="Already having an account?"
          onClick={() => {
            props.changeStatus("login");
          }}
        />
      </div>
    </div>
  );
};

export default Register;
