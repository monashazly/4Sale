"use client";

import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import useFetch from "@/hooks/useFetch";
import Dropdown from "./components/Dropdown";

const url = "https://currency-exchange.p.rapidapi.com/listquotes";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "60e8bd664emsh7f403961699b4abp158776jsna9ca2e98cfdc",
    "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
  },
};

export default function Home() {
  const { data, pending } = useFetch(url, options);
  return (
    <div className="bg-[url('/image.png')] bg-cover h-screen">
      <div className="bg-[#40618a] h-full bg-opacity-[0.7] backdrop-blur-sm flex flex-col gap-8">
        <h1 className="text-white text-3xl font-extrabold text-center mt-28">
          Money Exchange
        </h1>
        <div className=" bg-white rounded-3xl min-w-[80%] mx-auto min-h-80 shadow-lg p-16">
          <div className="flex md:justify-between md:flex-row flex-col gap-4 items-end">
            <div className="flex-1 w-full">
              <label>Amount</label>
              <input
                type="number"
                step="any"
                min="0.0"
                className="border border-[#e6e6e6] rounded-[5px] p-1 w-full shadow-sm"
                placeholder="0.0"
              />
            </div>
            <div className="flex-1 w-full">
              <label>From</label>
              <Dropdown className=""/>
            </div>
            <button className="flex-shrink rounded-full border border-[#e6e6e6] w-9 h-9 mx-auto">
              <SwapHorizOutlinedIcon color="primary" />
            </button>
            <div className="flex-1 w-full">
              <label>To</label>
              <Dropdown />
            </div>
          </div>
          <button className="bg-[#38609b] text-white mt-5 px-10 py-1 rounded-full">
            Reset
          </button>
        </div>
        {pending && <h1>loading .....</h1>}
      </div>
    </div>
  );
}
