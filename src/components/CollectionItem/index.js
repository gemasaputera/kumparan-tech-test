import React from "react";

function CollectionItem({ data, handleClick }) {
  return (
    <div className="cursor-pointer" onClick={() => handleClick(data)}>
      <div
        className="bg-white hover:bg-gray-100 flex flex-col border p-5 mb-1"
        style={{ height: 205 }}
      >
        <div className="flex justify-center items-center flex-1 ">
          <span className="font-bold text-2xl text-center">{data.title}</span>
        </div>
        <div>
          <span className="font-bold mr-2 text-sm hover:underline">
            {data.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CollectionItem;
