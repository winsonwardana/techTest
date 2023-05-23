const defaultValue = { contact: [], contactDetail: {} };
export default function contactReducer(state = defaultValue, action) {
  if (action.type === "contact/fetchSuccess") {
    return {
      ...state,
      contact: action.payload,
    };
  } else if (action.type === "contact/fetchContactSuccess") {
    return {
      ...state,
      contactDetail: action.payload,
    };
  } else {
    return state;
  }
}
