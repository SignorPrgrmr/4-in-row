import React, {Component} from 'react';
import _ from 'underscore'
import {Arena as GameArena} from "../logic/Arena";
import {Nut} from "../logic/Nut";

class Arena extends Component {
    state = {
        arena: new GameArena(),
        turn: Nut.PLAYER_1,
        hoveredColumn: -1,
        isPlaying: true,
        player1: 21,
        player2: 21
    }

    handleClick = (index: number) => {
        if (this.state.isPlaying && !this.state.arena.columnIsFull(index)) {
            const { arena, turn, player1, player2 } = this.state
            arena.push(turn, index)
            console.log(arena)
            if (turn === Nut.PLAYER_1) {
                this.setState({ player1: player1 - 1 })
            } else {
                this.setState({ player2: player2 - 1 })
            }
            if (arena.hasWon(index)) {
                this.setState({ isPlaying: false })
                console.log('Won')
            } else {
                this.changeTurn()
                this.setState({ arena: { ...arena }, hoveredColumn: arena.columnIsFull(index) ? -1 : this.state.hoveredColumn})
            }
        }
    }

    handleMouseEnter = (index: number) => {
        if (this.state.isPlaying && !this.state.arena.columnIsFull(index)) {
            this.setState({hoveredColumn: index})
        }
    }

    handleMouseLeave = () => {
        this.setState({hoveredColumn: -1})
    }

    render() {
        return (
            <React.Fragment>
                <div className='container' style={{height: '60vh', width: '50%'}}>
                    <div className="row b" style={{height: '100%'}}>
                        { _.range(0, 7).map(index => this.getColumn(index)) }
                    </div>
                </div>
                <br/><br/>
                <div className="card-deck">
                    <div className="card "
                         style={{maxWidth: '18rem', border: '2px  rgb(92, 119, 194) solid', borderRadius: '3%'}}>
                        <div className="card-body ">
                            <h4 className="card-title d-flex justify-content-center  p-1"
                                style={{color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(255, 69, 56)', borderRadius: '4%'}}>Player
                                1</h4>
                            <p className="card-text">Number Of Piece: <strong>{ this.state.player1 }</strong></p>
                        </div>
                    </div>
                    <div className="card ml-auto "
                         style={{maxWidth: '18rem', border: '2px  rgb(92, 119, 194) solid', borderRadius: '3%'}}>
                        <div className="card-body ">
                            <h4 className="card-title  d-flex justify-content-center p-1"
                                style={{color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(252, 255, 64)', borderRadius: '4%'}}> Player
                                2</h4>
                            <p className="card-text">Number Of Piece: <strong>{ this.state.player2 }</strong></p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    getColumn = (index: number) => {
        return (
            <div key={index} className={'col ' + (this.state.hoveredColumn === index ? 'col-hover' : '')}
                 onClick={ () => this.handleClick(index)} onMouseEnter={ () => this.handleMouseEnter(index) }
                 onMouseLeave={ this.handleMouseLeave }>
                { this.state.arena.getColumn(index).reverse().map((nut, index) => this.getCell(nut, index))}
            </div>
        )
    }

    getCell = (nut: Nut, index: number) => {
        return (
            <div key={index} className={'row cell ' + (nut === Nut.EMPTY ? '' : nut === Nut.PLAYER_1 ? 'firstPlayer' : 'secondPlayer')}>

            </div>
        )
    }

    changeTurn = () => {
        const { turn } = this.state
        this.setState({ turn: turn === Nut.PLAYER_1 ? Nut.PLAYER_2 : Nut.PLAYER_1 })
    }
}

export default Arena;