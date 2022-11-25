import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({});
  let [electionEnd, setElectionEnd] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      handleRedirect();
    } else {
      getVoteResult();
    }
  }, []);

  async function getVoteResult() {
    await axios.get(`https://sankasaint.helloyeew.dev/api/election/current`)
      .then((response) => {
        // console.log(response.data.vote_result);
        if  (Object.keys(response.data.vote_result).length === 0) {
          setElectionEnd(true)
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  async function login(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
    handleRedirect();
  }

  function handleRedirect() {
    return window.location.replace("/home");
  }

  async function handleLogin(event) {
    event.preventDefault();
    axios
      .post(
        "https://sankasaint.helloyeew.dev/api/auth/login/",
        {},
        {
          auth: inputs,
        }
      )
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
        <div className="flex place-content-around place-items-center pt-12 pb-8 px-20 xl:px-72">
          <img
            className="max-h-8 xl:max-h-9 px-4"
            src={"./logoSkdue.png"}
            alt="logoSkdue"
          />
          <img
            className="max-h-28 xl:max-h-32 px-4"
            src={"./logoSankasaint.png"}
            alt="logoSankasaint"
          />
          <img
            className="max-h-28 xl:max-h-32 px-4"
            src={"./logoCatnip.png"}
            alt="logoCatnip"
          />
        </div>
        <h1 className="text-5xl xl:text-5xl font-medium text-white text-center py-4">
          Voting System
        </h1>
      </div>
      <svg width="100%" height="150">
        <ellipse cx="50%" cy="0%" rx="52%" ry="80%" className="fill-green" />
      </svg>

      <div className="z-10 -mt-24">
        {/* <h1 className="text-3xl font-medium text-white py-2">Login</h1> */}
        <div className="bg-white rounded-lg w-96 p-1.5 mb-4 border border-gray-dark">
          <form onSubmit={handleLogin}>
            <input
              className="bg-gray rounded-md p-1.5 mb-1.5 w-full"
              type="text"
              name="username"
              placeholder="Citizen ID"
              value={inputs.username || ""}
              required
              onChange={handleChange}
            />
            <input
              className="bg-gray rounded-md p-1.5 mb-1.5 w-full"
              type="password"
              name="password"
              placeholder="CVV"
              value={inputs.password || ""}
              required
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-yellow-lemon rounded-md p-1 w-full text-xl font-medium hover:brightness-90"
            >
              Login
            </button>
          </form>
        </div>
        {electionEnd && 
        <div className="flex justify-center text-xl font-semibold mb-10">
          <p className="px-2">The election has ended</p>
          <button
            type="submit"
            onClick={() => { window.location.assign("/vote-result");}}
            className="text-green-lime hover:brightness-90"
            >See the Result
          </button>
        </div>}
      </div>
    </div>
  );
};

export default Login;
