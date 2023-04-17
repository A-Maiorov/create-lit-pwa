import { createInterface } from "readline";
import { gray, green, reset, yellow } from "./colors.js";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (question, validationRegex, defaultResponse) => {
  return new Promise((resolve) => {
    readline.question(question, (userRes) => {
      if (defaultResponse && userRes === "") {
        resolve(defaultResponse);
        return;
      }
      if (!validationRegex) {
        resolve(userRes);
        return;
      }
      if (userRes.match(validationRegex)) {
        resolve(userRes);
        return;
      }
      readline.write(
        yellow +
          "Input does not match " +
          gray +
          validationRegex +
          yellow +
          " try again \n\r" +
          green
      );
      resolve(undefined);
    });
  });
};

export const endPrompt = () => {
  console.log(reset);
  readline.close();
};

export const ask = async (question, validationRegex, defaultResponse) => {
  let response = await readLineAsync(
    question,
    validationRegex,
    defaultResponse
  );

  if (validationRegex) {
    while (response === undefined) {
      response = await readLineAsync(
        question,
        validationRegex,
        defaultResponse
      );
    }
  }
  return response;
};
