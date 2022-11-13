import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    let user = sessionStorage.getItem("user");
    if (user) {
      handleRedirect();
    }
  
  }, []);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  async function login(data) {
    sessionStorage.setItem("user", JSON.stringify(data));
    // axios
    //   .get(`https://sankasaint.helloyeew.dev/api/profile`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // handleRedirect();
  }

  function handleRedirect() {
    return window.location.replace("/hom");
  }

  async function handleLogin(event) {
    event.preventDefault();
    alert(JSON.stringify(inputs));
    console.log(inputs);
    await axios
      .post(`https://sankasaint.helloyeew.dev/api/login`, inputs, {
        withCredentials: true,
      })
      .then((response) => {
        login(response.data);
      })
      .catch((error) => {
        window.alert("Citizen not found. Wrong citizen ID or CVV");
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-green w-full">
        <div className="flex place-content-around place-items-center pt-10 pb-4 px-80">
          <img className="max-h-8" src={"./logoSkdue.png"} alt="logoSkdue" />
          <img
            className="max-h-16"
            src={"./logoSankasaint.png"}
            alt="logoSankasaint"
          />
          <img className="max-h-20" src={"./logoCatnip.png"} alt="logoCatnip" />
        </div>
        <h1 className="text-5xl font-medium text-white text-center py-4">
          Voting System
        </h1>
      </div>
      <svg width="100%">
        <ellipse cx="50%" cy="0%" rx="52%" ry="80%" className="fill-green" />
      </svg>

      <div className="z-10 -mt-32">
        <h1 className="text-3xl font-medium text-white py-2">Login</h1>
        <div className="bg-white rounded-15 w-96 p-1.5 border border-gray-dark">
          <form onSubmit={handleLogin}>
            <input
              className="bg-gray rounded-10 p-1.5 my-1 w-full"
              type="text"
              name="username"
              placeholder="Citizen ID"
              value={inputs.username || ""}
              required
              onChange={handleChange}
            />
            <input
              className="bg-gray rounded-10 p-1.5 my-1 w-full"
              type="password"
              name="password"
              placeholder="CVV"
              value={inputs.password || ""}
              required
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-yellow-lemon rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
