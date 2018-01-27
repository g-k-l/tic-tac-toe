
export function calculateWinner(squares) {
    /*
        Returns either "X" or "O" if there is a winner.
        If there's no winner, return null.
    */
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i=0; i< lines.length; i++) {
        if (squares.some((x) => {x === null})) {
            continue
        }

        const [a, b, c] = lines[i];
        const arr = [squares[a], squares[b], squares[c]]

        if (allEqual(arr)) {
            return squares[a]
        }    
    }

    return null
}

function allEqual(array) {
    /*
        Checks all elements are equal in array.
    */
    if (array.length === 0) {
        return true
    }
    for (let i=0; i<array.length-1; i++) {
        if (array[i] != array[i+1]) {
            return false
        }
    }
    return true
}

