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

export const sendPost = (data, oldData) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data,
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch({
      type: "STATE_HOME",
      payload: {
        loadingPost: true,
      },
    });
    fetch(options)
      .then((res) => {
        console.log(`res`, res);
        dispatch({
          type: "STATE_HOME",
          payload: {
            dataPost: [{ ...data, name: "test", username: "test" }, ...oldData],
            loadingPost: false,
          },
        });
        dispatch({
          type: "STATE_GLOBAL",
          payload: {
            message: "Post have been share! ;)",
            saverity: "success",
            toast: true,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_HOME",
          payload: {
            loadingPost: false,
          },
        });
        dispatch({
          type: "STATE_GLOBAL",
          payload: {
            message: "Failed to send post :(",
            saverity: "error",
            toast: true,
          },
        });
      });
  };
};

export const sendComment = (data, oldData) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/comments",
      data,
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch({
      type: "STATE_POST",
      payload: {
        loading: true,
      },
    });
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_POST",
          payload: {
            dataComment: [...oldData, { name: "test comment", ...data }],
            loading: false,
          },
        });
        dispatch({
          type: "STATE_GLOBAL",
          payload: {
            message: "Comment have been send ;)",
            saverity: "success",
            toast: true,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_POST",
          payload: {
            loading: false,
          },
        });
        dispatch({
          type: "STATE_GLOBAL",
          payload: {
            message: "Failed to send comment :(",
            saverity: "error",
            toast: true,
          },
        });
      });
  };
};
