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
  type: "playing";
  symbol: CardSymbol;
  text: string;
}

export interface IWildCard {
  type: "wildCard";
  symbols: CardSymbol[];
}

export interface IRoom {
  id: string;
  players: {
    id: string;
    name: string;
    points?: number;
    playPile?: IPlayingCard[];
  }[];
  game: {
    id: string;
    totalDrawCardsRemaining: number;
    wildCard: IWildCard;
    currentPlayerId: string;
  } | null;
}

// Websockets

export enum BackendWebsocketActions {
  PlayerIdSet = "player_id_set",
  RoomUpdated = "room_updated",
  GameUpdated = "game_updated",
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
  action: BackendWebsocketActions.PlayerIdSet;
  playerId: string;
}

export interface IRoomUpdatedEvent {
  action: BackendWebsocketActions.RoomUpdated;
  room: IRoom;
}

export type TBackendWebsocketEvent = IPlayerIdSetEvent | IRoomUpdatedEvent;

// Frontend events

export interface IRoomCreatedEvent {
  action: FrontendWebsocketActions.RoomCreated;
  roomId: string;
  username: string;
}

export interface IPlayerJoinedEvent {
  action: FrontendWebsocketActions.PlayerJoined;
  roomId: string;
  username: string;
}

export interface IGameStartedEvent {
  action: FrontendWebsocketActions.GameStarted;
  roomId: string;
  difficulty: string;
}

export interface ICardDrawnEvent {
  action: FrontendWebsocketActions.CardDrawn;
}

export interface ICardWonEvent {
  action: FrontendWebsocketActions.CardWon;
  loserPlayerId: string;
}

export interface IGameEndedEvent {
  action: FrontendWebsocketActions.GameEnded;
}

export type TFrontendWebsocketEvent =
  | IRoomCreatedEvent
  | IPlayerJoinedEvent
  | IGameStartedEvent
  | ICardDrawnEvent
  | ICardWonEvent
  | IGameEndedEvent;
