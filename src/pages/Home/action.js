import fetch from "../../utils/axios";

export const fetchPosts = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    };
    dispatch({
      type: "STATE_HOME",
      payload: {
        loading: true,
      },
    });
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_HOME",
          payload: {
            dataPost: res.data,
            loading: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_HOME",
          payload: {
            dataPost: [],
            loading: false,
          },
        });
      });
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    };
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_HOME",
          payload: {
            dataUser: res.data,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_HOME",
          payload: {
            dataUser: [],
          },
        });
      });
  };
};

export const saveDetailPost = (item) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_POST",
      payload: {
        data: item,
      },
    });
  };
};
