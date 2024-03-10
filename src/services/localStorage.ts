// !!!! Each key must start with "rot_journal_"

//use keys to get values from local storage
//send keys and values to local storage

//every value belongs to this app in local storage is encrypted

import {
  KeyValueString,
  KeyString,
  LOCAL_STROAGE_KEY_CONTROL,
} from "../utils/constants";

//authorization services :::::::::
function getDataFromLocalStorage({ key }: KeyString): string {
  const data = localStorage.getItem(key);
  if (data) return data;
  else return LOCAL_STROAGE_KEY_CONTROL;
}

function sendDataToLocalStorage({ key, value }: KeyValueString): void {
  localStorage.setItem(key, value);
}

//form services

export { getDataFromLocalStorage, sendDataToLocalStorage };
