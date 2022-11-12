import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';

function PartyList() {
  const [cards, setCards] = useState([]);
  const [len, setLen] = useState(cards.length);

  const [mainIndex, setMainIndex] = useState(0);
  const [mainInfo, setMainInfo] = useState();
  const [displayCards, setDisplayCards] = useState([]);

  useEffect(() => {
    setLen(cards.length);
    // console.log("set length", len);
  }, [cards]);

  useEffect(() => {
    tryGet();
  }, []);

  async function tryGet() {
    axios
      .get(`https://sankasaint.helloyeew.dev/api/party`)
      .then((res) => {
        console.log(res.data.party);
        let data = res.data.party;
        setCards(data);
        setDisplayCards([
          null,
          null,
          null,
          null,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
        ]);
        setMainInfo(data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleCandidateChange = (event) => {
    const index = event.target.value
    setMainIndex(index);
    changeCards(index);
  };

  function changeCards(index) {
    let array = [
      index - 4 >= 0 ? cards[index - 4] : null,
      index - 3 >= 0 ? cards[index - 3] : null,
      index - 2 >= 0 ? cards[index - 2] : null,
      index - 1 >= 0 ? cards[index - 1] : null,
      cards[index],
      index + 1 < len ? cards[index + 1] : null,
      index + 2 < len ? cards[index + 2] : null,
      index + 3 < len ? cards[index + 3] : null,
      index + 4 < len ? cards[index + 4] : null,
    ];
    setMainInfo(cards[index])
    setDisplayCards(array);
  }

  return (
    <div className="body flex h-screen ">
      <a className="absolute m-4 text-yellow text-xl font-semibold" href="../home">
        Back
      </a>
      <div className="absolute top-0 w-[22rem] sm:1/5 mt-0 h-full -z-10 bg-green">
        <svg width="100%" height="100%"className="ml-36 xl:ml-50 lg:ml-60 md:ml-48 sm:ml-40">
          <ellipse cx="-60%" cy="50%" rx="122%" ry="80%" className="fill-green" />
        </svg>
      </div>
      <div className="outer flex flex-col justify-center w-1/3 h-[90%] ml-6 my-auto gap-4 p-2">
        <input
          className="fixed w-[37%] 2xl:w-[40%] h-3 bg-white/80 rounded-sm appearance-none cursor-pointer range-lg top-20 origin-left transform rotate-90"
          type="range"
          min="0"
          max={cards.length-1}
          value={mainIndex}
          onChange={handleCandidateChange}
        />
        {displayCards.map((card, index) => {
          let id = card != null ? card.id : null;
          let main = mainIndex;
          return (
            <div key={index} className="flex flex-row gap-5 ml-8">
              <div
                className={`card flex flex-row rounded-md bg-white max-h-44 cursor-pointer
              ${card == null ? "invisible" : ""}
                 ${
                   index == 4
                     ? "font-semibold w-1/2 max-w-[22rem] md:py-5"
                     : "opacity-60 "
                 }
               ${
                 (index == 1 || index == 7) && card != main
                   ? "w-2/5 md:py-3 max-w-[18rem]"
                   : ""
               }
              ${
                (index == 0 || index == 8) && card != main
                  ? "w-1/3 md:py-2 max-w-[16rem]"
                  : "md:py-5"
              }
              ${
                index == 2 || index == 3 || index == 5 || index == 6
                  ? "w-[45%] md:py-4 max-w-[20rem]"
                  : ""
              }
              
              `}
                onClick={(e) => {
                  console.log("card", id - 1);
                  setMainIndex(id - 1);
                  changeCards(id - 1);
                }}
              >
                <span className="name ml-3">{id + ")"}</span>
                <p
                  className={`${
                    index == 0 || index == 8 ? "sm:text-sm lg:text-md" : ""
                  }`}
                >
                  {card == null
                    ? null
                    : card.name + " "}
                </p>
              </div>
              <div
                className={`my-auto  ${
                  id - 1 != main ? "opacity-0" : ""
                } text-white font-medium text-3xl`}
              >
                {">"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center overflow-auto">
        <h1 className="pb-10 text-5xl font-semibold margin-auto"> Party</h1>
        <div class="bg-party-blue rounded-lg text-white margin-auto grid grid-cols-3 grid-rows-2 w-[1000px] h-[700px] p-2">
          <img class="rounded-md h-full m-auto"
            src={ mainInfo?.image }
          />
          <p class="text-md bg-white text-black row-span-2 col-span-2 rounded-md p-2 ml-2">
            { mainInfo?.description }
          </p>
          <div>
            <p class="text-3xl font-semibold text-center pt-2 pb-6">
              { mainInfo?.name }
            </p>
            <p class="font-normal text-md p-2">
              { mainInfo?.description }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartyList;
