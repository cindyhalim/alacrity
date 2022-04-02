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
}

export interface IGamePlayer extends IPlayer {
  points?: number
  playPile?: IPlayingCard[]
}

export interface IGame {
  id: string
  players: IGamePlayer[]
  totalDrawCardsRemaining: number
  wildCard: IWildCard
  currentPlayerId: string
  status: "started" | "ended"
}

// Websockets

export enum BackendWebsocketActions {
  PlayerIdSet = "player_id_set",
  PlayerPoolUpdated = "player_pool_updated",
  GameUpdated = "game_updated",
  RoomNotFound = "room_not_found",
  AdminDisconnected = "admin_disconnected",
  AddPlayerFailed = "add_player_failed",
}

export enum FrontendWebsocketActions {
  AdminJoined = "admin_joined",
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
  action: BackendWebsocketActions.RoomNotFound
}

export interface IAdminDisconnectedEvent {
  action: BackendWebsocketActions.AdminDisconnected
}

export interface IPlayerPoolUpdatedEvent {
  action: BackendWebsocketActions.PlayerPoolUpdated
  players: IPlayer[]
}

export interface IGameUpdatedEvent {
  action: BackendWebsocketActions.GameUpdated
  currentGame: IGame | null
}

export type TBackendWebsocketEvent =
  | IPlayerIdSetEvent
  | IPlayerPoolUpdatedEvent
  | IGameUpdatedEvent
  | IAdminDisconnectedEvent
  | IRoomNotFoundEvent

// Frontend events

export interface IAdminJoinedEvent {
  action: FrontendWebsocketActions.AdminJoined
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
  | IAdminJoinedEvent
  | IPlayerJoinedEvent
  | IGameStartedEvent
  | ICardDrawnEvent
  | ICardWonEvent
  | IGameEndedEvent
