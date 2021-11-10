import { IPlayer, IGame } from "alacrity-shared";
import { ActionEnum, TAction } from "./actions";

export interface IState {
  playerId: string;
  roomId: string;
  players: IPlayer[];
  game: IGame | null;
}

const initialState: IState = {
  playerId: "",
  roomId: "",
  players: [],
  game: null,
};

export const reducer = (state = initialState, action: TAction): IState => {
  switch (action.type) {
    case ActionEnum.UPDATE_ROOM:
      return {
        ...state,
        roomId: action.payload.id,
        players: { ...state.players, ...action.payload.players },
        game: action.payload.game
          ? { ...state.game, ...action.payload.game }
          : null,
      };
    case ActionEnum.SET_PLAYER_ID:
      return {
        ...state,
        playerId: action.payload,
      };
    default:
      return state;
  }
};
