import React from "react";
import { useNavigate } from "react-router-dom";

function NavigationArrow({ title }) {
  const navigate = useNavigate();

  return (
    <div
      className="fixed flex items-center filter drop-shadow bg-white w-full p-5 border-b inset-0 z-50"
      style={{ height: 55 }}
    >
      <div
        className="cursor-pointer rounded-full bg-white hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <img src="/icons/ic_arrow-left.svg" alt="Left arrow" />
      </div>
      <span className="font-bold ml-6">{title}</span>
    </div>
  );
}

export default NavigationArrow;
