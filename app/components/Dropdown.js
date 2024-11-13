import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setOpen] = useState();

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <label>To</label>
      <div
        className="border border-[#e6e6e6] rounded-[5px] p-1 w-full shadow-sm flex justify-between"
        onClick={toggleDropdown}
      >
        <span>val</span>
        <KeyboardArrowDownOutlinedIcon sx={{ color: "#6c6e77" }} />
      </div>
      {isOpen && (
        <ul className="absolute w-full bg-white border border-[#e6e6e6] border-t-0 rounded-[5px] p-1">
          <li>option</li>
          <li>option</li>
          <li>option</li>
          <li>option</li>
          <li>option</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
