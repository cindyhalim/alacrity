import { IPlayingCard, IWildCard } from "alacrity-shared"

type id = string
type TDynamoDbRoomSk = "game" | "player"

export interface IRoomIndex {
  pk: `room_${id}`
  sk: `${TDynamoDbRoomSk}_${id}`
}

export interface IConnectionIndex {
  pk: `connection_${id}`
  sk: "connection"
}

export interface IConnectionItem extends IConnectionIndex {
  roomId: string
}

export interface IGameItem extends IRoomIndex {
  game: IGameModel
}

export interface IPlayerItem extends IRoomIndex {
  player: IPlayerModel
}

export interface IGameModel {
  id: string
  players: IGamePlayer[]
  drawPile: (IPlayingCard | IWildCard)[]
  wildCardPile: IWildCard[]
  status: "started" | "ended"
  currentPlayerId: string
}

export interface IPlayerModel {
  id: string
  name: string
  isAdmin: boolean
}
export interface IGamePlayer extends IPlayerModel {
  winningPile: IPlayingCard[]
  playPile: IPlayingCard[]
}

export type TRoomItems = (IGameItem | IPlayerItem)[]
