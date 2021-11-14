import React from "react";
import { Link, useLocation } from "react-router-dom";
import menuItem from "../json/MenuItem.json";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../reducers/action.global";
import ToastNotification from "../components/ToastNotification";

const mapStateToProps = (state) => ({ ...state.global });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Layouts({ children, toast }) {
  const location = useLocation();
  const Navigation = () => {
    return (
      <div
        className="bg-white filter drop-shadow py-2 w-full border-t flex flex-row bottom-0 fixed justify-around"
        style={{ height: 60 }}
      >
        {menuItem.map((item, i) => {
          return (
            <Link to={item.url} key={i}>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img
                    className={
                      location.pathname === item.url ? `` : "opacity-50"
                    }
                    src={item.icon}
                    alt={item.name}
                  />
                </div>
                <span
                  className={`uppercase text-xs md:text-lg font-bold ${
                    location.pathname === item.url
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
  return (
    <div className="h-screen relative">
      {toast && <ToastNotification />}
      <main className="p-0 md:p-5">{children}</main>
      <Navigation />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);
