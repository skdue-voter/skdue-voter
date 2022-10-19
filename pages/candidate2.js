import React, { useEffect, useState } from "react";

function Candidate() {
  const [cards, setCards] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [mainIndex, setMainIndex] = useState(0);
  const [displayCards, setDisplayCards] = useState([0, 1, 2, 3, 4]);

  //   useEffect(() => {
  //     changeCards();
  //   }, [mainIndex]);

  function changeCards(index) {
    setDisplayCards(
      cards.slice(Math.max(index - 4, 0), Math.min(index + 5, cards.length))
    );
    console.log(
      Math.max(index - 4, 0),
      Math.max(index + 5, 0),
      cards.slice(Math.max(index - 4, 0), Math.min(index + 5, cards.length))
    );
  }

  return (
    <div className="body ">
      <div className="outer flex flex-col content-start w-1/2 ml-4 mt-20 gap-4 ">
        {displayCards.map((card, index) => {
          return (
            // TODO change key to other unique stuff
            <div
              key={index}
              className={`card flex flex-row border py-6 rounded  
                bg-green 
                ${mainIndex == card ? "bg-yellow" : ""}
               ${
                 Math.abs(mainIndex - card) == 3
                   ? "bg-lime-300 w-2/5 py-2.5"
                   : ""
               }
              ${
                Math.abs(mainIndex - card) == 4
                  ? "bg-lime-100 w-1/3 py-2"
                  : "w-1/2 py-3"
              } `}
              onClick={(e) => {
                setMainIndex(card);
                changeCards(card);
              }}
            >
              <span className="name ml-3">{card + "_____"}</span>
              <p>Patkamon Awaiwanont </p>
              <a href="#"> JUB JUB</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Candidate;
