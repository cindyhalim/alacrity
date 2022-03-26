import { IGameItem, IPlayerItem, TRoomItems, IGame } from "@services";

export const getGame = (room: TRoomItems): IGame | null =>
  room.find((item): item is IGameItem => item.sk.includes("game"))?.game ||
  null;

export const getPlayers = (room: TRoomItems) =>
  room.filter((item): item is IPlayerItem => item.sk.includes("player"));
