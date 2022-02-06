import axios from "axios";
import { Dispatch } from "redux";
import { UPDATE_DATA } from "../Types/actionConsts";
import Swal from "sweetalert2";

/**
 * @param {Dispatch<any>} dispatch
 * @param {string} word
 * @param {string} partOfSpeech
 ** Void function
 ** Sends API request for the search - updates state
 */
export async function updateData(dispatch: Dispatch<any>) {
  try {
    const response = await axios.get(`http://localhost:3004/strongerW2ise`);
    console.log(response.data.data);

    const action = {
      type: UPDATE_DATA,
      payload: response.data.data,
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
