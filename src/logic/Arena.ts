import { Nut } from "./Nut"

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
