import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPlayer, IGame, IPlayerScoreInfo } from "alacrity-shared"

export type TRoomStatus = "ready" | "not_found" | "admin_disconnected"
export interface IState {
  playerId: string
  playerPool: IPlayer[]
  isGameLoading: boolean
  currentGame: IGame | null
  gameScore: IPlayerScoreInfo[] | null
  roomId: string
  roomStatus: TRoomStatus
  showErrorToast: boolean
}

const initialState: IState = {
  playerId: "",
  playerPool: [],
  currentGame: null,
  gameScore: null,
  roomId: "",
  roomStatus: "ready",
  isGameLoading: false,
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
    setIsGameLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isGameLoading: action.payload,
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
    setGameScore: (state, action: PayloadAction<IPlayerScoreInfo[] | null>) => ({
      ...state,
      gameScore: action.payload,
    }),
  },
})
