import React from "react";

function PhotoItem({ data, handleClick }) {
  return (
    <div
      key={data.id}
      className="cursor-pointer opacity-80 hover:opacity-100"
      onClick={() => handleClick(data)}
    >
      <img className="w-full" src={data.thumbnailUrl} alt={data.thumbnailUrl} />
    </div>
  );
}

export default PhotoItem;
