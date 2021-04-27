import { Nut } from "./Nut"

export class Arena {
    private arena: (Nut | undefined)[][] = [[], [], [], [], [], [], []];
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

    constructor() {
        for(let i = 0; i < 7; i++){
            for(let j = 6; j < 6; j++){
                this.arena[i].push(undefined)
            }
        }
    }
}
