import React, { useCallback, useEffect, useState } from "react";

function Candidate() {
  const [cards, setCards] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [mainIndex, setMainIndex] = useState(0);
  const [displayCards, setDisplayCards] = useState([
    9, 10, 11, 12, 0, 1, 2, 3, 4,
  ]);

  const [clientWindowHeight, setClientWindowHeight] = useState("");

  useEffect(() => {
    setClientWindowHeight(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = (event) => {
    let height = clientWindowHeight;
    let _card = mainIndex;
    setClientWindowHeight(window.scrollY);
    if (window.scrollY > height) {
      setMainIndex((_card + 1) % cards.length);
      changeCards((_card + 1) % cards.length);
      console.log((_card + 1) % cards.length);
    } else {
      setMainIndex(Math.abs((_card - 1) % cards.length));
      changeCards(Math.abs((_card - 1) % cards.length));
      console.log(Math.abs((_card - 1) % cards.length));
    }
  };

  function changeCards(index) {
    let array = [
      cards[(index - 4 + cards.length) % cards.length],
      cards[(index - 3 + cards.length) % cards.length],
      cards[(index - 2 + cards.length) % cards.length],
      cards[(index - 1 + cards.length) % cards.length],
      cards[index],
      cards[(index + 1) % cards.length],
      cards[(index + 2) % cards.length],
      cards[(index + 3) % cards.length],
      cards[(index + 4) % cards.length],
    ];
    setDisplayCards(array);
  }

  return (
    <div className="body flex h-screen " onScroll={handleScroll}>
      <a className="absolute p-6 text-yellow" href="../">
        Back
      </a>
      <div className="absolute top-0 w-1/4 mt-0 h-full -z-10 bg-green">
        <svg
          className="ml-96 xl:ml-80 lg:ml-60 md:ml-48 sm:ml-40 "
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
      <div className=" outer flex flex-col justify-center w-1/2  ml-14 my-auto gap-4 pt-10 ">
        {displayCards.map((card, index) => {
          return (
            // TODO change key to other unique stuff

            // ${index == 1 || index == 7 ? "  w-2/5 lg:py-3 md:py-1" : ""} md:py-0 md:py-2
            <div
              key={index}
              className={`card flex flex-row border rounded bg-white max-h-44
                 ${index == 4 ? "font-semibold" : "opacity-60"}
               ${index == 1 || index == 7 ? "  w-2/5 md:py-3 " : ""}
              ${
                index == 0 || index == 8
                  ? " w-1/3 md:py-2 "
                  : "w-1/2 md:py-5 2xl:py-3 "
              } `}
              onClick={(e) => {
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
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <h1 className="pt-6 pb-0 md:text-[22px] lg:text-[36px] ">
          {" "}
          &#60;Election&#62; Candidate
        </h1>
        <div class=" flex flex-col items-center mt-4 mb-auto max-w-sm bg-[#2A5DAA] rounded-md shadow-md dark:border-gray-700  w-[37.75rem]  h-[41.5rem]  md:w-[32.75rem]  md:h-[38.5rem]  ">
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
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-[22rem] h-[12.5rem] md:text-sm md:w-9/10 md:h-32 bg-[#fff] rounded-md my-2">
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
