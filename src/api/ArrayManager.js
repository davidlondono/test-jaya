// functions to sort
// better performance than sort and reverse (but not a big change)
const sortAscend = (a, b) => (a - b);
const sortDecend = (a, b) => (b - a);

// sort ascending or descending the arrays
const ascend = arrays => arrays.map(arr => [...arr].sort(sortAscend));
const decend = arrays => arrays.map(arr => [...arr].sort(sortDecend));

// sort mixed
const mixed = arrays => arrays.map((arr, index) => {
  // when isOdd the sorting is descending
  const isOdd = (index % 2) === 1;
  if (isOdd) {
    return [...arr].sort(sortDecend);
  }
  return [...arr].sort(sortAscend);
});

module.exports = {
  ascend,
  decend,
  mixed,
};
