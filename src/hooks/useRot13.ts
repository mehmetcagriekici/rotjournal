/**
 * use this hook to decrypt or encrypt text from components
 * bridge between backgorund logic and display
 */

import { rot13Dec, rot13Enc } from "../services/rot13";

function useRot13() {
  //encrypt data
  function encryption({ data }: { data: string }) {
    return rot13Enc(data);
  }

  //decrypt data
  function decryption({ data }: { data: string }) {
    return rot13Dec(data);
  }
  return { encryption, decryption };
}

export { useRot13 };
