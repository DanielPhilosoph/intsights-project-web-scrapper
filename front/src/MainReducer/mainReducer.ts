import { isDataType, isString } from "../helper/functions";
import { UPDATE_DATA, RESET_DATA, CHANGE_SEARCH } from "../Types/actionConsts";
const initialize: InitialStateType = {
  data: [],
  search: "",
};

export default function mainReducer(
  state: StateType = initialize,
  action: ActionType
): StateType {
  switch (action.type) {
    case UPDATE_DATA:
      if (action.payload !== undefined) {
        return {
          ...state,
          data: isDataType(action.payload) ? action.payload : state.data,
        };
      } else {
        return state;
      }
    case RESET_DATA:
      return { data: [], search: "" };
    case CHANGE_SEARCH:
      return {
        ...state,
        search: isString(action.payload) ? action.payload : state.search,
      };
    default:
      return state;
  }
}
