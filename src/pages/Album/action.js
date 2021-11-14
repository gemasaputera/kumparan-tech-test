import fetch from "../../utils/axios";

export const fetchAlbums = (albumId) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    };
    dispatch({
      type: "STATE_ALBUM",
      payload: {
        loading: true,
      },
    });
    fetch(options)
      .then((res) => {
        dispatch({
          type: "STATE_ALBUM",
          payload: {
            dataPhoto: res.data,
            loading: false,
          },
        });
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch({
          type: "STATE_ALBUM",
          payload: {
            dataPhoto: [],
            loading: false,
          },
        });
      });
  };
};
