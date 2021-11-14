import React from "react";

function CommentInput({ id, type, placeholder }) {
  return (
    <>
      <form className="flex items-center">
        <input
          id={id}
          type={type}
          className="flex-1 shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-black rounded-lg px-4 py-2"
          style={{ minHeight: 32 }}
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="flex justify-center items-center h-8 w-12"
        >
          <img src="/icons/ic_send-right.svg" alt="send" />
        </button>
      </form>

      <div className="bg-gray-500 h-px my-4" />
    </>
  );
}

export default CommentInput;
