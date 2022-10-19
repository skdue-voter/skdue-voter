import React from "react";

const candidate = () => {
  return (
    <div>
        <div>candidate</div>
        <div class="flex flex-col items-center max-w-sm bg-[#2A5DAA] rounded-md shadow-md dark:border-gray-700 ml-[70%] w-[37.75rem] h-[41.5rem]">
            <img class="rounded my-6" src="https://www.eng.ku.ac.th/wp-content/uploads/2020/11/32-James-Edward-Brucker.jpg" width={300} height={400}/>
            <div class="p-5 flex flex-col items-center -my-8">
                <p class="mb-2 text-2xl font-bold tracking-tight text-[#fff] dark:text-white w-[300px] flex justify-center">James Edward Brucker</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-[22rem] h-[12.5rem] bg-[#fff] rounded-md my-2">ตำแหน่งทางวิชาการ:	Software Engineering Specialist
                    การศึกษา:	Ph.D ( Electrical Engineering ), University of California , 1986
                                M.A ( Mathematics ), University of Hawaii , 1981
                                M.A ( Statistics ), University of California , 1978
                                B.A. ( Mathematics), Johns Hopkins University, 1977
                </p>
            </div>
        </div>
    </div>
  );
};

export default candidate;
