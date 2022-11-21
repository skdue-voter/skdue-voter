import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

const VoteResult = () => {
  const router = useRouter()
  const [area, setArea] = useState([1, 2, 3, 4]);
  const [selectArea, setSelectArea] = useState();
  const [selectType, setSelectType] = useState(0);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    getCandidateList();
  }, []);

  async function getCandidateList(area) {
    await axios.get(`https://sankasaint.helloyeew.dev/api/election/2/result/area/${area?area:1}`)
      .then((response) => {
        setResultData(response.data.vote_result);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async function getPartyList(area) {
    await axios.get(`https://sankasaint.helloyeew.dev/api/election/2/result/area/${area?area:1}`)
      .then((response) => {
        setResultData(response.data.vote_result);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  const handleSelectArea = (event) => {
    const value = event.target.value;
    setSelectArea(value)
    getCandidateList(value)
  };

  function handleSelectType(value) {
    if (value !== selectType) {
      setSelectType(value)
      if (value === 0) {
        getCandidateList(selectArea)
      } else {
        getPartyList(selectArea)
      }
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

      <div className="flex bg-white rounded-lg border border-gray-dark p-1 w-[50rem] m-auto mt-2">
        <p className="my-2 mx-4 text-xl font-semibold">Area</p>
        <select value={selectArea} onChange={handleSelectArea} class="bg-gray text-sm rounded-md w-20 p-2">
          {area.map((area, index) => { return (<option>{area}</option>) })}
        </select>
        <p className="my-2 mx-4 text-xl">{resultData[0] && resultData[0].candidate.area.name}</p>
      </div>

      <div className="flex bg-gray rounded-full w-[50rem] m-auto mt-4 text-xl font-semibold">
        <button
          type="submit"
          onClick={(e) => {handleSelectType(0)}}
          className={`p-2 rounded-full w-1/2 ${selectType === 0 ? "bg-white drop-shadow-md" : ""}`}
        >Candidate</button>
        <button
          type="submit"
          onClick={(e) => {handleSelectType(1)}}
          className={`p-2 rounded-full w-1/2 ${selectType === 1 ? "bg-white drop-shadow-md" : ""}`}
        >Party</button>
      </div>
			
      <div className="grid grid-cols-1 gap-4 m-auto my-4 w-[50rem] h-[36rem] overflow-auto">
        {resultData.map((data, index) => {
          return (
            <div className="flex bg-white rounded-lg border border-gray-dark">
              <p className="flex-none text-center mx-5 mt-5 font-bold text-xl">{data.vote_count}</p>
              <img
                className="flex-none object-cover w-44 h-full"
                src={data.candidate.image}
              />
              <div className="flex-auto m-4">
                <p className="text-2xl font-semibold mb-1">{data.candidate.user.first_name} {data.candidate.user.last_name}</p>
                <p className="text-lg mb-4">{data.candidate.description}</p>
                <div className="text-md mt-2 opacity-80">
                  <p>Party: {data.candidate.party?c.candidate.party:"Liberal"}</p>
                  <p>Area: {data.candidate.area.name}</p>
                </div>
              </div>
            </div>
          );
        })}
			</div>
    </div>
  );
};

export default VoteResult;
