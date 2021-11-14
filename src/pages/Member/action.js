import fetch from "../../utils/axios";

export const fetchUsers = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    };
    dispatch({
      type: "STATE_MEMBER",
      payload: {
        loading: true,
      },
    });
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_MEMBER",
          payload: {
            dataUser: res.data,
            loading: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_MEMBER",
          payload: {
            dataUser: [],
            loading: false,
          },
        });
      });
  };
};

export const saveProfile = (item) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_PROFILE",
      payload: {
        profile: item,
      },
    });
  };
};
