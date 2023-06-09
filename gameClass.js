class Game {
    score = 0;
    gameRunning = true;
    array = [];
    activeArray = [];
    activePieces = [];
    lastPieceId;
    constructor(width, height, parent) {
        this.width = width;
        this.height = height;

        this.htmlParent = parent;

        for (let y = 0; y < this.height; y++) {
            let row = document.createElement("tr");
            this.array[y] = [];
            this.activeArray[y] = [];
            for (let x = 0; x < this.width; x++) {
                let cell = document.createElement("td");
                cell.id = `cell-${x}-${y}`;
                cell.classList.add("cell");
                row.appendChild(cell);
                this.array[y][x] = " ";
                this.activeArray[y][x] = " ";
            }
            this.htmlParent.appendChild(row);
        }
    }

    clearArray() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.activeArray[y][x] = " ";
            }
        }
    }

    step() {
        if (!this.gameRunning) return;
        this.clearArray();
        for(let j = 0; j < this.activePieces.length; j++) {
            var piece = this.activePieces[j];
            if (piece.isValid(0, 1, this.array, this.height, this.width)) {
                piece.pos[1] += 1;
                var x = piece.pos[0];
                var y = piece.pos[1];
    
                for(let i = 0; i < piece.parts.length; i++) {
                    this.activeArray[y + piece.parts[i][1]][x + piece.parts[i][0]] = piece.color;
                }
            }
            else {
                this.activePieces.splice(j, 1);
                for(let i = 0; i < piece.parts.length; i++) {
                    var x = piece.pos[0] + piece.parts[i][0];
                    var y = piece.pos[1] + piece.parts[i][1];
                    this.array[y][x] = piece.color;
                }
                this.newPiece();
            }
        }

        this.clearLine();

        this.draw();
    }

    clearLine() {
        for (let y = 0; y < this.height; y++) {
            var lineScore = 0;
            for (let x = 0; x < this.width; x++) {
                if (this.array[y][x] != " ") {
                    lineScore ++
                }
            }
            if (lineScore >= this.width) {
                this.score++;
                for (let i = 0; i < this.width; i++) {
                    this.array[y][i] = " ";
                }

                for(let h = y; h > 0; h--) {
                    for (let w = 0; w < this.width; w++) {
                        this.array[h][w] = this.array[h-1][w];
                    }
                }
            }
        }
    }

    rotatePiece() {
        for (let i = 0; i < this.activePieces.length; i++) {
            this.activePieces[i].chceckIfRotationIsValid(0, 0, this.array, this.height, this.width);
        }
    }

    movePiece(direction) {
        for (let i = 0; i < this.activePieces.length; i++) {
            if (this.activePieces[i].isValid(direction, 0, this.array, this.height, this.width))
                this.activePieces[i].pos[0] += direction;
        }
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

                if(this.activeArray[y][x] != " ") {
                    document.getElementById(cell).style.backgroundColor = this.activeArray[y][x];
                }
            }
        }
    }

    dropPiece() {
        for (let i = 0; i < this.activePieces.length; i++) {
            while(this.activePieces[i].isValid(0, 1, this.array, this.height, this.width)) {
                this.activePieces[i].pos[1] ++;
            }
        }
    }

    newPiece() {
        var pieceId = Math.floor(Math.random() * 7);
        var piece = new ActiveObject(pieceId, Math.floor(this.width/2));
        if (pieceId != this.lastPieceId) {
            this.lastPieceId = pieceId;
            if (!piece.isValid(0, 1, this.array, this.height, this.width)) {
                this.gameRunning = false;
            }
            this.activePieces.push(piece);
        }
        else {
            this.newPiece();
        }
    }
}