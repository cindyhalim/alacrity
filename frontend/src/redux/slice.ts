import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IGame, IRoom } from "src/types"

export interface IState {
  playerId: string
  room: IRoom
  currentGame: IGame | null
}

const initialRoomState: IRoom = {
  id: "",
  players: [],
  gameIds: [],
}

const initialState: IState = {
  playerId: "",
  room: initialRoomState,
  currentGame: null,
}

export const { actions, reducer } = createSlice({
  name: "alacrity",
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<IGame>) => ({
      ...state,
      game: action.payload,
    }),
    updateRoom: (state, action: PayloadAction<IRoom>) => ({
      ...state,
      room: action.payload,
    }),
    setPlayerId: (state, action: PayloadAction<string>) => ({
      ...state,
      playerId: action.payload,
    }),
  },
})
