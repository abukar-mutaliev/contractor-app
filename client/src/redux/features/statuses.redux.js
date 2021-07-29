const initialState = {
  items: [],
  loading: false,
};

export default function statusesReducer(state = initialState, action) {
  switch (action.type) {
    case "statuses/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "statuses/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "statuses/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "statuses/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}

export const loadStatuses = () => {
  return async (dispatch) => {
    dispatch({ type: "statuses/load/pending" });

    const res = await fetch("/api/statuses");
    const json = await res.json();

    dispatch({ type: "statuses/load/fulfilled", payload: json });
  };
};
export const postStatus = ( data ) => {
  return async (dispatch) => {
    dispatch({ type: "statuses/post/pending" });
    const response = await fetch(`/api/admin/status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status: data.titleText,
        color: data.statColor
      }),
    });
    const json = await response.json();
    dispatch({
      type: "statuses/post/fulfilled",
      payload: json,
    });
    window.location.reload()
  };
};

