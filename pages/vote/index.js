import React, { useState, useEffect } from "react";
import axios from "axios";

const Vote = () => {
  const [inputs, setInputs] = useState({});
  const [displayButtons, setDisplayButton] = useState([
    1, 2, 3, 4, 5, 6, 7, 
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 32, 33, 34, 35
    ])

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    // if (!user) {
    //   handleRedirect();
    // }
  }, []);

  function handleRedirect() {
    return window.location.replace("/");
  }

  return (
    <div>
        <div className="bg-green w-full absolute ">
            <a className="absolute p-6 text-yellow" href="../">
                Back
            </a>
            <h1 className="text-5xl font-medium text-white text-center pt-6">Candidate Election</h1>
        </div>
        <svg width="100%">
            <ellipse cx="50%" cy="32%" rx="52%" ry="60%" className="fill-green" />
        </svg>
        <div className="my-6 mx-20 w-1/2">
            <div className="grid grid-cols-7 gap-4 place-items-stretch h-56">
                {displayButtons.map((card, index) => {
                    return (
                        <button className="m-3 bg-gray hover:bg-gray-dark rounded text-black py-8 px-8">
                            {card}
                        </button>
                    );
                })}
            </div>
        </div>
        <div className="-my-60 mx-[1000px]">
            <div className="mx-1.5">
                <div class="m-3 flex flex-col items-center mt-4 mb-auto max-w-sm bg-[#2A5DAA] rounded-md shadow-md dark:border-gray-700  w-[37.75rem]  h-[41.5rem]  md:w-[32.75rem]  md:h-[30.5rem] ">
                    <img
                        class="rounded my-6"
                        src="https://www.eng.ku.ac.th/wp-content/uploads/2020/11/32-James-Edward-Brucker.jpg"
                        width={300}
                        height={400}
                    />
                    <div class="p-5 flex flex-col items-center -my-8">
                        <p class="mb-2 text-2xl font-bold tracking-tight text-[#fff] dark:text-white w-[300px] flex justify-center">
                        James Edward Brucker
                        </p>
                        <p class="mb-2 text-1xl font-bold tracking-tight text-[#fff] dark:text-white w-[300px] flex justify-center">
                        SKEKILLER
                        </p>
                    </div>
                    <button class="m-8 bg-gray hover:bg-gray-dark text-black font-bold py-4 px-4 rounded md:w-[23.85rem]  md:h-[5rem] ">
                        Vote No
                    </button>
                    <button class="-m-6 bg-party-red hover:bg-red text-white font-bold py-4 px-4 rounded md:w-[23.85rem]  md:h-[5rem] ">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

};

export default Vote;