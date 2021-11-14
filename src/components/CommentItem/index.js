import React from "react";

function CommentItem({ data }) {
  return (
    <div className="mb-2">
      <div>
        <span className="font-bold text-sm">{data.name}</span>
      </div>
      <p className="text-lg">{data.body}</p>
      <div className="h-px w-full bg-gray-500" />
    </div>
  );
}

export default CommentItem;
