import React, { useEffect, useState } from "react";
import Entries from "../../components/Entries/Entries";
import Navbar from "../../components/navbar/Navbar";
import Axios from "axios";
import backendUrl from "../../config";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import Modelup from "../../components/modelup/Modelup";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Home = () => {
  const [insert, setinsertstate] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("key") === undefined) {
      history("/", { replace: true });
    } else {
      getAlldayHandler();
    }
  }, []);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("key")}`,
  };

  const [data, setdata] = useState([]);

  const onErrorHandler = (message) => {
    if (message == "Token Forbidden") {
      history("/", { replace: true });
    }
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

  const getAlldayHandler = () => {
    setLoading(true);
    Axios.post(
      `${backendUrl()}/get/getall`,
      {},
      {
        headers: headers,
      }
    )
      .then((result) => {
        setLoading(false);
        if (result.data.status === true) {
          setdata(result.data.result);
        } else {
          onErrorHandler(result.data.statusMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        onErrorHandler(err.messages);
      });
  };

  const onSelectWordHandler = async (word) => {
    setLoading(true);
    await Axios.post(
      `${backendUrl()}/get/getword`,
      {
        word,
      },
      {
        headers: headers,
      }
    )
      .then(async (result) => {
        setLoading(false);
        if (result.data.status === true) {
          setTimeout(async () => {
            await setdata(result.data.result);
          }, 1000);
        } else {
          onErrorHandler(result.data.statusMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        onErrorHandler(err.messages);
      });
  };

  const onDateChangeHandler = async (data) => {
    setLoading(true);
    if (data !== "") {
      await Axios.post(
        `${backendUrl()}/get/getaday`,
        {
          date: data[2],
          month: data[1],
          year: data[0],
        },
        {
          headers: headers,
        }
      )
        .then((result) => {
          setLoading(false);
          if (result.data.status === true) {
            setTimeout(() => {
              setdata([...result.data.result]);
            }, 1000);
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

  const onDeleteHandler = async ({ item, itemid }) => {
    setLoading(true);
    await Axios.post(
      `${backendUrl()}/delete/points`,
      {
        item,
        itemid,
      },
      {
        headers: headers,
      }
    )
      .then(async (result) => {
        setLoading(false);
        if (result.data.status === true) {
          getAlldayHandler();
        } else {
          onErrorHandler(result.data.statusMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        onErrorHandler(err.messages);
      });
  };
  const onValueAddHandler = async (data) => {
    setLoading(true);
    await Axios.post(
      `${backendUrl()}/insert/insertentry`,
      {
        text: [data.split(" ")],
      },
      {
        headers: headers,
      }
    )
      .then((result) => {
        setLoading(false);
        if (result.data.status === true) {
          setinsertstate(!insert);
          setTimeout(() => {
            getAlldayHandler();
          }, 1000);
        } else {
          onErrorHandler(result.data.statusMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        onErrorHandler(err.messages);
      });
  };
  return insert === true ? (
    <Modelup
      onValueHandler={(data) => {
        onValueAddHandler(data);
      }}
      onBackButtonHandler={() => {
        setinsertstate(!insert);
      }}
    />
  ) : (
    <div className="homeContainer">
      {loading === true && <Loading />}
      <Navbar onDateChangeHandler={(data) => onDateChangeHandler(data)} />
      <div className="homeinnercontainer">
        <button
          className="addbutton"
          onClick={() => {
            setinsertstate(!insert);
          }}
        >
          ADD what happened to memories
        </button>
        <div className="entriescontainer">
          {data.map((entry) => (
            <Entries
              date={`${entry.Year}-${`` + entry.Month}-${`` + entry.Date}`}
              points={entry.Points}
              key={entry._id}
              id={entry._id}
              onDeleteHandler={(data) => {
                onDeleteHandler(data);
              }}
              onSelectWord={(word) => {
                onSelectWordHandler(word);
              }}
            />
          ))}
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

export default Home;
