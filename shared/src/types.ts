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

export enum CardColor {
  BLACK = "#112633",
  RED = "#C84C2B",
  ORANGE = "#F78C5A",
  NAVY = "#18414B",
  SAND = "#D99E7F",
}
export interface IPlayingCard {
  type: "playing"
  symbol: CardSymbol
  color: CardColor
  text: string
}

export interface IWildCard {
  type: "wildCard"
  color: CardColor
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
  drawCardColor: CardColor
  totalDrawCardsRemaining: number
  wildCard: IWildCard
  currentPlayerId: string
}

export interface IPlayerScoreInfo {
  id: string
  name: string
  score: number
}

// Websockets

export enum BackendWebsocketActions {
  PlayerIdSet = "player_id_set",
  PlayerPoolUpdated = "player_pool_updated",
  GameUpdated = "game_updated",
  RoomNotFound = "room_not_found",
  AdminDisconnected = "admin_disconnected",
  AddPlayerFailed = "add_player_failed",
  GameScoreUpdated = "game_score_updated",
}

export enum FrontendWebsocketActions {
  AdminJoined = "admin_joined",
  PlayerJoined = "player_joined",
  GameStarted = "game_started",
  CardDrawn = "card_drawn",
  CardWon = "card_won",
  GameEnded = "game_ended",
  HealthCheck = "health_check",
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

export interface IGameScoreUpdatedEvent {
  action: BackendWebsocketActions.GameScoreUpdated
  scores: IPlayerScoreInfo[]
}

export type TBackendWebsocketEvent =
  | IPlayerIdSetEvent
  | IPlayerPoolUpdatedEvent
  | IGameUpdatedEvent
  | IAdminDisconnectedEvent
  | IRoomNotFoundEvent
  | IGameScoreUpdatedEvent

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

export interface IGameStartedEvent {
  action: FrontendWebsocketActions.GameStarted
  roomId: string
}

export interface ICardDrawnEvent {
  action: FrontendWebsocketActions.CardDrawn
  roomId: string
}

export interface ICardWonEvent {
  action: FrontendWebsocketActions.CardWon
  roomId: string
  loserPlayerId: string
}

export interface IGameEndedEvent {
  action: FrontendWebsocketActions.GameEnded
  roomId: string
}

export interface IHealthCheckEvent {
  action: FrontendWebsocketActions.HealthCheck
}

export type TFrontendWebsocketEvent =
  | IAdminJoinedEvent
  | IPlayerJoinedEvent
  | IGameStartedEvent
  | ICardDrawnEvent
  | ICardWonEvent
  | IGameEndedEvent
  | IHealthCheckEvent
