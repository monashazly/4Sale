"use client";

import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import Dropdown from "./components/Dropdown";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "./slices/currencySlice";
import { setFromCurrency, setToCurrency } from "./slices/currencySlice";

const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const options = {
  method: "GET",
};

export default function Home() {
  const dispatch = useDispatch();
  const { currencies, pending, fromCurrency, toCurrency } = useSelector(
    (state) => state.currency
  );

  //  reset values
  const reset = () => {};

  useEffect(() => {
    dispatch(fetchCurrencies({ url, options }));
  }, [dispatch]);

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
              <Dropdown
                currencies={currencies}
                selectedCurrency={fromCurrency}
                onValueChange={(currency) =>
                  dispatch(setFromCurrency(currency))
                }
              />
            </div>
            <button className="flex-shrink rounded-full border border-[#e6e6e6] w-9 h-9 mx-auto">
              <SwapHorizOutlinedIcon color="primary" />
            </button>
            <div className="flex-1 w-full">
              <label>To</label>
              <Dropdown
                currencies={currencies}
                selectedCurrency={toCurrency}
                onValueChange={(currency) => dispatch(setToCurrency(currency))}
              />
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
