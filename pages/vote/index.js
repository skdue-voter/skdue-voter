import React, { useState, useEffect } from "react";
import axios from "axios";

const Vote = () => {
  const [inputs, setInputs] = useState({});
  const [displayButtons, setDisplayButton] = useState([])
    const [displayCard, setDisplayCard] = useState({})

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    getCandidateList();
    // if (!user) {
    //   handleRedirect();
    // }
  }, []);

  async function getCandidateList() {
    await axios.get("https://sankasaint.helloyeew.dev/api/candidate")
        .then(response => {
            setDisplayButton(response.data.result)
            console.log(response.data.result)
            console.log(displayButtons)
        })
        .catch(error => {
            window.alert(error)
        })
}

  function handleRedirect() {
    return window.location.replace("/");
  }

  function handleSelectButton(card) {
    if (card.id == displayCard.id) {
        setDisplayCard({})
    } else {
        setDisplayCard(card)
    }
    console.log(displayCard.id)
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
                        <div>
                            <button className={`m-3 hover:brightness-90 rounded text-black py-8 px-8 ${displayCard.id === card.id ? "bg-yellow": "bg-gray"}`}
                            onClick={(e) => {
                                console.log("card", card.id);
                                handleSelectButton(card);
                            }}>
                                {card.id}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="-my-60 mx-[1100px]">
            <div className="mx-1.5">
                {displayCard.id !== undefined ? 
                <div class="m-3 flex flex-col items-center mt-4 mb-auto max-w-sm bg-party-blue rounded-md shadow-md dark:border-gray-700  w-[40.75rem]  h-[30.5rem]  md:w-[32.75rem]  md:h-[30.5rem] ">
                    <img
                        class="rounded my-6"
                        src={displayCard.image}
                        width={300}
                        height={400}
                    />
                    <div class="p-5 items-center -my-8">
                        <p class="mb-2 text-2xl font-bold text-white text-center">
                        {displayCard.user.first_name} {displayCard.user.last_name}
                        </p>
                        <p class="mb-2 text-l text-white text-center">
                        {displayCard.party && displayCard.party.name}
                        </p>
                        <div class="mb-2 w-full text-white text-center max-h-4">
                        {displayCard.description}
                        </div>
                    </div>
                </div>: 
                <div class="m-3 flex flex-col items-center mt-4 mb-auto max-w-sm bg-party-blue rounded-md shadow-md dark:border-gray-700  w-[40.75rem]  h-[30.5rem]  md:w-[32.75rem]  md:h-[30.5rem] ">
                <div class="p-5 items-center -my-8">
                    <p class="mt-40 text-l font-bold tracking-tight text-[#fff] dark:text-white w-[300px] flex justify-center">
                    Please select the candidate to vote.
                    </p>
                </div>
            </div>}
            </div>
            <div class="mx-[18px]">
                <button class="mt-4 bg-gray hover:bg-gray-dark text-black font-bold py-4 px-4 rounded md:w-[23.85rem] ">
                    Vote No
                </button>
                <button className={`mt-4 text-white font-bold py-4 px-4 rounded md:w-[23.85rem] ${displayCard.id !== undefined ? "bg-green hover:bg-green ": "bg-party-red hover:bg-red "}`}>
                    Confirm
                </button>
            </div>
        </div>
    </div>
  );

};

export default Vote;