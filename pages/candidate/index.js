import React, { useCallback, useEffect, useState } from "react";

function Candidate() {
  const [cards, setCards] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [len, setLen] = useState(cards.length);

  const [mainIndex, setMainIndex] = useState(0);
  const [displayCards, setDisplayCards] = useState([
    null,
    null,
    null,
    null,
    0,
    1,
    2,
    3,
    4,
  ]);

  const handleCandidateChange = (event) => {
    const index = event.target.value
    setMainIndex(index);
    changeCards(index);
  };

  useEffect(() => {
    setLen(cards.length);
    console.log("set length", len);
  }, [cards]);

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
      <div
        // onWheel={(event) => {
        //   let _index = mainIndex;
        //   if (event.nativeEvent.wheelDelta > 0) {
        //     setMainIndex(Math.max(0, _index--));
        //     changeCards(Math.max(0, _index--));
        //   } else {
        //     setMainIndex(Math.min(len, _index++));
        //     changeCards(Math.min(len, _index++));
        //   }
        // }}
        className="outer flex flex-col justify-center w-2/5 h-[90%] ml-6 my-auto gap-4 p-2"
      >
        <input
          className="fixed w-[37%] 2xl:w-[40%] h-3 bg-white/80 rounded-sm appearance-none cursor-pointer range-lg top-20 origin-left transform rotate-90"
          type="range"
          min="0"
          max={cards.length-1}
          value={mainIndex}
          onChange={handleCandidateChange}
        />
        {displayCards.map((card, index) => {
          let main = mainIndex;
          return (
            <div key={index} className="flex flex-row gap-5 ml-8">
              <div
                className={`card flex flex-row rounded-md bg-white max-h-44 
              ${card == null ? "invisible" : ""}
                 ${
                   index == 4
                     ? "font-semibold w-1/2 md:py-5 max-w-[22rem] "
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
                  console.log("card", card);
                  setMainIndex(card);
                  changeCards(card);
                }}
              >
                <span className="name ml-3">{card + ")"}</span>
                <p
                  className={`${
                    index == 0 || index == 8 ? "sm:text-sm lg:text-md" : ""
                  }`}
                >
                  Patkamon Awaiwanont{" "}
                </p>
              </div>
              <div
                className={`my-auto  ${
                  card != main ? "opacity-0" : ""
                } text-white font-medium text-3xl`}
              >
                {">"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center overflow-auto">
        <h1 className="pb-10 text-5xl font-semibold">Candidate</h1>
        <div class="bg-party-blue rounded-lg pb-2 text-white w-1/3 p-2">
          <img class="rounded-md"
            src="https://www.eng.ku.ac.th/wp-content/uploads/2020/11/32-James-Edward-Brucker.jpg"
          />
          <p class="text-2xl font-bold dark:text-white text-center pt-2">
            James Edward Brucker
          </p>
          <p class="text-xl dark:text-white text-center pb-2">
            SKEKILLER
          </p>
          <p class="p-2 text-sm bg-white text-black rounded-md">
            ตำแหน่งทางวิชาการ: Software Engineering Specialist การศึกษา: Ph.D
            ( Electrical Engineering ), University of California , 1986 M.A (
            Mathematics ), University of Hawaii , 1981 M.A ( Statistics ),
            University of California , 1978 B.A. ( Mathematics), Johns Hopkins
            University, 1977
          </p>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
