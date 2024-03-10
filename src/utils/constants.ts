export const ROT13_DEC_INPUT_ERR =
  "rot13 decryption conversion error, invalid input!";

export const ROT13_ENC_INPUT_ERR =
  "rot13 encryption conversion error, invalid input!";

export const LOCAL_STORAGE_USERNAME_KEY = "rot_journal_username";

export const LOCAL_STORAGE_PIN_KEY = "rot_journal_pin";

export const LOCAL_STORAGE_ENTRY_KEY = "rot_journal_entry";

export const LOCAL_STORAGE_NEW_ENTRY = "____";

export const LOCAL_STROAGE_KEY_CONTROL = "----";

export const ENTRY_STR_CONTROL = "_--_";

export const PIN_CONTROL =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,6}$/gm;

export const DEFAULT_LIST_MESSAGE = "You have not yet commited any entries...";

//TYPES
export interface KeyValueString {
  key: string;
  value: string;
}

export interface KeyString {
  key: string;
}

export interface UsernamePinString {
  username: string;
  pin: string;
}

export interface ValueBooleanState {
  value: boolean;
}
