let grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let priority = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]


//gets the sum of certain combinations of the grid 
//r= row, c= column, d,x=1 = main diagonal and d,x=2 = secondary diagonal
function getSum(formType, x) {
    if (formType == 'r') {
        return grid[x][0] + grid[x][1] + grid[x][2];
    }
    else if (formType == 'c') {
        return grid[0][x] + grid[1][x] + grid[2][x];
    }
    else if (formType == 'd' && x == 1) {
        return grid[0][0] + grid[1][1] + grid[2][2];
    }
    else if (formType == 'd' && x == 2) {
        return grid[2][0] + grid[1][1] + grid[0][2];
    }
}

function convert2Dto1DCoords(x, y) {
    return 3 * x + y + 1
}

//sets the priority of each cell  
//if filling up a cell can let the CPU win, that cell gets the highest priority
// that is, if the sum of 2 cell of a column, row or diagonal is 10, putting a 5 accordingly willlet the cpu win
function prioritize() {
    let diagonalPriority = 0, diagonal2Priority = 0, rowPriority = 0, colPriority = 0
    let priority = 0;
    for (let n = 0; n < 3; n++) {
        for (let k = 0; k < 3; k++) {
            if (grid[n][k] != 0) {
                priority[n][k] = 0;
            }
            else {
                priority = 0;
                diagonalPriority = diagonal2Priority = rowPriority = colPriority = 0;
                if (n == k) { // main diagonal
                    priority = getSum('d', 1)
                    if (priority == 10) {
                        priority = 3;
                    }
                    else if (priority == 2) {
                        priority = 2;
                    }
                    else {
                        priority = 1;
                    }
                    diagonalPriority = priority;
                    priority = 0;
                }
                else if (n + k == 2) { //secondary diagonal
                    priority = grid[0][2] + grid[1][1] + grid[2][0];
                    if (priority == 10) {
                        priority = 3;
                    }
                    else if (priority == 2) {
                        priority = 2;
                    }
                    else {
                        priority = 1;
                    }
                    diagonal2Priority = priority;
                    priority = 0;
                }
                priority = grid[0][k] + grid[1][k] + grid[2][k];
                if (priority == 10) {
                    priority = 3;
                }
                else if (priority == 2) {
                    priority = 2;
                }
                else {
                    priority = 1;
                }
                rowPriority = priority;
                priority = 0;

                priority = grid[n][0] + grid[n][1] + grid[n][2]
                if (priority == 10) {
                    priority = 3;
                }
                else if (priority == 2) {
                    priority = 2;
                }
                else {
                    priority = 1;
                }
                colPriority = priority;
                priority = 0;
                priority[n][k] = Math.max(diagonalPriority, diagonal2Priority, rowPriority, colPriority);
            }
        }

    }
}





function computerInput() {
    prioritize();
    let maximumPriorityValue = Math.max(Math.max(...priority[0]), Math.max(...priority[1]), Math.max(...priority[2]));
    //gets the maximum possible priority
    let maxPriorityCellCount = 0;
    let prioritizedIndices = [] //gets the cells with the highest priority
    for (let n = 0; n < 3; n++) {
        for (let k = 0; k < 3; k++) {
            if (priority[n][k] == maximumPriorityValue && maximumPriorityValue != 0) {
                maxPriorityCellCount++;
                prioritizedIndices.push([n, k])
            }
        }
    }

    if (maximumPriorityValue) {
        //chooses a random cell among the candidate cells
        let randomPriorityIndex = Math.floor(Math.random() * maxPriorityCellCount);
        let [x, y] = prioritizedIndices[randomPriorityIndex]
        grid[x][y] = 5;
        document.getElementById(convert2Dto1DCoords(x, y)).innerHTML = "O";
    }

    else {
        //if the maximum possible priority is 0, that means, the CPU can not place input. hence, the match is draw
        alert("draw")
    }
}


function getResult() {
    //checks if either row or column or diagonal or secondary diagonal contains all x-s or o-s

    if (getSum('r', 0) == 3 || getSum('r', 1) == 3 || getSum('r', 2) == 3) {
        return 1;
    }
    else if (getSum('c', 0) == 3 || getSum('c', 1) == 3 || getSum('c', 2) == 3) {
        return 1;
    }
    else if (getSum('d', 1) == 3 || getSum('d', 2) == 3) {
        return 1;
    }
    else if (getSum('r', 0) == 15 || getSum('r', 1) == 15 || getSum('r', 2) == 15) {
        return 2;
    }
    else if (getSum('c', 0) == 15 || getSum('c', 1) == 15 || getSum('c', 2) == 15) {
        return 2;
    }
    else if (getSum('d', 1) == 15 || getSum('d', 2) == 15) {
        return 2;
    }
    else {
        //if any cell is blank, the game will continue
        for (let n = 0; n < 3; n++) {
            for (let k = 0; n < 3; k++) {
                if (!grid[n][k]) {
                    return 0
                }
            }
        }
        return 3
    }
}


function userInput(x, y) {
    //gets called when the user cicks on the cell (x,y)
    //user inut is denoted by 1 and computerInput is denoted by 5
    let linearCoordinate = convert2Dto1DCoords(x, y);
    document.getElementById(linearCoordinate).innerHTML = 'X';

    grid[x][y] = 1;
    if (getResult() == 1) {
        window.alert("player won!");
        return;
    }
    else if (getResult() == 2) {
        window.alert("CPU wins!");
        return;
    }


    computerInput();
    let status = getResult()
    if (status == 1) {
        window.alert("player won!");
        return;
    }
    else if (status == 2) {
        window.alert("CPU wins!");
        return;
    }
    else if (status == 3) {
        window.alert("Draw");
        return;
    }

}
