import React, { useState, useEffect } from "react";

function Home() {

  return (
    <div className="flex flex-col items-center">
      <div className="bg-green w-full">
        <div>
          <button className="text-xl float-right text-white mx-5 my-3 hover:opacity-80">
            Log Out
          </button>
        </div>
        <div className="flex place-content-around place-items-center pt-10 pb-4 px-80">
        </div>
        <h1 className="text-5xl font-medium text-white text-center py-4">Voting System</h1>
      </div>
      <svg width="100%">
        <ellipse cx="50%" cy="0%" rx="52%" ry="15%" className="fill-green" />
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

        <div className="bg-white rounded-15 w-2/3 p-1.5 border border-gray-dark h-2/3 h-[27rem]">
          <h1 className="text-3xl">Donald Trump</h1>
          <img className="max-h-96 rounded" src="trump.jpg" class="img-fluid" alt="..."></img>
          <p>Make Thailand great again!</p>
          <button type="submit"
            className="bg-gray w-32 mr-14 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
          >Candidate</button>
          <button type="submit"
            className="bg-yellow-lemon w-32 ml-40 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
          >Vote</button>
        </div>
      </div>
    </div>
  );
};

export default Home;