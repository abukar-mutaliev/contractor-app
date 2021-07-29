const initialState = {
  items: [],
  loading: false,
  deleting: false,
  filter: "",
};

export default function objectsReducer(state = initialState, action) {
  switch (action.type) {
    case "objects/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "objects/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "objects/delete/pending":
      return {
        ...state,
        deleting: true,
      };

    case "objects/delete/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((objects) => objects._id !== action.payload),
      };
    case "objects/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "objects/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case "objects/filter/fulfilled":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

export const loadObjects = () => {
  return async (dispatch) => {
    dispatch({ type: "objects/load/pending" });

    const res = await fetch("/api/home");
    const json = await res.json();

    dispatch({ type: "objects/load/fulfilled", payload: json });
  };
};

export const removeObject = (id) => {
  return async (dispatch) => {
    dispatch({ type: "objects/delete/pending" });
    await fetch(`/api/admin/object/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "objects/delete/fulfilled", payload: id });
  };
};

export const postObject = (data) => {

  return async (dispatch) => {
    dispatch({ type: "objects/post/pending" });
    const response = await fetch("/api/admin/object", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        objectName: data.name,
        objectAddress: data.address,
        objectDescription: data.description,
        pathToImage: data.image,
      }),
    });
    const json = await response.json();
    dispatch({
      type: "objects/post/fulfilled",
      payload: json,
    });
    window.location.reload()
  };
};

export const setFilterText = (text) => {
  return {
    type: "objects/filter/fulfilled",
    payload: text,
  };
};
