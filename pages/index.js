import React, { useState, useEffect } from "react";

function Home() {

  return (
    <div className="flex flex-col items-center">
      <div className="bg-green w-full">
        <div className="flex place-content-around place-items-center pt-10 pb-4 px-80">
        </div>
        <h1 className="text-5xl font-medium text-white text-center py-4">Voting System</h1>
      </div>
      <svg width="100%">
        <ellipse cx="50%" cy="0%" rx="52%" ry="15%" className="fill-green" />
      </svg>
<div class="relative h-16 w-16">
  <div class="absolute inset-y-0 right-10 w-16">
        <div className="bg-white rounded-15 w-96 p-1.5 border border-gray-dark">
        <p>Make Thailand great again!</p>
        </div>
  </div>
</div>
      <div class="relative h-16 w-16">
  <div class="absolute inset-y-0 left-10 w-32">
        <div className="bg-white rounded-15 w-96 p-1.5 border border-gray-dark">
          <h1>Donald Trump</h1>
    <img className="max-h-80 rounded" src="trump.jpg" class="img-fluid" alt="..."></img>
    <p>Make Thailand great again!</p>
            <button type="submit"
              className="bg-gray w-32 mr-14 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
            >Candidate</button>
            <button type="submit"
              className="bg-yellow-lemon w-32 ml-14 rounded-10 p-1 my-1 w-full text-xl font-medium hover:opacity-80"
            >Vote</button>
            </div>
    </div>
</div>
    </div>
  );
};

export default Home;