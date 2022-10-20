import React, { useEffect, useState } from "react";

function Candidate() {
  const [cards, setCards] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [mainIndex, setMainIndex] = useState(0);
  const [displayCards, setDisplayCards] = useState([
    9, 10, 11, 12, 0, 1, 2, 3, 4,
  ]);

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
    <div className="body flex h-screen ">
      <a className="absolute p-6 text-yellow" href="../">
        Back
      </a>
      <div className="absolute top-0 w-1/4 mt-0 h-full -z-10 bg-green">
        <svg
          className="ml-96 xl:ml-80 lg:ml-60 md:ml-48 sm:ml-40 "
          width="100%"
          height="100%"
        >
          <ellipse cx="0%" cy="50%" rx="52%" ry="80%" className="fill-green" />
        </svg>
      </div>
      <div className=" outer flex flex-col justify-center w-1/2  ml-14 my-auto gap-4 ">
        {displayCards.map((card, index) => {
          return (
            // TODO change key to other unique stuff
            <div
              key={index}
              className={`card flex flex-row border rounded bg-white 
                // ${index == 4 ? "font-extrabold" : ""}
               ${
                 index == 1 || index == 7
                   ? " opacity-80 w-2/5 lg:py-3 md:py-1"
                   : ""
               }
              ${
                index == 0 || index == 8
                  ? " w-1/3 lg:py-2 md:py-0 opacity-60"
                  : "w-1/2 lg:py-6 md:py-2"
              } `}
              onClick={(e) => {
                setMainIndex(card);
                changeCards(card);
              }}
            >
              <span className="name ml-3">{card + "_____"}</span>
              <p className={`${index == 0 || index == 8 ? " text-sm" : ""}`}>
                Patkamon Awaiwanont{" "}
              </p>
              <a
                className={`${index == 0 || index == 8 ? " text-sm" : ""}`}
                href="#"
              >
                link
              </a>
            </div>
          );
        })}
      </div>

      <div class="flex flex-col items-center my-auto sm:mr-16 max-w-sm bg-[#2A5DAA] rounded-md shadow-md dark:border-gray-700  w-[37.75rem] h-[41.5rem]">
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
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-[22rem] h-[12.5rem] bg-[#fff] rounded-md my-2">
            ตำแหน่งทางวิชาการ: Software Engineering Specialist การศึกษา: Ph.D (
            Electrical Engineering ), University of California , 1986 M.A (
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
