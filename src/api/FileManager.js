const fs = require('fs');

// tokens for separation and join
const tokens = {
  arraysSeparator: '\n',
  valueSeparator: ',',
};

// --------READ FILE ---------------
// ---------------------------------
// open file and read as string
const openFileString = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(data.toString());
  });
});

// use the string of the file and parse to array
const stringToArray = (str) => {
  // each array begins with '[' and ends with '];'
  // match eatch group of array
  const groups = str.match(/\[(.*?)\];/g);
  return groups
    .map(s => s
      // slice the tokens of beggining and ending
      .slice(1, -2)
      .split(',')
      // parse eatch number string to number
      .map((num) => {
        const number = Number.parseInt(num, 10);
        if (Number.isNaN(number)) {
          throw new Error(`element ${num} is not a number`);
        }
        return number;
      }));
};

// join open the file and parse the data
const fileToArray = async path => openFileString(path)
  .then(stringToArray);

// -------WRITE FILE ---------------
// ---------------------------------

// become the array sorted to a string
const arrayToString = array => array
  // build line with beggining and ending tokens
  .map(arr => `[${arr.join(tokens.valueSeparator)}];`)
  // add new line
  .join(tokens.arraysSeparator);

// write string to file
const writeStringToFile = (str, path) => new Promise((resolve, reject) => {
  fs.writeFile(path, str, (err) => {
    if (err) {
      return reject(err);
    }
    return resolve();
  });
});

// join array to string and string to file
const arrayToFile = async (array, path) => {
  const str = arrayToString(array);
  return writeStringToFile(str, path);
};

module.exports = {
  fileToArray,
  arrayToFile,
};
