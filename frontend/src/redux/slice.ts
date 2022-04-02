import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPlayer, IGame } from "alacrity-shared"

export interface IState {
  playerId: string
  playerPool: IPlayer[]
  currentGame: IGame | null
}

const initialState: IState = {
  playerId: "",
  playerPool: [],
  currentGame: null,
}

export const { actions, reducer } = createSlice({
  name: "alacrity",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<IGame | null>) => ({
      ...state,
      currentGame: action.payload,
    }),
    setPlayerId: (state, action: PayloadAction<string>) => ({
      ...state,
      playerId: action.payload,
    }),
    setPlayerPool: (state, action: PayloadAction<IPlayer[]>) => ({
      ...state,
      playerPool: action.payload,
    }),
  },
})
