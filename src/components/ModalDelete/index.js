import React from "react";

function ModalDelete({ title, handleClose, data, handleSubmit }) {
  return (
    <div
      class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800"
      style={{ backgroundColor: "rgba(0,0,0,.7)", zIndex: "51" }}
    >
      <div class="bg-white rounded-lg w-3/4 md:w-2/5">
        <div class="flex flex-col items-start p-4">
          <div class="flex justify-between items-center w-full mb-8">
            <div class="text-gray-900 font-bold text-lg">{title}</div>
            <button onClick={handleClose}>
              <svg
                class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </button>
          </div>
          <hr />
          <p class="font-bold">{data.title}</p>
          <p class="text-gray-400">{data.body}</p>
          <hr />
          <div className="ml-auto">
            <button
              onClick={handleSubmit}
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Yes, Delete it!
            </button>
            <button
              onClick={handleClose}
              class="bg-transparent ml-4 hover:bg-gray-200 text-blue-700 font-semibold py-2 px-4 border border-blue-500  rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
