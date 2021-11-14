import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import MemberItem from "../../components/MemberItem";

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
            <MemberItem key={user.id} data={user} handleClick={handleClick} />
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
