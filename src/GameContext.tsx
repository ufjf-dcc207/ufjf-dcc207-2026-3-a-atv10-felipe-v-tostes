import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { gameReducer, INITIAL_CONFIG } from './gameLogic';

export interface GameState {
  tubes: string[][];
  selectedTube: number | null;
  hasWon: boolean;
}

export type GameAction = 
  | { type: 'TUBE_CLICK'; payload: number }
  | { type: 'RESET' };

interface GameContextType {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_CONFIG);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
