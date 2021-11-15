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

export const deletePost = (dataDetail) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      url: `https://jsonplaceholder.typicode.com/posts/${dataDetail.postId}`,
      data: dataDetail,
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
            data: null,
            loading: false,
          },
        });
        dispatch({
          type: "STATE_GLOBAL",
          payload: {
            message: "Your post have been deleted! ;)",
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
            message: "Failed to delete ur post :(",
            saverity: "error",
            toast: true,
          },
        });
      });
  };
};

export const deleteComment = (commentDetail, listComment) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_POST",
      payload: {
        loading: true,
      },
    });
    setTimeout(() => {
      const filtered = listComment.filter((el) => el.id !== commentDetail.id);
      dispatch({
        type: "STATE_POST",
        payload: {
          dataComment: filtered,
          loading: false,
        },
      });
      dispatch({
        type: "STATE_GLOBAL",
        payload: {
          message: "Your comment have been deleted! ;)",
          saverity: "success",
          toast: true,
        },
      });
    }, 1000);
  };
};

export const editComment = (comment, id, listComment) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_POST",
      payload: {
        loading: true,
      },
    });
    setTimeout(() => {
      const data = [];
      listComment.map((el) => {
        if (el.id === id) {
          el.body = comment;
        }
        return data.push({ ...el });
      });

      dispatch({
        type: "STATE_POST",
        payload: {
          dataComment: data,
          loading: false,
        },
      });
      dispatch({
        type: "STATE_GLOBAL",
        payload: {
          message: "Your comment have been edited! ;)",
          saverity: "success",
          toast: true,
        },
      });
    }, 1000);
  };
};
