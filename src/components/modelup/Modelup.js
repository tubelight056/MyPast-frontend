import React, { useState, useEffect } from "react";
import Axios from "axios";
import backendUrl from "../../config";
import "./modelup.css";
import { ToastContainer, toast } from "react-toastify";

const Modelup = (props) => {
  const [value, setvalue] = useState(props.value || "");
  const [words, setWords] = useState([]);
  const [suggestion, setsuggestion] = useState([]);
  const onErrorHandler = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const onbtnclickhandler = () => {
    if (value !== undefined || value !== "") {
      if (value.split("").every((i) => i === " ") === false) {
        props.onValueHandler(value);
      } else {
        onErrorHandler("Enter valid details");
      }
    } else {
      onErrorHandler("Enter valid details");
    }
  };
  const onBackBtnClick = () => {
    props.onBackButtonHandler();
  };

  const findSuggestions = () => {
    let array = [];
    if (value.length !== 0) {
      array = value.split(" ");
      let reexp = new RegExp(`${array[array.length - 1]}+[a-z]*`, "ig");
      let temparray = [];
      words.map((word) => {
        if (reexp.test(word)) {
          temparray.push(word);
        }
      });

      setsuggestion([...temparray]);
    }
  };

  const onClickHandler = (word) => {
    let array = [];
    if (value.length !== 0) {
      array = value.split(" ");
      if (array.length !== 0) {
        array[array.length - 1] = word;
      } else {
        array.push(word);
      }
      setvalue(array.join(" "));
    }
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("key")}`,
    };
    Axios.get(`${backendUrl()}/get/gettags`, {
      headers: headers,
    })
      .then((result) => {
        if (result.data.status === true) {
          setWords([...result.data.array]);
        } else {
          onErrorHandler(result.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler(err.messages);
      });
  }, []);
  return (
    <div className="modelupcontainer">
      <div className="modelupinnercontainer">
        <h1 className="h1">{value !== "" ? value : "What happened?"}</h1>
        <input
          type="textarea"
          value={value}
          autoFocus={true}
          onBlur={({ target }) => target.focus()}
          onChange={(event) => {
            setvalue(event.target.value);
            findSuggestions();
          }}
          placeholder="Make it beautiful"
        />
        <div className="suggestiondiv">
          {suggestion.map((word) => (
            <div
              onClick={() => {
                onClickHandler(word);
              }}
              className="suggestionwords"
            >
              {word}
            </div>
          ))}
        </div>
        <div className="btncontainer">
          <button
            onClick={() => {
              onBackBtnClick();
            }}
          >
            back
          </button>
          <button
            onClick={() => {
              onbtnclickhandler();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Modelup;
