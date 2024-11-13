"use client";

import useFetch from "@/hooks/useFetch";

const url = "https://currency-exchange.p.rapidapi.com/listquotes";
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '60e8bd664emsh7f403961699b4abp158776jsna9ca2e98cfdc',
		'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
	}
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
          <div className="flex md:justify-between md:flex-row flex-col gap-4">
            <div className="flex-1">
              <label>Amount</label>
              <input type="number" className="w-full" />
            </div>
            <div className="flex-1">
              <label>From</label>
              <select className="w-full">
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
              </select>
            </div>
            <div className="flex-1">
              <label>To</label>
              <select className="w-full">
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
              </select>
            </div>
          </div>
          <button className="bg-[#38609b] text-white mt-5 px-10 py-1 rounded-full">Reset</button>
        </div>
        {pending && <h1>loading .....</h1>}
      </div>
    </div>
  );
}
