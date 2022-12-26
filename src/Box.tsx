import React from 'react';
import { Action } from './App';
import { useCounter } from './UseCounter';

export interface BoxProps {
    value: string;
    idx: number;
    dispatcher: React.Dispatch<Action>
}

const Box: React.FC<BoxProps> = ({ value, idx, dispatcher }) => {
    const style = {
        background: '#fff',
        border: '2px solid lightblue',
        fontSize: '30px',
        fontWeight: '800',
        cursor: 'pointer',
        outline: 'none'
    }

    return (
        <button
            style={style}
            onClick={ () => {
                dispatcher({ type: "TILE_SELECTED", index: idx })
                console.log("click on " + idx);
            }}>
            {value}
        </button>
    );
}

export default Box;