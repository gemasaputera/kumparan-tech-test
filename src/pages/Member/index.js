import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";

const mapStateToProps = (state) => ({ ...state.member });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Member({ actions, dataUser, loading }) {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    actions.fetchUsers();
  }, []);

  useEffect(() => {
    if (dataUser) {
      setUsers(dataUser);
    }
  }, [dataUser]);

  const handleClick = (profile) => {
    actions.saveProfile(profile);
    navigate(`/profile/${profile.id}`);
  };

  const ListUser = () => {
    if (loading) {
      return "Loading...";
    }

    if (users.length === 0) {
      return "No user";
    }
    return (
      <section>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="bg-white cursor-pointer p-5 mb-2"
              onClick={() => handleClick(user)}
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-bold hover:underline">{user.name}</span>{" "}
                  <span>@{user.username}</span>
                </div>
                <div className="flex items-center">
                  <button className="bg-gray-300 py-2 px-6 rounded-lg font-bold text-sm">
                    View Profile
                  </button>
                </div>
              </div>
              {user.title}
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <div>
      <ListUser />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);
