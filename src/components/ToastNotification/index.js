import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../reducers/action.global";

const mapStateToProps = (state) => ({ ...state.global });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function ToastNotification({ actions, toast, saverity, message }) {
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        actions.toast({ toast: false });
      }, 2000);
    }
    return () => {
      clearTimeout();
    };
  }, [toast]);

  if (saverity === "error") {
    return (
      <div
        class="fixed inset-x-px top-10 flex items-center text-white max-w-sm w-full bg-red-400 shadow-md rounded-lg overflow-hidden mx-auto"
        style={{ zIndex: "101" }}
      >
        <div class="w-10 border-r px-2">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
        </div>

        <div class="flex items-center px-2 py-3">
          <div class="mx-3">
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      class="fixed inset-x-px top-10 flex items-center text-white max-w-sm w-full bg-green-400 shadow-md rounded-lg overflow-hidden mx-auto"
      style={{ zIndex: "101" }}
    >
      <div class="w-10 border-r px-2">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          ></path>
        </svg>
      </div>

      <div class="flex items-center px-2 py-3">
        <div class="mx-3">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotification);
