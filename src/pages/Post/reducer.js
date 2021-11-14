const initialState = {
  data: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_POST":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
