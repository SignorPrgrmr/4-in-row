import React, {Component} from 'react';
import _ from 'underscore'
import {Arena as GameArena} from "../logic/Arena";
import {Nut} from "../logic/Nut";

class Arena extends Component {
    state = {
        arena: new GameArena(),
        turn: Nut.PLAYER_1,
        hoveredColumn: -1
    }

    handleClick = (index: number) => {
        if (!this.state.arena.columnIsFull(index)) {
            const { arena } = this.state
            arena.push(this.state.turn, index)
            if (arena.hasWon(index))
                console.log('Utde')
            this.changeTurn()
            this.setState({ arena: { ...arena }, hoveredColumn: arena.columnIsFull(index) ? -1 : this.state.hoveredColumn})
        }
    }

    handleMouseEnter = (index: number) => {
        if (!this.state.arena.columnIsFull(index)) {
            this.setState({hoveredColumn: index})
        }
    }

    handleMouseLeave = () => {
        this.setState({hoveredColumn: -1})
    }

    render() {
        return (
            <div className='container' style={{height: '60vh', width: '50%'}}>
                <div className="row b" style={{height: '100%'}}>
                    { _.range(0, 7).map(index => this.getColumn(index)) }
                </div>
            </div>
        );
    }

    getColumn = (index: number) => {
        return (
            <div key={index} className={'col ' + (this.state.hoveredColumn === index ? 'col-hover' : '')}
                 onClick={ () => this.handleClick(index)} onMouseEnter={ () => this.handleMouseEnter(index) }
                 onMouseLeave={ this.handleMouseLeave }>
                { this.state.arena.getColumn(index).map((nut, index) => this.getCell(nut, index))}
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