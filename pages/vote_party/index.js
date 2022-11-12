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

  function handleRedirect() {
    return window.location.replace("/");
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
				<div className="grid grid-cols-1 grid-rows-7 gap-4">
					{displayCard.name !== undefined ? (
						<div class="bg-party-blue rounded-lg pb-2 text-white text-center p-2 row-span-5">
							<img
								class="rounded-md mb-2 w-full"
								src={displayCard.image}
							/>
							<p class="text-2xl font-bold">
								{displayCard.name}
							</p>
						</div>
					) : (
						<div class="bg-party-blue rounded-lg pb-2 text-white text-center p-2 row-span-5 flex">
							{displayCard.id !== "no" ? <p class="text-xl font-medium m-auto">Please select the candidate to vote.</p>:
							<p />}
						</div>
					)}
					<button type="submit" onClick={() => {handleSelectButton({id: "no"})}}
						className={`bg-gray py-5 rounded-md text-3xl font-medium text-black hover:brightness-90 ${
							displayCard.id === "no" ? "bg-yellow" : "bg-gray"
						}`}>Vote No</button>
					<button type="submit" onClick={() => {window.location.assign("/party_list")}}
						className={`py-5 text-3xl font-medium text-white rounded-md hover:brightness-90 ${
							displayCard.id !== undefined
								? "bg-green hover:bg-green "
								: "bg-party-red hover:bg-red "
						}`}>Confirm</button>
				</div>
			</div>
    </div>
  );
};

export default VoteParty;
