import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRoom } from "alacrity-shared"

export interface IState {
  playerId: string
  room: IRoom
}

const initialRoomState: IRoom = {
  id: "",
  players: [],
  game: null,
}

const initialState: IState = {
  playerId: "",
  room: initialRoomState,
}

export const { actions, reducer } = createSlice({
  name: "alacrity",
  initialState,
  reducers: {
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
