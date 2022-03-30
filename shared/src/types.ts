// Shared models
export enum CardSymbol {
  DIAMOND = "DIAMOND",
  WAVE = "WAVE",
  STAR = "STAR",
  DOTS = "DOTS",
  CIRCLE = "CIRCLE",
  PLUS = "PLUS",
  PAUSE = "PAUSE",
  HASH = "HASH",
}

export interface IPlayingCard {
  type: "playing"
  symbol: CardSymbol
  text: string
}

export interface IWildCard {
  type: "wildCard"
  symbols: CardSymbol[]
}

export interface IPlayer {
  id: string
  name: string
  points?: number
  playPile?: IPlayingCard[]
}

export interface IGame {
  id: string
  totalDrawCardsRemaining: number
  wildCard: IWildCard
  currentPlayerId: string
  status: "started" | "ended"
}
export interface IRoom {
  id: string
  players: IPlayer[]
  game: IGame | null
}

// Websockets

export enum BackendWebsocketActions {
  PlayerIdSet = "player_id_set",
  RoomUpdated = "room_updated",
  GameUpdated = "game_updated",
  RoomNotFound = "room_not_found",
  AddPlayerFailed = 'add_player_failed'
}

export enum FrontendWebsocketActions {
  RoomCreated = "room_created",
  PlayerJoined = "player_joined",
  GameStarted = "game_started",
  CardDrawn = "card_drawn",
  CardWon = "card_won",
  GameEnded = "game_ended",
}

// Backend events
export interface IPlayerIdSetEvent {
  action: BackendWebsocketActions.PlayerIdSet
  playerId: string
}

export interface IRoomNotFoundEvent {
  action: BackendWebsocketActions.RoomNotFound;
}

export interface IAddPlayerFailed {
  action: BackendWebsocketActions.AddPlayerFailed;
}
export interface IRoomUpdatedEvent {
  action: BackendWebsocketActions.RoomUpdated
  room: IRoom
}

export type TBackendWebsocketEvent = IPlayerIdSetEvent | IRoomUpdatedEvent

// Frontend events

export interface IRoomCreatedEvent {
  action: FrontendWebsocketActions.RoomCreated
  roomId: string
  username: string
}

export interface IPlayerJoinedEvent {
  action: FrontendWebsocketActions.PlayerJoined
  roomId: string
  username: string
}

export enum GameDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  VERY_HARD = "VERY_HARD",
}

export interface IGameStartedEvent {
  action: FrontendWebsocketActions.GameStarted
  roomId: string
  difficulty: GameDifficulty
}

export interface ICardDrawnEvent {
  action: FrontendWebsocketActions.CardDrawn
}

export interface ICardWonEvent {
  action: FrontendWebsocketActions.CardWon
  loserPlayerId: string
}

export interface IGameEndedEvent {
  action: FrontendWebsocketActions.GameEnded
}

export type TFrontendWebsocketEvent =
  | IRoomCreatedEvent
  | IPlayerJoinedEvent
  | IGameStartedEvent
  | ICardDrawnEvent
  | ICardWonEvent
  | IGameEndedEvent

module.exports = {
  CardSymbol,
}
