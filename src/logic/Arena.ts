import {Nut} from "./Nut"

export class Arena {
    private arena: (Nut)[][] = [[], [], [], [], [], [], []];
    private columnSize = [0, 0, 0, 0, 0, 0, 0]
    private playerOneNuts: number
    private playerTwoNuts: number
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
        this.playerOneNuts = 0
        this.playerTwoNuts = 0
    }
    whoWin = () => {if(this.playerOneNuts == 3){
        this.constructor()
        return 'player_1 is winner'
    }
    else if(this.playerTwoNuts == 3){
        this.constructor()
        return 'player_2 is winner'
    }
}
    verticalGetScore = (index: number): string => {
            for(let i = this.columnSize[index]; i < this.columnSize[index] - 4; i--){
                let nut1 = this.arena[index][i]
                let nut2 = this.arena[index][i - 1]
                if(nut1 === Nut.PLAYER_1 && nut2 === Nut.PLAYER_1)
                    this.playerOneNuts++
                else if(nut1 === Nut.PLAYER_2 && nut2 === Nut.PLAYER_2)
                    this.playerTwoNuts++
                else break
            }
            this.whoWin()
            return ''
        }
    obliquaWin = (index: number) => {
            if(this.columnSize[index] > 2 && index > 2){
                  for(let i = this.columnSize[index]; i < this.columnSize[index] - 4; i--){
                     let nut1 = this.arena[index][i]
                     let nut2 = this.arena[index - 1][i - 1]
                     index--
                    if(nut1 === Nut.PLAYER_1 && nut2 === Nut.PLAYER_1)
                        this.playerOneNuts++
                    else if(nut1 === Nut.PLAYER_2 && nut2 === Nut.PLAYER_2)
                        this.playerTwoNuts++
                    else break
                    }
                    this.whoWin()
                }
             if(this.columnSize[index] < 4 && index > 2){
                 for(let i = this.columnSize[index]; i < this.columnSize[index] - 4; i--){
                    let nut1 = this.arena[index][i]
                    let nut2 = this.arena[index + 1][i - 1]
                    index++
                    if(nut1 === Nut.PLAYER_1 && nut2 === Nut.PLAYER_1)
                        this.playerOneNuts++
                    else if(nut1 === Nut.PLAYER_2 && nut2 === Nut.PLAYER_2)
                        this.playerTwoNuts++
                    else break
                    }
                    this.whoWin()
                }
                if(this.columnSize[index] > 2 && index < 3){
                    for(let i = this.columnSize[index]; i < this.columnSize[index] + 4; i++){
                        let nut1 = this.arena[index][i]
                        let nut2 = this.arena[index - 1][i + 1]
                        index--
                        if(nut1 === Nut.PLAYER_1 && nut2 === Nut.PLAYER_1)
                        this.playerOneNuts++
                    else if(nut1 === Nut.PLAYER_2 && nut2 === Nut.PLAYER_2)
                        this.playerTwoNuts++
                    else break
                    }
                    this.whoWin()
                }
            if(this.columnSize[index] < 4 && index < 3){
                for(let i = this.columnSize[index]; i < this.columnSize[index] + 4; i++){
                    let nut1 = this.arena[index][i]
                    let nut2 = this.arena[index + 1][i + 1]
                    index++
                    if(nut1 === Nut.PLAYER_1 && nut2 === Nut.PLAYER_1)
                        this.playerOneNuts++
                    else if(nut1 === Nut.PLAYER_2 && nut2 === Nut.PLAYER_2)
                        this.playerTwoNuts++
                    else break
                    }
                    this.whoWin()
                }    
            }
        }
