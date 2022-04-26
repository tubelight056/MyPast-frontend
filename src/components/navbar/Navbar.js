import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const [date, setDate] = useState(["", "", ""]);
  const onDateChangeHandler = (data) => {
    setDate(data.split("-"));
    props.onDateChangeHandler(data.split("-"));
  };
  const history = useNavigate();
  return (
    <div className="navbarOuterContainer">
      <div className="top">
        <h4
          onClick={() => {
            sessionStorage.clear();
            history("/", { replace: true });
          }}
        >
          {sessionStorage.getItem("name")}
        </h4>
      </div>
      <div className="navbarInnerContainer">
        <span>
          <label className="todaylabel">Today :</label>
          <input
            type="date"
            name="today"
            className="dateinput"
            onBlur={(e) => {
              onDateChangeHandler(e.target.value);
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
