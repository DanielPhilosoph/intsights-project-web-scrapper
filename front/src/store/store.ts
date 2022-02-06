import mainReducer from "../MainReducer/mainReducer";
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

const store: Store<StateType, ActionType> & {
  dispatch: DispatchType;
} = createStore(mainReducer, applyMiddleware(thunk));

export default store;
