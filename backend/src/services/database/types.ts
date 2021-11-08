export interface IDynamoDbItem {
  pk: string;
  sk: "room" | "game";
}

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

interface IPlayingCard {
  type: "playing";
  symbol: CardSymbol;
  text: string;
}

interface IWildCard {
  type: "wildCard";
  symbols: CardSymbol[];
}

type TCard = IPlayingCard | IWildCard;

export interface IGame {
  id: string;
  players: IGamePlayer[];
  drawPile: TCard[];
  wildCardPile: TCard[];
  status: "started" | "ended";
  currentPlayerId: string;
}

export interface IRoom {
  id: string;
  players: IPlayer[];
  gameIds: string[];
}

export interface IPlayer {
  id: string;
  name: string;
}

export interface IGamePlayer extends IPlayer {
  winningPile: TCard[];
  playPile: TCard[];
}
