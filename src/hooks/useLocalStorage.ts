/**
 * only encrypted values will be stored in local storage
 * features
 * help components to display values from local storage
 * distribute keys according to their purposes
 */

import {
  KeyValueString,
  KeyString,
  LOCAL_STORAGE_NEW_ENTRY,
  LOCAL_STROAGE_KEY_CONTROL,
} from "../utils/constants";
import { rot13Dec, rot13Enc } from "../services/rot13";
import {
  getDataFromLocalStorage,
  sendDataToLocalStorage,
} from "../services/localStorage";

//key -> to get, to send
//value -> to send
function useLocalStorage() {
  //to send encrypt the value
  function writeToLocalStorage({ key, value }: KeyValueString) {
    const encryptedValue = rot13Enc(value);
    sendDataToLocalStorage({ key, value: encryptedValue });
  }

  //reads
  function readPureFromLocalStorage({ key }: KeyString) {
    const encryptedValue = getDataFromLocalStorage({ key });
    return encryptedValue;
  }

  //readds and decryppts
  function readFromLocalStorage({ key }: KeyString) {
    const encryptedValue = getDataFromLocalStorage({ key });
    const decryptedValue = rot13Dec(encryptedValue);
    return decryptedValue;
  }

  //used for text entry; takes previous local storage and adds current one.
  function updateLocalStorage({ key, value }: KeyValueString) {
    let storageData = getDataFromLocalStorage({ key });

    if (storageData === LOCAL_STROAGE_KEY_CONTROL) {
      storageData = LOCAL_STORAGE_NEW_ENTRY;
    }

    const encryptedValue = rot13Enc(value);
    const newStorage = storageData + encryptedValue + LOCAL_STORAGE_NEW_ENTRY;
    sendDataToLocalStorage({ key, value: newStorage });
  }

  return {
    writeToLocalStorage,
    readFromLocalStorage,
    updateLocalStorage,
    readPureFromLocalStorage,
  };
}

export { useLocalStorage };
