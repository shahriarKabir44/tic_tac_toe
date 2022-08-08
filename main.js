var grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var priority = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
var a = 0;
var b = -1;


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

function find(x, y) {
    return 3 * x + y + 1
}


function prioritizer() {
    var n, k, a = 0, b = 0, c = 0, d = 0, sm = 0;

    for (n = 0; n < 3; n++) {
        for (k = 0; k < 3; k++) {
            if (grid[n][k] != 0) {
                priority[n][k] = 0;
            }
            else {
                sm = 0;
                a = b = c = d = 0;
                if (n == k) {
                    sm = getSum('d', 1)
                    if (sm == 10) {
                        sm = 3;
                    }
                    else if (sm == 2) {
                        sm = 2;
                    }
                    else {
                        sm = 1;
                    }
                    a = sm;
                    sm = 0;
                }
                else if (n + k == 2) {
                    sm = grid[0][2] + grid[1][1] + grid[2][0];
                    if (sm == 10) {
                        sm = 3;
                    }
                    else if (sm == 2) {
                        sm = 2;
                    }
                    else {
                        sm = 1;
                    }
                    b = sm;
                    sm = 0;
                }
                sm = grid[0][k] + grid[1][k] + grid[2][k];
                if (sm == 10) {
                    sm = 3;
                }
                else if (sm == 2) {
                    sm = 2;
                }
                else {
                    sm = 1;
                }
                c = sm;
                sm = 0;

                sm = grid[n][0] + grid[n][1] + grid[n][2]
                if (sm == 10) {
                    sm = 3;
                }
                else if (sm == 2) {
                    sm = 2;
                }
                else {
                    sm = 1;
                }
                d = sm;
                sm = 0;
                priority[n][k] = Math.max(a, b, c, d);
            }
        }

    }
}





function computerInput() {
    var maximumPriorityValue = Math.max(Math.max(...priority[0]), Math.max(...priority[1]), Math.max(...priority[2]));

    var maxPriorityCellCount = 0;
    let prioritizedIndices = []
    for (let n = 0; n < 3; n++) {
        for (let k = 0; k < 3; k++) {
            if (priority[n][k] == maximumPriorityValue && maximumPriorityValue != 0) {
                maxPriorityCellCount++;
                prioritizedIndices.push([n, k])
            }
        }
    }
    if (maximumPriorityValue) {
        var randomPriorityIndex = Math.floor(Math.random() * maxPriorityCellCount);
        let [x, y] = prioritizedIndices[randomPriorityIndex]
        grid[x][y] = 5;
        document.getElementById(find(x, y)).innerHTML = "O";
    }

    else {
        alert("draw")
    }
}


function result() {
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
    var v;
    v = find(x, y);
    document.getElementById(v).innerHTML = 'X';
    a = x;
    b = y;
    grid[a][b] = 1;
    if (result() == 1) {
        window.alert("player won!");
        return;
    }
    else if (result() == 2) {
        window.alert("CPU wins!");
        return;
    }
    prioritizer();

    computerInput();
    let status = result()
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
