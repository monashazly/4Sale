"use client";

import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import useFetch from "@/hooks/useFetch";
import Dropdown from "./components/Dropdown";
import { useEffect, useRef } from "react";

const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const options = {
  method: "GET",
};

export default function Home() {
  const { data, pending } = useFetch(url, options);
  const toRef = useRef();
  const fromRef = useRef();

  useEffect(() => {
    console.log(
      "toRef.current.selectedCurrency",
      toRef.current?.selectedCurrency
    );
    console.log(
      "fromRef.current.selectedCurrency",
      fromRef.current?.selectedCurrency
    );
  }, [toRef.current?.selectedCurrency, fromRef.current?.selectedCurrency]);

  //  reset values
  const reset = () => {
    toRef.current.setCurrency(null);
    fromRef.current.setCurrency(null);
  };

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
              <Dropdown currencies={data} ref={fromRef} />
            </div>
            <button className="flex-shrink rounded-full border border-[#e6e6e6] w-9 h-9 mx-auto">
              <SwapHorizOutlinedIcon color="primary" />
            </button>
            <div className="flex-1 w-full">
              <label>To</label>
              <Dropdown currencies={data} ref={toRef} />
            </div>
          </div>
          <button
            className="bg-[#38609b] text-white mt-5 px-10 py-1 rounded-full"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        {pending && <h1>loading .....</h1>}
      </div>
    </div>
  );
}
