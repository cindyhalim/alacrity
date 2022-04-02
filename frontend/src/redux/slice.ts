import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPlayer, IGame } from "alacrity-shared"

export interface IState {
  playerId: string
  playerPool: IPlayer[]
  currentGame: IGame | null
  roomId: string
}

const initialState: IState = {
  playerId: "",
  playerPool: [],
  currentGame: null,
  roomId: "",
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
    setRoomId: (state, action: PayloadAction<string>) => ({
      ...state,
      roomId: action.payload,
    }),
  },
})
