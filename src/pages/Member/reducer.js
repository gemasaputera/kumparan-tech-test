const initialState = {
  dataUser: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_MEMBER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
