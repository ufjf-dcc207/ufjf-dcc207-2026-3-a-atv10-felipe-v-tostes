import React, { createContext, useReducer } from 'react';
import { gameReducer, INITIAL_CONFIG } from './gameLogic';

export const GameContext = createContext<any>(null);

export function GameProvider({ children }: any) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_CONFIG);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
