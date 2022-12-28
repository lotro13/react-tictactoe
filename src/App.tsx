import React, { useReducer } from 'react';
import Box from './Box';
import Layout from './Layout';


type GameState = {
  field: string[];
  currentTurn: string;
  isGameOver: boolean;
  error: string | null;
}

export type Action = 
    | { type: "TILE_SELECTED"; index: number; }
    | { type: "START_GAME"; }

const GameReducer = (state: GameState, action: Action) => {
    const findNewTurn = (oldTurn: string) => {
        if (oldTurn == 'X') {
          return 'O';
        }

        return 'X';
    }
 
    const createInitialState = () => {
      return {
          field: Array(9).fill('-'),
          currentTurn: 'X',
          isGameOver: false,
          error: null
      };
    }

    const placeOnBoard = (index: number, state: GameState) => {
        const selectedField = state.field[index];
        if (selectedField != '-') return { ...state, error: "The field is taken" };

        const newField = state.field.map((s, i) => { 
            if (i == index) return state.currentTurn;
            return s;
        });

        let newState = {
          ...state,
           field: newField
        };

        newState = checkForWin(newState);

        return newState;
    }

    const checkForWin = (state: GameState): GameState => {
      let field = state.field;
      let someoneWon = false;
        // rows
      if (field[0] !== '-' && field[0] === field[1] && field[1] === field[2]) someoneWon = true;
      if (field[3] !== '-' && field[3] === field[4] && field[4] === field[5]) someoneWon = true;
      if (field[6] !== '-' && field[6] === field[7] && field[7] === field[8]) someoneWon = true;
        // columns
      if (field[0] !== '-' && field[0] === field[3] && field[3] === field[6]) someoneWon = true;
      if (field[1] !== '-' && field[1] === field[4] && field[4] === field[7]) someoneWon = true;
      if (field[2] !== '-' && field[2] === field[5] && field[5] === field[8]) someoneWon = true;
        // diagonals
      if (field[0] !== '-' && field[0] === field[4] && field[4] === field[8]) someoneWon = true;
      if (field[2] !== '-' && field[2] === field[4] && field[4] === field[6]) someoneWon = true;

      if (someoneWon) {
        let message = someoneWon ? state.currentTurn + ' has won' : null;
        alert(message);
        
        return {
          ...state,
          isGameOver: true,
          error: message
        }
      }
      
      return {
          ...state,
          currentTurn: findNewTurn(state.currentTurn)
      };
    }

    
    switch (action.type) {
      case "TILE_SELECTED":
          return placeOnBoard(action.index, state);
      case "START_GAME":
          return createInitialState();
  }
}

function App() {
  const initialState: GameState = {
        field: Array<string>(9).fill('-'),
        currentTurn: 'X',
        isGameOver: false,
        error: null
  };

  const [state, dispatcher] = useReducer(GameReducer, initialState);

  const handleClick = ():void => {
    dispatcher({ type: 'START_GAME' });
  }

  return (
    <>
    <Layout field= {state.field} dispatcher = { dispatcher } />
    <div>
      It is { state.currentTurn } turn
    </div>
    <div>      
      { state.error == null ? '': state.error}
    </div>
    <div>
      { state.error == null ? <></> : <button onClick={handleClick}>Restart</button>}
    </div>
    </>
  );
}

export default App;
