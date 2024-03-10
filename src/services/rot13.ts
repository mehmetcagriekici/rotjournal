import { ROT13_DEC_INPUT_ERR, ROT13_ENC_INPUT_ERR } from "../utils/constants";

//main algorithm

/**
 * Encryption
 * takes string as the input
 * replace each letter with the 13th letter after it in the ascii chart
 * replace each letter with their indexes (positions at the ascii chart) (numbers) (1, 2, 3, ... 10, 11, ... 26)
 * convert each number to binary (convertBase function)
 * return the new string
 *
 * Decryption
 * takes string as the input
 * convert back to indexes then to letters
 * replace each letter with the 13th letter earlier it
 * return decrypted text
 *
 * Conversion
 * 8 bits
 */

//(max possible value) 139
//(min possible value) 32

function convertBase(input: string[]): string[] | [false] {
  //store
  const result = [];

  if (input.length === 0) throw new Error("No Input!");

  //dec to bin, input[0].length === 8
  if (input[0].length === 8) {
    // example input : ["0000000","1010101",...]
    //loop over the input
    for (let i = 0; i < input.length; i++) {
      let sum = 0;

      if (input[i].length !== 8) throw new Error(ROT13_DEC_INPUT_ERR);

      for (let j = 0; j < input[i].length; j++) {
        if (Number(input[i][j]) > 1 || Number(input[i][j]) < 0)
          throw new Error(ROT13_DEC_INPUT_ERR);

        // 0 1 2 3 4 5 6 7
        // 7 6 5 4 3 2 1 0
        sum += 2 ** (7 - j) * Number(input[i][j]);
      }
      result.push(`${sum}`);
    }
  } else {
    //example input ["0","5","12",...]
    //bin to dec, else
    for (let i = 0; i < input.length; i++) {
      const tempStore = [];
      const num = Number(input[i]);
      //Max value 139 ignore new lines
      if ((num !== 10 && num < 32) || num > 139)
        throw new Error(ROT13_ENC_INPUT_ERR);

      // divide by 2, save the reminder, fill until length is 8, reverse
      let check = num;
      for (let control = num; control > 0; control = Math.floor(control / 2)) {
        if (control % 2 === 0) tempStore.push("0");
        else tempStore.push("1");

        check = check / 2;
      }

      //each binary number must be of 8 length, max possible number is 139 -> 8 length
      for (let len = tempStore.length; len < 8; len++) tempStore.push("0");

      tempStore.reverse();
      result.push(tempStore.join(""));
    }
  }

  return result;
}

function rot13Enc(input: string): string {
  const rotArray = [];
  //loop over the string, get ascii code for each char (including special characters)
  for (let c = 0; c < input.length; c++) {
    const charCode = input.charCodeAt(c);

    //codes make sense in a text
    if (charCode < 127 && charCode > 31) {
      //ROT 13 calculation
      if (charCode + 13 < 127) rotArray.push(String(charCode + 13));
      //example : for code 119 -> rot(code 119) = 132, go back to start(32) count the rest. For code 119 rot(119) = 37
      else rotArray.push(String(charCode + 13 - 127 + 32));
    } else if (charCode === 10) {
      //for new line
      rotArray.push(String(charCode));
    } else throw new Error(ROT13_ENC_INPUT_ERR);
  }

  //if no rotArray return "error"
  if (rotArray.length === 0) throw new Error("No data reached encryption!");
  //convert rotted codes to binary
  const binaryArray = convertBase(rotArray);

  return binaryArray.join("");
}

function rot13Dec(input: string): string {
  //each char is encrypted as a 8 length binary string
  const binaryArray = [];
  //loop over the string, create a new array, each element is a 8 length string
  for (let i = 0; i < input.length; i += 8)
    binaryArray.push(input.slice(i, i + 8));

  //if no binary array
  if (binaryArray.length === 0) throw new Error("No such data exists!");
  //convert back to decimal
  const decimalArray = convertBase(binaryArray);

  let decryptedString = "";
  //loop over decimal array, reverse rot13, numbers coming from the same logic above
  for (let i = 0; i < decimalArray.length; i++) {
    if (Number(decimalArray[i]) === 10)
      decryptedString += String.fromCharCode(Number(decimalArray[i]));
    else if (Number(decimalArray[i]) - 13 < 32)
      decryptedString += String.fromCharCode(
        Number(decimalArray[i]) - 13 + 127 - 32
      );
    else decryptedString += String.fromCharCode(Number(decimalArray[i]) - 13);
  }

  return decryptedString;
}

export { rot13Enc, rot13Dec };
