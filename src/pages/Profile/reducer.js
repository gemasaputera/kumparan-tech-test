const initialState = {
  dataAlbum: [],
  profile: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
