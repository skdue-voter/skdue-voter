import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function Candidate() {
  const [cards, setCards] = useState([]);
  const [len, setLen] = useState(cards.length);

  const [mainIndex, setMainIndex] = useState(0);
  const [mainInfo, setMainInfo] = useState();
  const [displayCards, setDisplayCards] = useState([]);

  useEffect(() => {
    setLen(cards.length);
  }, [cards]);

  useEffect(() => {
    tryGet();
  }, []);

  async function isLogin() {
    axios
      .get(`https://sankasaint.helloyeew.dev/api/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    // handleRedirect();
  }

  function logout() {
    axios
      .post(
        `https://sankasaint.helloyeew.dev/api/logout`
        // , {git withCredentials: true,}
      )
      .then((res) => {
        console.log("logout success", res);
      })
      .catch((e) => {
        console.log(e);
      });
    // handleRedirect();
  }

  function handleRedirect() {
    sessionStorage.removeItem("user");
    return window.location.replace("/");
  }

  async function tryGet() {
    axios
      .get(`https://sankasaint.helloyeew.dev/api/candidate`)
      .then((res) => {
        console.log(res.data.result);
        let data = res.data.result;
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
    setMainInfo(cards[index]);
    setDisplayCards(array);
  }

  return (
    <div className="body flex h-screen ">
      <a className="absolute p-4 text-yellow" href="../">
        Back
      </a>
      <button
        className="absolute p-4 top-0 right-44 text-yellow"
        onClick={(e) => isLogin()}
      >
        Logout
      </button>
      <button
        className="absolute p-4 top-0 right-0 text-yellow"
        onClick={(e) => logout()}
      >
        Logout
      </button>
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
                    : card.user.first_name + " " + card.user.last_name + " "}
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
      <div className="flex flex-col items-center justify-center overflow-auto ">
        <h1 className="pt-6 pb-0 md:text-[22px] lg:text-[36px] ">
          {" "}
          &#60;Election&#62; Candidate
        </h1>
        <div className="flex flex-col items-center bg-party-blue  rounded-15  mb-2 pb-2 ">
          <img class="rounded-15 p-2 lg:w-[360px] " src={mainInfo?.image} />
          <div className="flex flex-col items-center ">
            <p className="text-2xl font-bold text-white dark:text-white flex justify-center">
              {mainInfo?.id +
                " " +
                mainInfo?.user?.first_name +
                " " +
                mainInfo?.user?.last_name}
            </p>
            <p className="text-1xl text-white dark:text-white flex justify-center ">
              {mainInfo?.party}
            </p>
            <p class="p-2 font-normal md:text-sm bg-white rounded-10 w-[21.5rem]">
              {mainInfo?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
