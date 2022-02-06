import { UPDATE_DATA, RESET_DATA } from "../Types/actionConsts";
const initialize: InitialStateType = {
  data: [],
};

export default function mainReducer(
  state: StateType = initialize,
  action: ActionType
): StateType {
  switch (action.type) {
    case UPDATE_DATA:
      if (action.payload !== undefined) {
        return {
          data: action.payload,
        };
      } else {
        return state;
      }
    case RESET_DATA:
      return { data: [] };
    default:
      return state;
  }
}
