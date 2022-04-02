import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPlayer, IGame } from "alacrity-shared"

export type TRoomStatus = "ready" | "not_found" | "admin_disconnected"

export interface IState {
  playerId: string
  playerPool: IPlayer[]
  currentGame: IGame | null
  roomId: string
  roomStatus: TRoomStatus
}

const initialState: IState = {
  playerId: "",
  playerPool: [],
  currentGame: null,
  roomId: "",
  roomStatus: "ready",
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
    setRoomStatus: (state, action: PayloadAction<TRoomStatus>) => ({
      ...state,
      roomStatus: action.payload,
    }),
  },
})
