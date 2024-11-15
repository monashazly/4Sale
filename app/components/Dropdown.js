import React from 'react';
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useRef, useState } from "react";

const Dropdown = ({ currencies, selectedCurrency, onValueChange }) => {

  const [isOpen, setOpen] = useState();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };
  const closeDropDown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target))
      setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropDown);
    return () => document.removeEventListener("mousedown", closeDropDown);
  }, []);

  //   update the value

  const handleChangeValue = (currency) => {
    setOpen(false);
    onValueChange(currency);
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className=" text-black border border-[#e6e6e6] rounded-[5px] p-1 w-full shadow-sm flex justify-between hover:cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{selectedCurrency ? selectedCurrency : "Currency"}</span>
        <KeyboardArrowDownOutlinedIcon sx={{ color: "#6c6e77" }} />
      </div>
      {isOpen && (
        <ul className="absolute w-full bg-white border border-[#e6e6e6] border-t-0 rounded-[5px] max-h-36 overflow-scroll z-50">
          {currencies.map((currency) => (
            <li key={currency.currency}>
              <button
                className={`w-full text-start h-full p-2 hover:bg-[#f4f5f6] ${
                  currency.disabled ? "text-zinc-300" : "text-black"
                }`}
                onClick={() => handleChangeValue(currency.currency)}
                disabled={currency.disabled}
              >
                {currency.currency}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
