import fetch from "../../utils/axios";

export const fetchComments = (params) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/comments",
      params,
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
            dataComment: res.data,
            loading: false,
          },
        });
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch({
          type: "STATE_POST",
          payload: {
            dataComment: [],
            loading: false,
          },
        });
      });
  };
};
