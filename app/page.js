"use client";

import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import Dropdown from "./components/Dropdown";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies, exchangeCurrency } from "./slices/currencySlice";
import {
  setFromCurrency,
  setToCurrency,
  setPending,
} from "./slices/currencySlice";
import debounce from "lodash/debounce";

const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const options = {
  method: "GET",
};

export default function Home() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1.0);

  const { currencies, pending, fromCurrency, toCurrency, exchangeRates } =
    useSelector((state) => state.currency);

  //  fetch currencies
  
  useEffect(() => {
    dispatch(fetchCurrencies({ url, options }));
  }, [dispatch]);

  //  filter from currencies

  const fromCurrencies = useMemo(() => {
    return Object.keys(currencies).map((currency) => {
      return {
        currency,
        disabled: currency === toCurrency ? true : false,
      };
    });
  }, [currencies, toCurrency]);

  //  filter to currencies

  const toCurrencies = useMemo(() => {
    return Object.keys(currencies).map((currency) => {
      return {
        currency,
        disabled: currency === fromCurrency ? true : false,
      };
    });
  }, [currencies, fromCurrency]);

  //  reset values

  const reset = () => {
    dispatch(setToCurrency(null));
    dispatch(setFromCurrency(null));
    setAmount(1);
  };

  //  swap values

  const swap = () => {
    dispatch(setFromCurrency(toCurrency));
    dispatch(setToCurrency(fromCurrency));
  };

  //  exchange with debounce

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const dispatchExchangeRate = () => {
    if (
      fromCurrency &&
      toCurrency &&
      amount &&
      Number(amount) > 0
    ) {
      dispatch(
        exchangeCurrency(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`,
          options
        )
      );
    }
  };

  const debouncedExchangeRate = debounce(dispatchExchangeRate, 2000);

  useEffect(() => {
    if (
      fromCurrency &&
      toCurrency &&
      amount &&
      Number(amount) > 0
    ) {
      dispatchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (
      fromCurrency &&
      toCurrency &&
      amount &&
      Number(amount) > 0
    ) {
      dispatch(setPending(true));
      debouncedExchangeRate();
    }
    return () => {      
      debouncedExchangeRate.cancel();
    };
  }, [amount]);

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
                value={amount}
                onChange={handleChangeAmount}
              />
            </div>
            <div className="flex-1 w-full">
              <label>From</label>
              <Dropdown
                currencies={fromCurrencies}
                selectedCurrency={fromCurrency}
                onValueChange={(currency) =>
                  dispatch(setFromCurrency(currency))
                }
              />
            </div>
            <button
              className="flex-shrink rounded-full border border-[#e6e6e6] w-9 h-9 mx-auto"
              onClick={swap}
            >
              <SwapHorizOutlinedIcon color="primary" />
            </button>
            <div className="flex-1 w-full">
              <label>To</label>
              <Dropdown
                currencies={toCurrencies}
                selectedCurrency={toCurrency}
                onValueChange={(currency) => dispatch(setToCurrency(currency))}
              />
            </div>
          </div>
          {fromCurrency && toCurrency && amount && (
            <>
              <button
                className=" w-100 bg-[#38609b] text-white mt-5 px-10 py-1 rounded-full"
                onClick={reset}
              >
                Reset
              </button>
              <div className="mt-5 flex justify-start md:justify-center gap-2  items-center text-[#40618a] font-bold">
                {exchangeRates[fromCurrency] && !pending && (
                  <>
                    <span className="text-2xl">
                      {parseFloat(
                        amount * exchangeRates[fromCurrency][toCurrency]
                      ).toFixed(2)}
                    </span>
                    <span className="text-xs text-black">
                      {" "}
                      {toCurrency?.toUpperCase()}
                    </span>
                  </>
                )}
              </div>
            </>
          )}
          {pending && (
            <div className=" mx-auto w-9 h-9 border-4 border-t-[#40618a] rounded-full animate-spin mt-5 "></div>
          )}
        </div>
      </div>
    </div>
  );
}
