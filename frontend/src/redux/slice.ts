import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPlayer, IGame } from "alacrity-shared"

export type TRoomStatus = "ready" | "not_found" | "admin_disconnected"
export type TStartNewGameStatus = "ready" | "loading"
export interface IState {
  playerId: string
  playerPool: IPlayer[]
  startNewGameStatus: TStartNewGameStatus
  currentGame: IGame | null
  roomId: string
  roomStatus: TRoomStatus
  showErrorToast: boolean
}

const initialState: IState = {
  playerId: "",
  playerPool: [],
  currentGame: null,
  roomId: "",
  roomStatus: "ready",
  startNewGameStatus: "ready",
  showErrorToast: false,
}

export const { actions, reducer } = createSlice({
  name: "alacrity",
  initialState,
  reducers: {
    setShowErrorToast: (state, action: PayloadAction<boolean>) => ({
      ...state,
      showErrorToast: action.payload,
    }),
    setStartNewGameStatus: (state, action: PayloadAction<TStartNewGameStatus>) => ({
      ...state,
      startNewGameStatus: action.payload,
    }),
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
