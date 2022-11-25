import axios from "axios";
import React, { useState, useEffect } from "react";
import { browserHistory } from "react-router";

function Home() {
  let [voter, setVoter] = useState({})
  let [voteStatus, setVoteStatus] = useState({})
  let [election, setElection] = useState({})
  let [voteCandidate, setVoteCandidate] = useState({})
  let [voteParty, setVoteParty] = useState({})

  useEffect(() => {
    // get user data from session storage for voting function
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let candidate = JSON.parse(sessionStorage.getItem('candidate'));
    let party = JSON.parse(sessionStorage.getItem('party'))
    setVoteCandidate(candidate)
    setVoteParty(party)
    SourceBufferList
    if (!userData) {
      window.location.replace("/");
    }
    getUserInfo();
    getElectionInfo();
  }, []);

  async function handleVote() {
    if (
      window.confirm(
        `Voting for Candidate ${voteCandidate?.user?.first_name} ${voteCandidate?.user?.last_name} and\nVoting for ${voteParty?.name} Party?`
      ) === true
    ) {
      await axios.post(`https://sankasaint.helloyeew.dev/api/election/${election?.id}/vote`, 
        {
          "party_id": voteParty?.id.toString(),
          "candidate_id": voteCandidate?.id.toString()
        }, 
        {
          headers: {
            Authorization:
              "Token " + JSON.parse(sessionStorage.getItem("userData")).token,
          },
        }).then((response) => {
          window.location.reload();
          sessionStorage.removeItem('candidate');
          sessionStorage.removeItem('party');
        })
        .catch((error) => {
          window.alert("Can't Vote");
        });
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
        sessionStorage.setItem('voter', JSON.stringify(response.data.result))
        let user = response.data.result.user
        setVoter(response.data.result)
        setVoteStatus(response.data.voted_current_election)
      })
      .catch((error) => {
        window.alert("error");
      });
  }

  async function getElectionInfo() {
    await axios.get("https://sankasaint.helloyeew.dev/api/election/current")
    .then((response) => {
      setElection(response.data.election)
    })
    .catch((error) => {
      window.alert(error);
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
        <h1 className="text-5xl font-medium text-white text-center mt-4">Voting System</h1>
      </div>
      <svg width="100%" height="140">
        <ellipse cx="50%" cy="32%" rx="52%" ry="55%" className="fill-green" />
      </svg>

      <div className="grid grid-cols-11 gap-4 my-5 w-[600px] xl:w-[800px] m-auto">
        <div className="bg-white rounded-lg border border-gray-dark col-span-7">
          <h1 className="text-xl xl:text-3xl font-semibold p-2 items-center">
            {election?.name}
          </h1>
          <img
            className="object-cover w-full"
            src={election?.front_image}
          ></img>
          <p className="m-3">{election?.description}</p>
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
                  disabled={voteStatus}
                  type="submit"
                  onClick={() => {
                    window.location.assign("/vote-candidate");
                  }}
                  className={`py-0.5 rounded-md hover:brightness-90 disabled:cursor-not-allowed ${voteStatus ? "bg-gray" : "bg-yellow-lemon"}`}
                >
                  Vote
                </button>
                { !voteStatus ? (
                  <p className="text-red col-span-3 font-normal">
                    Vote pending
                  </p>
                ) : (
                  <p className="text-green-lime col-span-3 font-normal">
                    Already Voted 
                  </p>
                )}
                <button
                  type="submit"
                  onClick={() => {
                    window.location.assign("/candidate");
                  }}
                  className={`py-0.5 font-medium rounded-md hover:brightness-90 ${!voteStatus ? "bg-gray" : "bg-yellow-lemon"}`}
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
              </button></div>) :  (
                <div className="grid grid-cols-4 grid-rows-2 gap-1.5 px-2 text-md xl:text-lg font-medium">
                  <p className="col-span-3">Vote Party</p>
                <button
                  disabled = {voteStatus}
                  type="submit"
                  onClick={() => {
                    window.location.assign("/vote-party");
                  }}
                  className={`py-0.5 rounded-md hover:brightness-90 disabled:cursor-not-allowed ${voteStatus ? "bg-gray" : "bg-yellow-lemon"}`}
                >
                  Vote
                </button>
                { !voteStatus ? (
                  <p className="text-red col-span-3 font-normal">
                    Vote pending
                  </p>
                ) : (
                  <p className="text-green-lime col-span-3 font-normal">
                    Already Voted 
                  </p>
                )}
                <button
                  type="submit"
                  onClick={() => {
                    window.location.assign("/party-list");
                  }}
                  className={`py-0.5 font-medium rounded-md hover:brightness-90 ${!voteStatus ? "bg-gray" : "bg-yellow-lemon"}`}
                >
                  Party
                </button></div>
                )}
          </div>
          <hr className="my-2 h-px bg-gray border-0" />
          
          {voteParty !== null || voteCandidate !== null ? (
            <div>
            <p className="text-green-lime mb-1 text-center font-medium">
            Please confirm your vote
            </p>
            <div className="m-1">
            <button
              type="submit"
              onClick={() => {
                handleVote();
              }}
              className="text-white bg-green-lime rounded-md p-3 w-full text-xl font-medium hover:brightness-90"
            >
              Confirm Vote
            </button>
          </div>
          </div>
          ) : (
            <div>
            { !voteStatus && 
              <p className="text-red mb-1 text-center font-medium">
                Vote pending
              </p>}
            <div className="m-1">
            {!voteStatus ? <button
              type="submit"
              onClick={() => {
                handleVote();
              }}
              className={`rounded-md p-3 w-full text-xl font-medium hover:brightness-90 ${voteStatus ? "bg-gray text-black": "bg-red text-white"}`}
            >
              Confirm Vote
            </button>
            :
            <button
              disabled = {Object.keys(election).length !== 0}
              type="submit"
              onClick={() => {
                window.location.assign("/vote-result");
              }}
              className={`rounded-md p-3 w-full text-xl font-medium hover:brightness-90 bg-yellow-lemon disabled:bg-gray text-black disabled:cursor-not-allowed `}
            >{object.keys(election).length !== 0 ? "Waiting for Election End": "Election Result"}
          </button>}
          </div>
          </div>
          )}
        </div>

        <div className="col-span-4">
          <div className="bg-white rounded-lg p-1.5 border border-gray-dark ">
            <img
              className="object-cover rounded-md mb-2 w-full"
              src={voter?.image}
            />
            <div className="grid grid-cols-2 break-words">
              <b>First Name</b>
              <p>{voter?.user?.first_name}</p>
              <b>Last Name</b> 
              <p>{voter?.user?.last_name}</p>
              {/* <b>Email</b>
              <p>{voter?.user?.email}</p> */}
              <b>Area</b>
              <p>{voter?.area?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;