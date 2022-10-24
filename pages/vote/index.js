import React, { useState, useEffect } from "react";
import axios from "axios";

const Vote = () => {
  const [inputs, setInputs] = useState({});

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
        <div>

        </div>
        <div>
            <div className="flex flex-col items-center">
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
                </div>
                <button class="m-3 bg-gray hover:bg-gray-dark text-black font-bold py-2 px-4 rounded md:w-[23.85rem]  md:h-[5rem] ">
                    Vote No
                </button>
                <button class="-m-0.5 bg-yellow-lemon hover:bg-yellow text-black font-bold py-2 px-4 rounded md:w-[23.85rem]  md:h-[5rem] ">
                    Confirm
                </button>
            </div>
      </div>
    </div>
  );

};

export default Vote;