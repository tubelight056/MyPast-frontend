const backendUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "https://mypast-backend.herokuapp.com";
  } else {
    return "https://mypast-backend.herokuapp.com";
  }
};

export default backendUrl;
