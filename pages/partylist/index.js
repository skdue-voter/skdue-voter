import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';

function Candidate() {
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
      <a className="absolute p-4 text-yellow" href="../">
        Back
      </a>
      <div className="absolute top-0 w-[22rem] sm:1/5 mt-0 h-full -z-10 bg-green">
        <svg
          className="ml-36 xl:ml-50 lg:ml-60 md:ml-48 sm:ml-40  "
          width="100%"
          height="100%"
        >
          <ellipse
            cx="-60%"
            cy="50%"
            rx="122%"
            ry="80%"
            className="fill-green"
          />
        </svg>
      </div>
      <a className="absolute p-4 text-yellow" href="../">
        Back
      </a>
      <div className="absolute top-0 w-[22rem] sm:1/5 mt-0 h-full -z-10 bg-green">
        <svg
          className="ml-36 xl:ml-50 lg:ml-60 md:ml-48 sm:ml-40  "
          width="100%"
          height="100%"
        >
          <ellipse
            cx="-60%"
            cy="50%"
            rx="122%"
            ry="80%"
            className="fill-green"
          />
        </svg>
      </div>
      <div className=" outer flex flex-col justify-center w-1/2 h-[90%] ml-14 my-auto gap-4  overflow-y-scroll">
        {displayCards.map((card, index) => {
          let id = card != null ? card.id : null;
          let main = mainIndex;
          return (
            <div key={index} className="flex flex-row gap-5 ">
              <div
                className={`card flex flex-row border rounded bg-white max-h-44 
              ${card == null ? "invisible" : ""}
                 ${
                   index == 4
                     ? "font-semibold w-1/2 max-w-[22rem] md:py-5"
                     : "opacity-60 "
                 }
               ${
                 (index == 1 || index == 7) && card != main
                   ? "  w-2/5 md:py-3 max-w-[18rem]"
                   : ""
               }
              ${
                (index == 0 || index == 8) && card != main
                  ? " w-1/3 md:py-2 max-w-[16rem]"
                  : "md:py-5"
              }
              ${
                index == 2 || index == 3 || index == 5 || index == 6
                  ? "w-[45%]  md:py-4 max-w-[20rem]"
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
                {" "}
                {">"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center overflow-auto ">
        <h1 className="pt-6 pb-0 md:text-[22px] lg:text-[36px] flex justify-center">
          {" "}
          &#60;Election&#62; Party-List
        </h1>
        <div class="grid grid-cols-2 gap-2 grid-rows-2 bg-party-blue rounded-15 mb-2 pb-2 pt-2 pr-2">
          <img
            class="rounded-15 pl-2 lg:w-[300px] lg:h-[300px] col-start-1 col-end-1"
            src={ mainInfo?.image }
          />
          <p class="font-normal md:text-sm bg-white lg:w-[320px] rounded-10 col-start-2 row-start-1 row-end-3">
            { mainInfo?.description }
          </p>
          <div class="px-2 pb-3 -my-3">
            <p class="text-2xl font-bold text-white dark:text-white col-start-1 flex justify-center pb-2">
              { mainInfo?.name }
            </p>
            <p class="font-normal md:text-sm text-white rounded-10 lg:w-[300px] lg:h-[300px] col-start-1 col-end-1 row-start-3">
              { mainInfo?.description }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
