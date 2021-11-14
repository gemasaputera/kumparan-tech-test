const initialState = {
  saverity: "success",
  message: "Your message",
  toast: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_GLOBAL":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
