class Game {
    array = [];
    constructor(width, height, parent) {
        this.width = width;
        this.height = height;

        this.htmlParent = parent;

        for (let y = 0; y < this.height; y++) {
            let row = document.createElement("tr");
            this.array[y] = [];
            for (let x = 0; x < this.width; x++) {
                let cell = document.createElement("td");
                cell.id = `cell-${x}-${y}`;
                cell.classList.add("cell");
                row.appendChild(cell);
                this.array[y][x] = " ";
            }
            this.htmlParent.appendChild(row);
        }
    }

    draw() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                var cell = `cell-${x}-${y}`;
                if(this.array[x][y] != " ") {
                    document.getElementById(cell).style.backgroundColor = this.array[x][y];
                }
                else {
                    document.getElementById(cell).style.backgroundColor = "white";
                }
            }
        }
    }
}