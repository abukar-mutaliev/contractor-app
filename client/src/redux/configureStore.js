import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import objectsReducer from "./features/objects.redux";
import reportsReducer from "./features/reports.redux";
import statusesReducer from "./features/statuses.redux";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    objects: objectsReducer,
    reports: reportsReducer,
    statuses: statusesReducer,
  }),
  applyMiddleware(thunk, logger)
);
