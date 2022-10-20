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
              className={`card flex flex-row border rounded 
                ${index == 4 ? "bg-yellow" : "bg-white"}
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
    </div>
  );
}

export default Candidate;
