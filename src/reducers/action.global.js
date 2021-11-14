export const toast = (data) => {
  return (dispatch) => {
    dispatch({
      type: "STATE_GLOBAL",
      payload: {
        saverity: data.saverity,
        message: data.message,
        toast: data.toast,
      },
    });
  };
};
