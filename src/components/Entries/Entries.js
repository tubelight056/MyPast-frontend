import React, { useState, useEffect } from "react";
import "./Entries.css";

const Entries = (props) => {
  const [data, setdata] = useState([...props.points]);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setdata([...props.points]);
  });
  const onDeleteClick = (data) => {
    props.onDeleteHandler({ item: data, itemid: props.id });
  };
  const wordModifier = (word) => {
    if (word[0] === "#") {
      return (
        <span
          className="tagmarker"
          onClick={() => {
            props.onSelectWord(word);
          }}
        >
          {" "}
          {word}{" "}
        </span>
      );
    } else if (word[0] === "@") {
      return (
        <span
          className="personmarker"
          onClick={() => {
            props.onSelectWord(word);
          }}
        >
          {" "}
          {word}{" "}
        </span>
      );
    } else {
      return `${word} `;
    }
  };

  return (
    <div id={props.date} className="EnteriesOuterbox">
      <h4>{props.date}</h4>
      <ul>
        {data.map((data) => (
          <li>
            <i
              title=" click to delete this point "
              onClick={() => {
                onDeleteClick(data);
              }}
              class="fas dot fa-circle"
            ></i>
            {data.map((word) => wordModifier(word))}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Entries;
