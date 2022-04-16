import { BackendWebsocketActions, ICardDrawnEvent, IGameUpdatedEvent } from "alacrity-shared"
import { database, IGameModel, ws } from "@services"
import { getGame, getPlayers, getSerializedCurrentGame } from "@utils"
import { APIGatewayEvent } from "aws-lambda"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey },
  } = event

  console.log("onCardDrawn: recieved route key:", routeKey)
  const { roomId }: ICardDrawnEvent = JSON.parse(event.body)

  console.log("getting room")
  const room = await database.room.get({ roomId })
  const players = getPlayers(room)
  const game = getGame(room)

  const nextCard = game.drawPile.pop()
  console.log("next card", nextCard)

  if (nextCard.type === "playing") {
    const updatedGamePlayers = game.players.map((player) =>
      player.id === game.currentPlayerId
        ? { ...player, playPile: [...player.playPile, nextCard] }
        : player,
    )
    const playerIds = game.players.map((player) => player.id)
    const currentPlayerIndex = playerIds.indexOf(game.currentPlayerId)
    const nextPlayerId = game.players[(currentPlayerIndex + 1) % game.players.length].id

    const updatedGame: IGameModel = {
      ...game,
      currentPlayerId: nextPlayerId,
      players: updatedGamePlayers,
    }
    console.log("updating game in db")
    await database.room.updateGame({ roomId, game: updatedGame })
  } else {
    const updatedGame: IGameModel = {
      ...game,
      wildCardPile: [...game.wildCardPile, nextCard],
    }
    console.log("updating game in db")
    await database.room.updateGame({ roomId, game: updatedGame })
  }

  const serializedUpdatedGame = await getSerializedCurrentGame({ roomId })

  const sendMessagePromises = players.map((player) =>
    ws.sendMessage<IGameUpdatedEvent>({
      connectionId: player.id,
      body: {
        action: BackendWebsocketActions.GameUpdated,
        currentGame: serializedUpdatedGame,
      },
    }),
  )

  await Promise.all(sendMessagePromises)
  console.log(`sent ${sendMessagePromises} event`, BackendWebsocketActions.GameUpdated)

  return { statusCode: 200 }
}
