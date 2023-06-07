class ActiveObject {
    shape = []
    parts = []
    canRotate = false;
    color = "";
    rotation = 0;
    constructor(type, x) {
        switch(type) {
            case 0:
                this.shape = [ 
                    [0,0],
                    [1,0],
                    [0,1],
                    [1,1]
                ];
                this.canRotate = false;
                this.color = "yellow";
                break;

            case 1:
                this.shape = [
                    [-1,0],
                    [0,0],
                    [1,0],
                    [2,0]
                ];
                this.canRotate = true;
                this.color = "lightblue";
                break;

            case 2:
                this.shape = [
                    [-1,1],
                    [-1,0],
                    [0,0],
                    [1,0]
                ];
                this.canRotate = true;
                this.color = "orange";
                break;

            case 3:
                this.shape = [
                    [1,1],
                    [-1,0],
                    [0,0],
                    [1,0]
                ];
                this.canRotate = true;
                this.color = "blue";
                break;

            case 4:
                this.shape = [
                    [0,1],
                    [-1,0],
                    [0,0],
                    [1,0]
                ];
                this.canRotate = true;
                this.color = "purple";
                break;

            case 5:
                this.shape = [
                    [0,1],
                    [0,0],
                    [-1,1],
                    [1,0]
                ];
                this.canRotate = true;
                this.color = "lightgreen";
                break;

            case 6:
                this.shape = [
                    [0,1],
                    [0,0],
                    [1,1],
                    [-1,0]
                ];
                this.canRotate = true;
                this.color = "red";
                break;
        }

        this.pos = [x, -1];
        this.parts = this.shape;
    }

    chceckIfRotationIsValid(offsetX, offsetY, array, gameHeight, gameWidth) {
        if (!this.canRotate) return;
        var futureRotation = (this.rotation + 1) % 4;
        this.rotate(futureRotation);
        if(!this.isValid(offsetX, offsetY, array, gameHeight, gameWidth)) {
            this.rotate(this.rotation);
        }
        else {
            this.rotation = futureRotation;
        }
    }

    rotate(rotation) {
        this.parts = [];
        for(const square of this.shape) {
            if(rotation == 0) {
                this.parts.push([
                    +square[0],
                    +square[1]
                ]);
            }
            if(rotation == 1) {
                this.parts.push([
                    -square[1],
                    +square[0]
                ]);
            }
            if(rotation == 2) {
                this.parts.push([
                    -square[0],
                    -square[1]
                ]);
            }
            if(rotation == 3) {
                this.parts.push([
                    +square[1],
                    -square[0]
                ]);
            }
        }
    }

    isValid(offsetX, offsetY, array, gameHeight, gameWidth) {
        for(let i = 0; i < this.parts.length; i++) {
            var y = this.pos[1] + this.parts[i][1] + offsetY;
            var x = this.pos[0] + this.parts[i][0] + offsetX;

            if(y < 0 || y >= gameHeight || x < 0 || x >= gameWidth)
                return false;
            else if(array[y][x] == undefined) console.error("Undefined position for piece");
            
            if(array[y][x] != " ")
                return false;
        }

        return true;
    }
}