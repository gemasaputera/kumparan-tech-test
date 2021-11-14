import React from "react";

function FormPost() {
  return (
    <div className="p-8">
      <form className="flex flex-col">
        <input type="text" placeholder="What's happening?" />
        <div className="flex justify-end">
          <button
            className="px-8 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPost;
