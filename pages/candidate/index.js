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
      <a className="absolute p-6 text-yellow" href="../">
        Back
      </a>
      <div className="absolute top-0 w-1/4 mt-0 h-full -z-10 bg-green">
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
        className=" outer flex flex-col justify-center w-1/2 h-[85%] ml-14 my-auto gap-4  overflow-y-scroll"
      >
        {displayCards.map((card, index) => {
          let main = mainIndex;
          return (
            <div className="flex flex-row gap-5 ">
              <div
                key={index}
                className={`card flex flex-row border rounded bg-white max-h-44  
              ${card == null ? "opacity-0" : ""}
                 ${index == 4 ? "font-semibold w-1/2 md:py-5" : "opacity-60"}
               ${
                 (index == 1 || index == 7) && card != main
                   ? "  w-2/5 md:py-3 "
                   : ""
               }
              ${
                (index == 0 || index == 8) && card != main
                  ? " w-1/3 md:py-2 "
                  : "md:py-5"
              }
              ${
                index == 2 || index == 3 || index == 5 || index == 6
                  ? " w-[45%]"
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
                {" "}
                {">"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center ">
        <h1 className="pt-6 pb-0 md:text-[22px] lg:text-[36px] ">
          {" "}
          &#60;Election&#62; Candidate
        </h1>
        <div class="flex flex-col items-center bg-party-blue rounded-15 max-h-[80%]">
          <img
            class="rounded-10 p-2 w-[360px] max-w-[360px]"
            src="https://www.eng.ku.ac.th/wp-content/uploads/2020/11/32-James-Edward-Brucker.jpg"
          />
          <div class="flex flex-col items-center">
            <p class="text-2xl font-bold text-white dark:text-white flex justify-center">
              James Edward Brucker
            </p>
            <p class="text-1xl text-white dark:text-white flex justify-center">
              SKEKILLER
            </p>
            <p class="p-2 font-normal md:text-sm bg-white rounded-10 w-[21.5rem] mb-2 overflow-y-auto">
              ตำแหน่งทางวิชาการ: Software Engineering Specialist การศึกษา: Ph.D
              ( Electrical Engineering ), University of California , 1986 M.A (
              Mathematics ), University of Hawaii , 1981 M.A ( Statistics ),
              University of California , 1978 B.A. ( Mathematics), Johns Hopkins
              University, 1977
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;