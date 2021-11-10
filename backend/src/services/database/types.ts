import { IPlayingCard, IWildCard } from "alacrity-shared";
type id = string;
type TDynamoDbRoomSk = "game" | "player";

export interface IRoomIndex {
  pk: `room_${id}`;
  sk: `${TDynamoDbRoomSk}_${id}`;
}

export interface IConnectionIndex {
  pk: `connection_${id}`;
  sk: "connection";
}

export interface IConnectionItem extends IConnectionIndex {
  roomId: string;
}

export interface IGameItem extends IRoomIndex {
  game: IGame;
}

export interface IPlayerItem extends IRoomIndex {
  player: IPlayer;
}

export interface IGame {
  id: string;
  players: IGamePlayer[];
  drawPile: IPlayingCard[];
  wildCardPile: IWildCard[];
  status: "started" | "ended";
  currentPlayerId: string;
}

export interface IPlayer {
  id: string;
  name: string;
}
export interface IGamePlayer extends IPlayer {
  winningPile: IPlayingCard[];
  playPile: IPlayingCard[];
}

export type TRoomItems = (IGameItem | IPlayerItem)[];
