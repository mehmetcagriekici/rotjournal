/**
 * componets' login and singup logic.
 * uses data from localStorage service (username and pin)
 */

import {
  LOCAL_STORAGE_PIN_KEY,
  LOCAL_STORAGE_USERNAME_KEY,
  PIN_CONTROL,
  UsernamePinString,
} from "../utils/constants";

import { useLocalStorage } from "./useLocalStorage";
import { getAuth, toggleAuth } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function useAuth() {
  const { writeToLocalStorage, readFromLocalStorage } = useLocalStorage();

  const dispatch = useDispatch();
  const auth = useSelector(getAuth);

  //for login, check if inputs matches the data coming from the local storage
  function checkLogin({ username, pin }: UsernamePinString): boolean | string {
    const controlUserName = readFromLocalStorage({
      key: LOCAL_STORAGE_USERNAME_KEY,
    });
    const controlPin = readFromLocalStorage({ key: LOCAL_STORAGE_PIN_KEY });

    //update auth state and return true
    if (username === controlUserName && pin === controlPin) {
      dispatch(toggleAuth(true));
      return true;
    }

    if (username !== controlUserName && pin === controlPin) {
      return "invalid username";
    }

    if (username === controlUserName && pin !== controlPin) {
      return "invalid pin";
    }

    if (username !== controlUserName && pin !== controlPin) {
      return "invalid username and pin";
    }

    return false;
  }

  //check pin only (does not affect authentication)
  function checkPin({ pin }: { pin: string }): boolean {
    const controlPin = readFromLocalStorage({ key: LOCAL_STORAGE_PIN_KEY });

    if (pin === controlPin) return true;
    return false;
  }

  //check username and pin (does not affect authentication)
  function checkPinAndUsername({ username, pin }: UsernamePinString): boolean {
    const controlUserName = readFromLocalStorage({
      key: LOCAL_STORAGE_USERNAME_KEY,
    });
    const controlPin = readFromLocalStorage({ key: LOCAL_STORAGE_PIN_KEY });

    if (username === controlUserName && pin === controlPin) return true;

    return false;
  }

  //for sign up, check if inputs are valid
  //valid pin : min 4, max 6, at least one special char, number and a capital letter
  //if all true save it to local storage

  function issueSignup({ username, pin }: UsernamePinString) {
    writeToLocalStorage({ key: LOCAL_STORAGE_USERNAME_KEY, value: username });

    if (pin.match(PIN_CONTROL))
      writeToLocalStorage({ key: LOCAL_STORAGE_PIN_KEY, value: pin });
    else
      throw new Error(
        "The pin must be between 4 and 6 characters long, must include at least one uppercase letter, one lowercase letter and a number."
      );

    //update auth state (after signup, ui auth state becomes true right away)
    dispatch(toggleAuth(true));
  }

  //logoout function
  //unauthorize user
  function logout() {
    dispatch(toggleAuth(false));
  }

  return {
    auth,
    checkLogin,
    issueSignup,
    logout,
    checkPin,
    checkPinAndUsername,
  };
}

export { useAuth };
