function rootReducer(state, action) {
  switch (action.type) {
    case "SET":
      return { user: action.payload };

    default:
      return state;
  }
}
export default rootReducer;
