import React, { useState, useEffect } from "react";
import axios from "axios";

const VoteParty = () => {
  const [inputs, setInputs] = useState({});
  const [displayButtons, setDisplayButton] = useState([]);
  const [displayCard, setDisplayCard] = useState({});

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    getCandidateList();
    // if (!user) {
    //   handleRedirect();
    // }
  }, []);

  async function getCandidateList() {
    await axios.get("https://sankasaint.helloyeew.dev/api/party")
      .then((response) => {
        setDisplayButton(response.data.party);
        console.log(response.data.party);
        console.log(displayButtons);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async function handleVote() {
    if (window.confirm(`Voting for ${displayCard.id}?`) === true) {
      // save to session storage
      window.alert("Vote Completed")
    }
  }

  function handleSelectButton(card) {
    if (card.id == displayCard.id) {
      setDisplayCard({});
    } else {
      setDisplayCard(card);
    }
    console.log(displayCard.id);
  }

  return (
    <div>
      <div className="bg-green w-full absolute ">
				<a className="absolute m-4 text-yellow text-xl font-semibold" href="../home">
					Back
				</a>
        <h1 className="text-5xl font-medium text-white text-center mt-4"> Party Election</h1>
      </div>
      <svg width="100%" height="140">
        <ellipse cx="50%" cy="32%" rx="52%" ry="55%" className="fill-green" />
      </svg>
			
      <div className="grid grid-cols-3 grid-rolls-1 gap-10 my-10 m-auto xl:px-8 w-4/6">
        <div className="grid grid-cols-5 grid-rows-5 gap-4 place-items-center col-span-2 items-start">
          {displayButtons.map((card, index) => {
            return (
              <div>
                <button
                  className={`w-14 2xl:w-20 h-14 2xl:h-20 hover:brightness-90 rounded-md text-black ${
                    displayCard.id === card.id ? "bg-yellow" : "bg-gray"
                  }`}
                  onClick={(e) => {
                    console.log("card", card.id);
                    handleSelectButton(card);
                  }}
                >
                  {card.id}
                </button>
              </div>
            );
          })}
        </div>
				<div className="grid grid-cols-1 grid-rows-7 gap-4 max-w-[16rem] 2xl:max-w-[21rem]">
					{displayCard.name !== undefined ? (
						<div class="bg-party-blue rounded-lg pb-2 text-white text-center p-2 row-span-5 h-[19rem] 2xl:h-[24rem]">
							<img
								class="object-cover rounded-md mb-2 w-full h-[15rem] 2xl:h-[20rem]"
								src={displayCard.image}
							/>
							<p class="text-2xl font-bold">
								{displayCard.name}
							</p>
						</div>
					) : (
						<div class="bg-party-blue rounded-lg pb-2 text-white text-center p-2 row-span-5 flex h-[19rem] 2xl:h-[24rem]">
							<p class="text-xl m-auto">
                {displayCard.id !== "no" ? "Please select party to vote": "Choose Vote No"}</p>
						</div>
					)}
					<button type="submit" onClick={() => {handleSelectButton({id: "no"})}}
						className={`bg-gray py-5 rounded-md text-3xl font-medium text-black hover:brightness-90 ${
							displayCard.id === "no" ? "bg-yellow" : "bg-gray"
						}`}>Vote No</button>
					{displayCard.id !== undefined ? 
            <button type="submit" onClick={() => {handleVote()}} 
              className="py-5 text-3xl font-medium text-white rounded-md hover:brightness-90 bg-green-lime">
              Confirm</button>:
          <button type="submit" disabled
            className="py-5 text-3xl font-medium text-white rounded-md bg-red cursor-not-allowed">
            Confirm</button>}
				</div>
			</div>
    </div>
  );
};

export default VoteParty;
