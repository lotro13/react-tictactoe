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
      console.log("place on board " + index);

        const selectedField = state.field[index];
            if (selectedField != '-') return { ...state, error: "The field is taken" };

            const newField = state.field.map((s, i) => { 
              if (i == index) return state.currentTurn;

              return s;
            });

        return {
           ...state,
            field: newField,
            currentTurn: findNewTurn(state.currentTurn),
            isGameOver: false
        }
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
  }

  return (
    <>
    <Layout field= {state.field} dispatcher = { dispatcher } />
    <div>
      It is { state.currentTurn } turn
    </div>
    <div>
      { state.error != null ? '': state.error}
    </div>
    </>
  );
}

export default App;
