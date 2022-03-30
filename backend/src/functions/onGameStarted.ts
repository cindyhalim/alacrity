// import { nanoid } from "nanoid"
// import {
//   IPlayerIdSetEvent,
//   BackendWebsocketActions,
//   IGameStartedEvent,
//   IGameUpdatedEvent,
// } from "alacrity-shared"

// import { database, IGame, IGamePlayer, ws } from "@services"
// import { getPlayers, middyfy, ValidatedAPIGatewayEvent } from "@utils"

// const onConnect = async (event: ValidatedAPIGatewayEvent<IGameStartedEvent>) => {
//   const {
//     requestContext: { connectionId },
//   } = event

//   const { roomId, difficulty } = event.body

//   const generateUniqueRandomFromList = ({
//     min = 0,
//     max,
//     list,
//   }: {
//     min?: number
//     max: number
//     list: string[]
//   }) => {
//     const set: Set<string> = new Set()
//     const listSize = list.length - 1
//     let safeMax = max

//     if (safeMax > listSize) {
//       safeMax = listSize
//     }

//     while (set.size !== safeMax) {
//       const random = Math.floor(Math.random() * (safeMax - min + 1)) + min
//       if (!set.has(list[random])) {
//         set.add(list[random])
//       }
//     }

//     return Array.from(set)
//   }

//   const room = await database.room.get({ roomId })
//   const rawPlayers = getPlayers(room)
//   const playerIds = rawPlayers.map(({ player }) => player.id)
//   const randomOrderedPlayers = generateUniqueRandomFromList({
//     max: playerIds.length - 1,
//     list: playerIds,
//   })
//   const players: IGamePlayer[] = randomOrderedPlayers.map((currPlayer) => {
//     const playerDetails = rawPlayers.find(({ player }) => player.id == currPlayer)

//     return {
//       id: playerDetails.player.id,
//       name: playerDetails.player.name,
//       winningPile: [],
//       playPile: [],
//     }
//   })

//   // pull words/categories from s3
//   // select words from difficulty in random

//   const newGame: IGame = {
//     id: `game_${nanoid()}`,
//     players,
//     drawPile: [],
//     //TODO: deal with wildCardPile logic
//     wildCardPile: [],
//     status: "started",
//     currentPlayerId: randomOrderedPlayers[0],
//   }

//   await database.room.addGame({ roomId, game: newGame })

//   // - put game object to db, game status of `started`
//   // - add game to room object gameIds
//   // - pull cards from s3 to draw pile; filter based on difficulty set

//   // - pick a random player from the players list and assign this to `currentPlayerId`
//   // - `game_updated` event to inform everyone of game status change

//   await ws.sendMessage<IGameUpdatedEvent>({
//     connectionId,
//     body: {
//       action: BackendWebsocketActions.RoomUpdated,
//       game: {
//         id: newGame.id,
//         totalDrawCardsRemaining: newGame.drawPile.length,
//         wildCard: newGame.wildCardPile[newGame.wildCardPile.length - 1],
//         currentPlayerId: newGame.currentPlayerId,
//         status: newGame.status,
//       },
//     },
//   })
// }

// export const handler = middyfy(onConnect)
