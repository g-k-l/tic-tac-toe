export function calculateWinner(squares) {
  /*
        Returns either "X" or "O" if there is a winner.
        If there's no winner, return null.
    */
  const winning_rows = getRows(squares.length),
    winning_cols = getCols(squares.length),
    winning_diags = getDiagonals(squares.length);

  const lines = winning_rows.concat(winning_cols.concat(winning_diags));

  for (let i = 0; i < lines.length; i++) {
    var arr = lines[i].map(x => squares[x]);
    if (
      arr.some(x => {
        return x === null;
      })
    ) {
      continue;
    }

    if (allEqual(arr)) {
      return arr[0];
    }
  }

  return null;
}

function getRows(size) {
  const sideLength = Math.sqrt(size);
  var rows = Array(sideLength)
    .fill()
    .map(() => []);

  for (let i = 0; i < size; i++) {
    var rowIdx = Math.floor(i / sideLength);
    rows[rowIdx].push(i);
  }
  return rows;
}

function getCols(size) {
  const sideLength = Math.sqrt(size);
  var cols = Array(sideLength)
    .fill()
    .map(() => []);

  for (let i = 0; i < size; i++) {
    var colIdx = i % sideLength;
    cols[colIdx].push(i);
  }
  return cols;
}

function getDiagonals(size) {
  const sideLength = Math.sqrt(size);
  var diags = Array(2)
    .fill()
    .map(() => []);
  for (let i = 0; i < size; i++) {
    if (i % (sideLength + 1) === 0) {
      diags[0].push(i);
    }
  }
  for (let i = sideLength - 1; i < size - 1; i++) {
    if (i % (sideLength - 1) === 0) {
      diags[1].push(i);
    }
  }
  return diags;
}

function allEqual(array) {
  /*
        Checks all elements are equal in array.
    */
  if (array.length === 0) {
    return true;
  }
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] !== array[i + 1]) {
      return false;
    }
  }
  return true;
}

export function range(n) {
  /*
        Akin to Python's range(n)
    */
  return [...Array(n).keys()];
}
