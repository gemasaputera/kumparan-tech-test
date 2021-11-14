import React from "react";

function MemberItem({ data, handleClick }) {
  return (
    <div
      key={data.id}
      className="bg-white cursor-pointer p-5 mb-2"
      onClick={() => handleClick(data)}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-bold hover:underline">{data.name}</span>{" "}
          <span>@{data.username}</span>
        </div>
        <div className="flex items-center">
          <button className="bg-gray-300 py-2 px-6 rounded-lg font-bold text-sm">
            View Profile
          </button>
        </div>
      </div>
      {data.title}
    </div>
  );
}

export default MemberItem;
