import React, { useState, useEffect } from "react";

function Home() {

  async function handleVote() {
    if (window.confirm("Voting for Candidate Kim and\nVoting for Put-in Party?") === true) {
      // await axios vote POST
      window.alert("Vote Completed")
    }
  }

  async function handleLogout() {
    if (window.confirm("Logout?") === true) {
      // await axios logout POST
      window.location.replace("/")
    }
  }

  return (
    <div>
      <div className="bg-green w-full absolute ">
        <button type="submit" onClick={() => {handleLogout()}}
          className="absolute right-0 m-4 text-yellow text-xl font-semibold" >
          Logout</button>
        <h1 className="text-5xl font-medium text-white text-center mt-4">Name Surname</h1>
      </div>
      <svg width="100%" height="140">
        <ellipse cx="50%" cy="32%" rx="52%" ry="55%" className="fill-green" />
      </svg>

      <div className="grid grid-cols-5 gap-4 my-5 w-[700px] xl:w-[900px] m-auto">
        <div className="bg-white rounded-lg p-1.5 border border-gray-dark col-span-2">
          <p>Voter Info</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-dark col-span-3">
          <h1 className="text-3xl font-semibold p-2 items-center">Donald Trump's Election</h1>
          <img className="w-full" src="trump.jpg" alt="donald trump image"></img>
          <p className="m-3">Make Thailand great again!</p>
          <hr className="my-3 h-px bg-gray border-0" />

          <div className="grid grid-cols-4 grid-rows-2 gap-2 px-3 text-lg font-medium">
            <p className="col-span-3">Vote Candidate</p>
            <button type="submit" onClick={() => {window.location.assign("/vote_candidate")}}
              className="bg-green-lime py-0.5 rounded-md hover:brightness-90">Change</button>
            <p className="text-green-lime col-span-3 font-normal">Voted for Kim Un Jong</p>
            <button type="submit" onClick={() => {window.location.assign("/candidate")}}
              className="bg-gray py-0.5 text-lg font-medium rounded-md hover:brightness-90">Candidate</button>
          </div>
          <hr className="my-3 h-px bg-gray border-0" />

          <div className="grid grid-cols-4 grid-rows-2 gap-2 px-3 text-lg font-medium">
            <p className="col-span-3">Vote Party</p>
            <button type="submit" onClick={() => {window.location.assign("/vote_party")}}
              className="bg-yellow-lemon py-0.5 rounded-md hover:brightness-90">Vote</button>
            <p className="text-red col-span-3 font-normal">Vote pending</p>
            <button type="submit" onClick={() => {window.location.assign("/party_list")}}
              className="bg-gray py-0.5 text-lg font-medium rounded-md hover:brightness-90">Party List</button>
          </div>
          <hr className="my-3 h-px bg-gray border-0" />

          <p className="text-red mb-1 text-center font-medium">Only Voted for Candidate</p>
          <div className="m-1">
          <button type="submit" onClick={() => {handleVote()}}
            className="text-white bg-red rounded-md p-3 w-full text-xl font-medium hover:brightness-90"
          >Confirm Vote</button></div>
        </div>
      </div>
    </div>
  );
};

export default Home;