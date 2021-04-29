import {Nut} from "./Nut"

export class Arena {
    private arena: (Nut)[][] = [[], [], [], [], [], [], []];
    private columnSize = [0, 0, 0, 0, 0, 0, 0]
    push = (nut: Nut, index: number) => {
        if(this.columnSize[index] < 6)
         this.pushNut(nut, index)
    }

    private pushNut = (nut: Nut, index: number) => {
        this.arena[index][this.columnSize[index]] = nut
        this.columnSize[index]++
    }
    getColumn = (index: number) => this.arena[index]

    columnIsFull = (index: number) => !(this.columnSize[index] < 6)

    hasWon = (index: number) => {
        let y = -1
        while (this.arena[index][y + 1] !== Nut.EMPTY)
            y++
        console.log(y)
        return this.verticalPosition(index, y) || this.horizontalPosition(index, y) ||
            this.obliqueRightPosition(index, y) || this.obliqueLeftPosition(index, y)
    }

    private verticalPosition(x: number, y: number) {
        return this.arena[x][y] === this.arena[x][y - 1] && this.arena[x][y] === this.arena[x][y - 2]
            && this.arena[x][y] === this.arena[x][y - 3]
    }

    private horizontalPosition(x: number, y: number) {
        let rightCounter = 0
        while (this.arena[x + rightCounter + 1] && this.arena[x][y] === this.arena[x + rightCounter + 1][y])
            rightCounter++
        let leftCounter = 0
        while (this.arena[x - leftCounter - 1] && this.arena[x][y] === this.arena[x - leftCounter - 1][y])
            leftCounter++
        return leftCounter + rightCounter + 1 >= 4
    }

    private obliqueRightPosition(x: number, y: number) {
        let rightCounter = 0
        while (this.arena[x + rightCounter + 1] && this.arena[x][y] === this.arena[x + rightCounter + 1][y + rightCounter + 1])
            rightCounter++
        let leftCounter = 0
        while (this.arena[x - leftCounter - 1] && this.arena[x][y] === this.arena[x - leftCounter - 1][y - leftCounter - 1])
            leftCounter++
        return rightCounter + leftCounter + 1 >= 4
    }

    private obliqueLeftPosition(x: number, y: number) {
        let rightCounter = 0
        while (this.arena[x + rightCounter + 1] && this.arena[x][y] === this.arena[x + rightCounter + 1][y - rightCounter - 1])
            rightCounter++
        let leftCounter = 0
        while (this.arena[x - leftCounter - 1] && this.arena[x][y] === this.arena[x - leftCounter - 1][y + leftCounter + 1])
            leftCounter++
        return rightCounter + leftCounter + 1 >= 4
    }

    constructor() {
        for(let i = 0; i < 7; i++) {
            for(let j = 0; j < 6; j++){
                this.arena[i].push(Nut.EMPTY)
            }
        }
    }
}
