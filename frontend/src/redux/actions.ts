import { IGame, IRoom } from "src/types"
import { createAction, TActionsUnion } from "./utils"

export enum ActionEnum {
  UPDATE_GAME = "UPDATE_GAME",
  UPDATE_ROOM = "UPDATE_ROOM",
  SET_PLAYER_ID = "SET_PLAYER_ID",
}

export const actions = {
  updateGame: (game: IGame | null) =>
    createAction(ActionEnum.UPDATE_GAME, game),
  updateRoom: (room: IRoom) => createAction(ActionEnum.UPDATE_ROOM, room),
  setPlayerId: (id: string) => createAction(ActionEnum.SET_PLAYER_ID, id),
}

export type TAction = TActionsUnion<typeof actions>
