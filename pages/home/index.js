import React, { useState, useEffect } from "react";

function Home() {

  return (
    <div className="flex flex-col items-center">
      <div className="bg-green w-full absolute ">
        <a className="absolute p-6 text-yellow" href="../">
          Log Out
        </a>
        <h1 className="text-5xl font-medium text-white text-center pt-6">Home Page</h1>
      </div>
      <svg width="100%">
        <ellipse cx="50%" cy="32%" rx="52%" ry="60%" className="fill-green" />
      </svg>

      <div className="grid grid-cols-2 gap-4">
        <div className="1/3">
          <div className="bg-white rounded-15 float-right w-2/3 p-1.5 border border-gray-dark">
            <p>Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
              Make Thailand great again! Make Thailand great again! Make Thailand great again! Make Thailand great again!
            </p>
          </div>
        </div>

        <div className="bg-white relative rounded-15 w-2/3 p-1.5 border border-gray-dark h-2/3 h-[43rem]">
          <h1 className="text-3xl">Donald Trump</h1>
          <img className="max-h-96 rounded" src="trump.jpg" class="img-fluid" alt="..."></img>
          <b className="mt-3 mb-3 left-3">Make Thailand great again!</b>

          <div class="mx-4 bg-green-200 p-2">
            <div class="flex flex-col-reverse">
              <div className="text-red mt-4 text-xl font-medium">Vote Pending
                <button type="submit"
                  className="bg-gray w-32 mt-0 absolute right-3 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
                >Party List</button></div>
                <div class="flex flex-col-reverse">
              <div className="text-xl mt-6 font-medium">Vote Party
                <button type="submit"
                  className="bg-yellow-lemon w-32 mt-0 absolute right-3 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
                >Vote</button></div>
              <div className="text-green mt-4 text-xl font-medium">Voted for James Broker
                <button type="submit"
                  className="bg-gray w-32 mt-0 absolute right-3 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
                >Candidate</button></div>
                </div>
              <div className="text-xl mt-4 font-medium">Vote Candidate
                <button type="submit"
                  className="bg-green w-32 mt-0 absolute right-3 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
                >Change</button></div>
                </div>
          </div>
          <p className="text-red mt-4 mb-2 text-center">Only Voted for Candidate</p>
          <button type="submit"
            className="text-white bg-red w-11/12 p-2 ml-5 rounded-10 text-xl font-medium hover:opacity-80"
          >Confirm Vote</button>
        </div>
      </div>
    </div>
  );
};

export default Home;