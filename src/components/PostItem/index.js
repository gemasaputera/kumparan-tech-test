import React from "react";

function PostItem({ data, handleClick }) {
  return (
    <div
      key={data.postId}
      className="cursor-pointer"
      onClick={() => handleClick(data)}
    >
      <div className="bg-white hover:bg-gray-100 border p-5 mb-1">
        <div>
          <span className="font-bold mr-2 text-sm hover:underline">
            {data.name}
          </span>
          <span className="text-sm">@{data.username}</span>
        </div>
        {data.title}
      </div>
    </div>
  );
}

export default PostItem;
