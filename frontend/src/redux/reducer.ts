import { IGame, IRoom } from "src/types"
import { ActionEnum, TAction } from "./actions"

interface IState {
  playerId: string
  room: IRoom
  game: IGame | null
}

const initialRoomState: IRoom = {
  id: "",
  players: [],
  gameIds: [],
}

const initialState: IState = {
  playerId: "",
  room: initialRoomState,
  game: null,
}

export const reducer = (state = initialState, action: TAction): IState => {
  switch (action.type) {
    case ActionEnum.UPDATE_GAME:
      return {
        ...state,
        game: action.payload,
      }

    case ActionEnum.UPDATE_ROOM:
      return {
        ...state,
        room: action.payload,
      }
    case ActionEnum.SET_PLAYER_ID:
      return {
        ...state,
        playerId: action.payload,
      }
    default:
      return state
  }
}
