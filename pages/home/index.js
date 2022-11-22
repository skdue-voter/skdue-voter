import axios from "axios";
import React, { useState, useEffect } from "react";
import { browserHistory } from "react-router";

function Home() {
  let [voter, setVoter] = useState({})
  let [voteCandidate, setVoteCandidate] = useState({})
  let [voteParty, setVoteParty] = useState({})

  useEffect(() => {
    // get user data from session storage for voting function
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let candidate = JSON.parse(sessionStorage.getItem('candidate'));
    let party = JSON.parse(sessionStorage.getItem('party'))
    setVoteCandidate(candidate)
    setVoteParty(party)
    console.log(candidate)
    SourceBufferList
    if (!userData) {
      window.location.replace("/");
    }
    getUserInfo();
  }, []);

  async function handleVote() {
    if (
      window.confirm(
        "Voting for Candidate Kim and\nVoting for Put-in Party?"
      ) === true
    ) {
      // await axios vote POST
      window.alert("Vote Completed");
    }
  }

  async function handleLogout() {
    if (window.confirm("Logout?") === true) {
      axios
        .post("https://sankasaint.helloyeew.dev/api/auth/logout/", null, {
          headers: {
            Authorization:
              "Token " + JSON.parse(sessionStorage.getItem("userData")).token,
          },
        })
        .then((response) => {
          sessionStorage.clear();
          window.location.replace("/");
        })
        .catch((error) => {
          window.alert("Can't logout");
          console.log(error);
        });
    }
  }

  async function getUserInfo() {
    axios
      .get("https://sankasaint.helloyeew.dev/api/profile", {
        headers: {
          Authorization:
            "Token " + JSON.parse(sessionStorage.getItem("userData")).token,
        },
      })
      .then((response) => {
        let user = response.data.result.user
        setVoter(response.data.result)
        console.log("Here")
        console.log(user);
      })
      .catch((error) => {
        window.alert("error");
        console.log(error);
      });
  }

  return (
    <div>
      <div className="bg-green w-full absolute ">
        <button
          type="submit"
          onClick={() => {
            handleLogout();
          }}
          className="absolute right-0 m-4 text-yellow text-xl font-semibold"
        >
          Logout
        </button>
        <h1 className="text-5xl font-medium text-white text-center mt-4">
          {/* Need to be change to {voter.first_name} {voter.last_name} */}
          {voter?.user?.username}
        </h1>
      </div>
      <svg width="100%" height="140">
        <ellipse cx="50%" cy="32%" rx="52%" ry="55%" className="fill-green" />
      </svg>

      <div className="grid grid-cols-5 gap-4 my-5 w-[600px] xl:w-[800px] m-auto">
        <div className="bg-white rounded-lg p-1.5 border border-gray-dark col-span-2">
					<img
						className="object-cover rounded-md mb-2 w-full h-[15rem] 2xl:h-[20rem]"
						src={voter?.image}
					/>
          <h1 className="text-xl xl:text-2xl text-center font-semibold p-2 items-center">
            Voter's Information
          </h1>
          <p>First Name: {voter?.user?.last_name}</p>
          <p>Last Name: {voter?.user?.last_name}</p>
          <p>Username: {voter?.user?.username}</p>       
        </div>

        <div className="bg-white rounded-lg border border-gray-dark col-span-3">
          <h1 className="text-xl xl:text-3xl font-semibold p-2 items-center">
            Donald Trump's Election
          </h1>
          <img
            className="object-cover w-full"
            src="trump.jpg"
            alt="donald trump image"
          ></img>
          <p className="m-3">Make Thailand great again!</p>
          <hr className="my-2 h-px bg-gray border-0" />

          <div>
            {voteCandidate !== null ? (
              <div className="grid grid-cols-4 grid-rows-2 gap-1.5 px-2 text-md xl:text-lg font-medium">
              <p className="col-span-3">Vote Candidate</p>
              <button
                type="submit"
                onClick={() => {
                  window.location.assign("/vote-candidate");
                }}
                className="bg-green-lime py-0.5 rounded-md hover:brightness-90"
              >
                Change
              </button>
                {voteCandidate.id !== 'no' ? (
                  <p className="text-green-lime col-span-3 font-normal">
                      Voting for {voteCandidate?.user?.first_name} {voteCandidate?.user?.last_name}
                  </p>    
                ) : (
                  <p className="text-green-lime col-span-3 font-normal">
                      Voting for {voteCandidate.id} one
                  </p>
                )}
              <button
                type="submit"
                onClick={() => {
                  window.location.assign("/candidate");
                }}
                className="bg-gray py-0.5 font-medium rounded-md hover:brightness-90"
              >
                Candidate
              </button></div>) : (
                <div className="grid grid-cols-4 grid-rows-2 gap-1.5 px-2 text-md xl:text-lg font-medium"><p className="col-span-3">Vote Candidate</p>
                <button
                  type="submit"
                  onClick={() => {
                    window.location.assign("/vote-candidate");
                  }}
                  className="bg-yellow-lemon py-0.5 rounded-md hover:brightness-90"
                >
                  Vote
                </button>
                <p className="text-red col-span-3 font-normal">
                  Vote pending
                </p>
                <button
                  type="submit"
                  onClick={() => {
                    window.location.assign("/candidate");
                  }}
                  className="bg-gray py-0.5 font-medium rounded-md hover:brightness-90"
                >
                  Candidate
                </button></div>
                )}
          </div>
          <hr className="my-2 h-px bg-gray border-0" />

          <div>
            {voteParty !== null ? (
              <div className="grid grid-cols-4 grid-rows-2 gap-1.5 px-2 text-md xl:text-lg font-medium">
              <p className="col-span-3">Vote Party</p>
              <button
                type="submit"
                onClick={() => {
                  window.location.assign("/vote-party");
                }}
                className="bg-green-lime py-0.5 rounded-md hover:brightness-90"
              >
                Change
              </button>
                {voteParty.id !== 'no' ? (
                  <p className="text-green-lime col-span-3 font-normal">
                      Voting for {voteParty?.name}
                  </p>    
                ) : (
                  <p className="text-green-lime col-span-3 font-normal">
                      Voting for {voteParty.id} one
                  </p>
                )}
              <button
                type="submit"
                onClick={() => {
                  window.location.assign("/party-list");
                }}
                className="bg-gray py-0.5 font-medium rounded-md hover:brightness-90"
              >
                Candidate
              </button></div>) : (
                <div className="grid grid-cols-4 grid-rows-2 gap-1.5 px-2 text-md xl:text-lg font-medium">
                  <p className="col-span-3">Vote Party</p>
                <button
                  type="submit"
                  onClick={() => {
                    window.location.assign("/vote-party");
                  }}
                  className="bg-yellow-lemon py-0.5 rounded-md hover:brightness-90"
                >
                  Vote
                </button>
                <p className="text-red col-span-3 font-normal">
                  Vote pending
                </p>
                <button
                  type="submit"
                  onClick={() => {
                    window.location.assign("/party-list");
                  }}
                  className="bg-gray py-0.5 font-medium rounded-md hover:brightness-90"
                >
                  Party
                </button></div>
                )}
          </div>
          <hr className="my-2 h-px bg-gray border-0" />

          <p className="text-red mb-1 text-center font-medium">
            Only Voted for Candidate
          </p>
          <div className="m-1">
            <button
              type="submit"
              onClick={() => {
                handleVote();
              }}
              className="text-white bg-red rounded-md p-3 w-full text-xl font-medium hover:brightness-90"
            >
              Confirm Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
