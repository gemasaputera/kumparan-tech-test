const initialState = {
  dataUser: [],
  dataPost: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_HOME":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
