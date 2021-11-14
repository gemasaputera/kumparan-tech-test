const initialState = {
  dataCollection: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_COLLECTION":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
