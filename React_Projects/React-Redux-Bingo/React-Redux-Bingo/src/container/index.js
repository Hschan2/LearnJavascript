import React, { Component } from 'react';
import Board from "../components/index";
import './index.css'
import * as random from '../components/random';

class Bingo extends Component {
    constructor(props){
        super(props);
        this.state = {
            p1_array: [],
            p2_array: []
        }
    }

    async numberRoad() {
        let p1_array = random.random();
        let p2_array = random.random();
        
        await this.setState({
            p1_array,
            p2_array
        })
        this.props.arrayNumP1(this.state.p1_array);
        this.props.arrayNumP2(this.state.p2_array);
    }

    render() {
        let {isPlaying} = this.props;
        return(
            <div>
                <div className="gamebtn">
                    {!isPlaying ? <button>게임시작</button> : <button>게임재시작</button>}
                </div>
                <div className="p1">
                    <p>P1</p>
                    <Board array={this.state.p1_array}></Board>
                </div>
                <div className="p2">
                    <p>P2</p>
                    <Board array={this.state.p2_array}></Board>
                </div>
            </div>
        )
    }
}

export default Bingo;