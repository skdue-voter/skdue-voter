import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      handleRedirect();
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function login(data) {
    sessionStorage.setItem("user", JSON.stringify(data));
    handleRedirect();
  }

  function handleRedirect() {
    return window.location.replace("/home");
  }

  async function handleLogin(event) {
    event.preventDefault();
    // alert(JSON.stringify(inputs));
    await axios.post(`http://127.0.0.1:8000/login/`, inputs)
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
        <div className="flex place-content-around place-items-center pt-12 pb-8 px-72">
          <img className="max-h-8 px-4" src={"./logoSkdue.png"} alt="logoSkdue" />
          <img className="max-h-28 px-4" src={"./logoSankasaint.png"}  alt="logoSankasaint" />
          <img className="max-h-28 px-4" src={"./logoCatnip.png"} alt="logoCatnip" />
        </div>
        <h1 className="text-5xl font-medium text-white text-center py-4">Voting System</h1>
      </div>
      <svg width="100%">
        <ellipse cx="50%" cy="0%" rx="52%" ry="80%" className="fill-green" />
      </svg>

      <div className="z-10 -mt-24">
        {/* <h1 className="text-3xl font-medium text-white py-2">Login</h1> */}
        <div className="bg-white rounded-lg w-96 p-1.5 mb-16 border border-gray-dark">
          <form onSubmit={handleLogin}>
            <input
              className="bg-gray rounded-md p-1.5 mb-1.5 w-full"
              type="text"
              name="citizenID"
              placeholder="Citizen ID"
              value={inputs.citizenID || ""}
              required
              onChange={handleChange}
            />
            <input
              className="bg-gray rounded-md p-1.5 mb-1.5 w-full"
              type="password"
              name="cvv"
              placeholder="CVV"
              value={inputs.cvv || ""}
              required
              onChange={handleChange}
            />
            <button type="submit"
              className="bg-yellow-lemon rounded-md p-1 w-full text-xl font-medium hover:brightness-90"
            >Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
