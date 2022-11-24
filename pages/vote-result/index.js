import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

const VoteResult = () => {
  const router = useRouter()
  const [area, setArea] = useState([]);
  const [selectArea, setSelectArea] = useState();
  const [selectType, setSelectType] = useState(0);
  const [candidateList, setCandidateList] = useState([]);
  const [partyList, setPartyList] = useState([]);

  useEffect(() => {
    getArea()
    getCandidateList()
    getPartyList()
  }, []);

  async function getArea() {
    await axios.get(`https://sankasaint.helloyeew.dev/api/area`)
      .then((response) => {
        setArea(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getCandidateList(area) {
    await axios.get(`https://sankasaint.helloyeew.dev/api/election/latest/result/area/${area?area:1}`)
      .then((response) => {
        setCandidateList(response.data.vote_result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getPartyList() {
    await axios.get(`https://sankasaint.helloyeew.dev/api/election/latest/result/party`)
      .then((response) => {
        setPartyList(response.data.vote_result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSelectArea(event) {
    const value = event.target.value;
    setSelectArea(value)
    getCandidateList(value)
  };

  function handleSelectType(value) {
    if (value !== selectType) {
      setSelectType(value)
    }
  }

  return (
    <div>
      <div className="bg-green w-full absolute">
				<button className="absolute m-4 text-yellow text-xl font-semibold" onClick={() => router.back()}>
					Back
				</button>
        <h1 className="text-5xl font-medium text-white text-center mt-4">Election Result</h1>
      </div>
      <svg width="100%" height="140">
        <ellipse cx="50%" cy="32%" rx="52%" ry="55%" className="fill-green" />
      </svg>

      <div className="flex bg-gray rounded-full w-[50rem] m-auto mt-2 text-xl font-semibold ">
        <button
          type="submit"
          onClick={(e) => {handleSelectType(0)}}
          className={`p-2 rounded-full w-1/2 ${selectType === 0 ? "bg-white drop-shadow-md" : "opacity-60"}`}
        >Candidate</button>
        <button
          type="submit"
          onClick={(e) => {handleSelectType(1)}}
          className={`p-2 rounded-full w-1/2 ${selectType === 1 ? "bg-white drop-shadow-md" : "opacity-60"}`}
        >Party</button>
      </div>

      {selectType == 0 && <div className="flex bg-white rounded-lg border border-gray-dark p-1 w-[50rem] m-auto mt-4">
        <p className="my-2 mx-4 text-xl font-semibold">Area</p>
        <select value={selectArea} onChange={handleSelectArea} className="bg-gray text-sm rounded-md w-20 p-2 cursor-pointer">
          {area.map((area, index) => { return (<option>{area.id}</option>) })}
        </select>
        <p className="my-2 mx-4 text-xl">{candidateList[0] && candidateList[0].candidate.area.name}</p>
      </div>}
			
      <div className="grid grid-cols-1 gap-4 m-auto my-4 w-[50rem] h-[36rem] overflow-auto">
        {selectType === 0 ? candidateList.map((data, index) => {
          return (
            <div className="flex bg-white rounded-lg border border-gray-dark">
              <p className="flex-none rounded-l-lg text-center px-2 pt-2 font-semibold text-xl text-white bg-green">
                {data.vote_count}</p>
              <img
                className="flex-none object-cover w-44 h-full"
                src={data.candidate.image}
              />
              <div className="flex-auto my-2 mx-4">
                <p className="text-2xl font-semibold">{data.candidate.user.first_name} {data.candidate.user.last_name}</p>
                <div className="text-md opacity-80 mt-4">
                  <p>Party: {data.candidate.party?data.candidate.party.name:"Liberal"}</p>
                  <p>Area: {data?.candidate.area.name}</p>
                </div>
              </div>
            </div>
          )}) : partyList.map((data, index) => {
            return (
              <div className="flex bg-white rounded-lg border border-gray-dark">
                <p className="flex-none rounded-l-lg text-center px-2 pt-2 font-semibold text-xl text-white bg-green">
                  {data.real_result}</p>
                <img
                  className="flex-none object-cover w-44 h-full"
                  src={data.party.image}
                />
                <div className="flex-auto my-2 mx-4">
                  <p className="text-2xl font-semibold">{data.party.name}</p>
                  <p className="text-lg mb-4">{data.party.quote}</p>
                </div>
              </div>
            )
          })
        }
			</div>
    </div>
  );
};

export default VoteResult;
