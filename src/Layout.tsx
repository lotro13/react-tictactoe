import React from 'react';
import Box from './Box';
import { Action } from './App';

interface LayoutProps {
    field: string[]
    dispatcher: React.Dispatch<Action>
}

const Layout: React.FC<LayoutProps> = ({field, dispatcher }) => {
    const style = {
        border: '4px solid lightblue',
        borderRadius: '10px',
        width: '320px',
        height: '320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
    };

    return (
        <div style={style}>
            { field.map((tile, i) => (
                <Box key={i} idx= { i } value= { tile } dispatcher= { dispatcher } />
            )) }
        </div>
    );
}

export default Layout;

