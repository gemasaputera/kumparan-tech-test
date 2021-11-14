const initialState = {
  dataPhoto: [],
  album: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_ALBUM":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
