class Game {
    array = [];
    activePieces = [];
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

    clearArray() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.array[y][x] = " ";
            }
        }
    }

    step() {
        this.clearArray();
        for(let j = 0; j < this.activePieces.length; j++) {
            var piece = this.activePieces[j];
            piece.pos[1] += 1;
            var x = piece.pos[0];
            var y = piece.pos[1];

            for(let i = 0; i < piece.parts.length; i++) {
                this.array[y + piece.parts[i][1]][x + piece.parts[i][0]] = piece.color;
            }
        }

        this.draw();
    }

    draw() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                var cell = `cell-${x}-${y}`;
                if(this.array[y][x] != " ") {
                    document.getElementById(cell).style.backgroundColor = this.array[y][x];
                }
                else {
                    document.getElementById(cell).style.backgroundColor = "white";
                }
            }
        }
    }

    newPiece(type, x) {
        this.activePieces.push(new ActiveObject(type, x))
    }
}