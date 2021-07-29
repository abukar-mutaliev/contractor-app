const initialState = {
  items: [],
  loading: true,
  editing: false,
};

export default function reportsReducer(state = initialState, action) {
  switch (action.type) {
    case "reports/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "reports/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "reports/edit/pending":
      return {
        ...state,
        editing: true,
      };
    case "reports/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((report) => {
          if (report.id === action.payload.id) {
            return {
              ...report,
              ...action.payload.data,
            };
          }
          return report;
        }),
      };
    case "reports/delete/pending":
      return {
        ...state,
        deleting: true,
      };

    case "reports/delete/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((report) => report.id !== action.payload),
      };
    case "reports/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "reports/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}

export const loadReports = (id) => {
  return async (dispatch) => {
    dispatch({ type: "reports/load/pending" });
    const res = await fetch(`/api/object/${id}/report`);
    const json = await res.json();
    dispatch({ type: "reports/load/fulfilled", payload: json });
  };
};

export const editReport = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "reports/edit/pending" });

    await fetch(`/api/object/${id}/report`, {
      method: "PATCH",
      body: JSON.stringify({
          status: data.status,
          report: data.reportText
        }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    dispatch({ type: "reports/edit/fulfilled", payload: { id, data } });
    window.location.reload()
  };
};

export const removeReport = (id) => {
  return async (dispatch) => {
    dispatch({ type: "reports/delete/pending" });
    await fetch(`/api/object/${id}/report`, {
      method: "DELETE",
    });
    dispatch({ type: "reports/delete/fulfilled", payload: id });
  };
};

export const postReport = (id, report) => {
  return async (dispatch) => {
    dispatch({ type: "reports/post/pending" });
    const response = await fetch(`/api/object/${id}/report`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(report),
    });
    const json = await response.json();
    dispatch({
      type: "reports/post/fulfilled",
      payload: json,
    });
  };
};
