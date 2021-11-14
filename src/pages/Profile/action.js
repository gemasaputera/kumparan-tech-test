import fetch from "../../utils/axios";

export const fetchUserAlbum = (userId) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    };
    dispatch({
      type: "STATE_PROFILE",
      payload: {
        loading: true,
      },
    });
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_PROFILE",
          payload: {
            dataAlbum: res.data,
            loading: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_PROFILE",
          payload: {
            dataAlbum: [],
            loading: false,
          },
        });
      });
  };
};

export const saveAlbum = (item) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_ALBUM",
      payload: {
        album: item,
      },
    });
  };
};
