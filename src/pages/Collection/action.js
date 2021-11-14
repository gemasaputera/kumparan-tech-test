import fetch from "../../utils/axios";

export const fetchCollection = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/albums`,
    };
    dispatch({
      type: "STATE_COLLECTION",
      payload: {
        loading: true,
      },
    });
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_COLLECTION",
          payload: {
            dataCollection: res.data,
            loading: false,
          },
        });
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch({
          type: "STATE_COLLECTION",
          payload: {
            dataCollection: [],
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
          type: "STATE_COLLECTION",
          payload: {
            dataUser: res.data,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "STATE_COLLECTION",
          payload: {
            dataUser: [],
          },
        });
      });
  };
};

export const saveAlbum = (data) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_ALBUM",
      payload: {
        album: data,
      },
    });
  };
};
