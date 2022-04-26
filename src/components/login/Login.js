import React, { useState } from "react";

import "./login.css";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [missValue, setMissValue] = useState([]);
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
    checkEmail();
    checkPassword();
    if (missValue.length === 0) {
      setemail(email.toLowerCase());
      props.callBack({ email, password });
    }
  };
  return (
    <div className="outerboxl">
      <div className="innerboxl">
        <h1 className="titlel">
          Help me to get your <span className="highlighter">MyPast</span> data
        </h1>

        <div className="containerl">
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
              setMissValue(missValue.filter((item) => item !== 3));
            }}
          />
          <p className="responseForEmail">
            {missValue.includes(3) ? "X" : " "}
          </p>
        </div>
        <div className="containerl">
          <input
            type="password"
            name="password"
            placeholder="Your secret password please"
            required
            onBlur={() => {
              checkPassword();
            }}
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 2));
            }}
            onChange={(e) => {
              setpassword(e.target.value);
              setMissValue(missValue.filter((item) => item !== 2));
            }}
          />
          <p className="responseForEmail">
            {missValue.includes(2) ? "X" : " "}
          </p>
        </div>
        <input
          type="button"
          className="btnl"
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
          className="loginbtnl"
          value="New to myPast? then click me"
          onClick={() => {
            props.changeStatus("register");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
