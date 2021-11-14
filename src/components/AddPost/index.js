import React from "react";

function AddPost({ handleClick }) {
  return (
    <div
      className="fixed z-40 filter drop-shadow"
      style={{ bottom: "70px", right: "16px" }}
    >
      <div
        onClick={handleClick}
        className="bg-white cursor-pointer hover:bg-gray-100 flex justify-center items-center rounded-full w-16 h-16"
      >
        <img src="/icons/ic_plus.svg" alt="add" />
      </div>
    </div>
  );
}

export default AddPost;
