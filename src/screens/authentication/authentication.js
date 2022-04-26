import React, { useState } from "react";
import Login from "../../components/login/Login";
import Register from "../../components/register/register";
import "./authentication.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import backendUrl from "../../config";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Authentication = () => {
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState("login");
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
  const history = useNavigate();
  const onRegisterCallBack = async (data) => {
    if (data.name !== "" || data.email !== "" || data.password !== "") {
      setLoading(true);
      await Axios.post(`${backendUrl()}/auth/register`, {
        username: data.name,
        email: data.email,
        password: data.password,
      })
        .then((result) => {
          setLoading(false);
          if (result.data.status === true) {
            sessionStorage.setItem("name", result.data.name);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("key", result.data.token);
            history("/home", { replace: true });
          } else {
            onErrorHandler(result.data.statusMessage);
          }
        })
        .catch((err) => {
          setLoading(false);
          onErrorHandler(err.messages);
        });
    }
  };
  const onLoginCallBack = async (data) => {
    if (data.email !== "" || data.password !== "") {
      setLoading(true);
      await Axios.post(`${backendUrl()}/auth/login`, {
        email: data.email,
        password: data.password,
      })
        .then((result) => {
          setLoading(false);
          if (result.data.status === true) {
            sessionStorage.setItem("name", result.data.name);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("key", result.data.token);
            history("/home", { replace: true });
          } else {
            onErrorHandler(result.data.statusMessage);
          }
        })
        .catch((err) => {
          setLoading(false);
          onErrorHandler(err.messages);
        });
    }
  };

  return (
    <div className="authenticationOuterBox">
      {loading === true ? (
        <Loading />
      ) : state === "login" ? (
        <Login
          errorCallBack={(message) => {
            onErrorHandler(message);
          }}
          changeStatus={(message) => {
            setstate(message);
          }}
          callBack={(data) => {
            onLoginCallBack(data);
          }}
        />
      ) : (
        <Register
          errorCallBack={(message) => {
            onErrorHandler(message);
          }}
          changeStatus={(message) => {
            setstate(message);
          }}
          callBack={(data) => {
            onRegisterCallBack(data);
          }}
        />
      )}
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

export default Authentication;
