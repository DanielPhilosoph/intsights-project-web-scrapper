import { Dispatch } from "redux";
import { CHANGE_SEARCH, UPDATE_DATA } from "../Types/actionConsts";
import Swal from "sweetalert2";

/**
 * @param {Dispatch<any>} dispatch
 * @param {string} word
 * @param {string} partOfSpeech
 ** Void function
 ** Sends API request for the search - updates state
 */
export async function updateData(
  dispatch: Dispatch<any>,
  data: [StrongW2iseType]
) {
  try {
    const action = {
      type: UPDATE_DATA,
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: `Error: ${error}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

export function updateSearch(dispatch: Dispatch<any>, searchString: string) {
  const action = {
    type: CHANGE_SEARCH,
    payload: searchString,
  };
  dispatch(action);
}
