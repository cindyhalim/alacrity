import { nanoid } from "nanoid"
import { BackendWebsocketActions, IGameStartedEvent, IGameUpdatedEvent } from "alacrity-shared"

import { cardsData, database, IGameModel, IGamePlayer, ws } from "@services"
import { getGame, getPlayers, getSerializedCurrentGame } from "@utils"
import { APIGatewayEvent } from "aws-lambda"
import { getDrawPile, shuffle } from "../helpers/cards"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey },
  } = event

  const { roomId }: IGameStartedEvent = JSON.parse(event.body)

  console.log("onGameStarted: recieved route key:", routeKey)

  const data = await cardsData.get()

  console.log("creating card piles")
  const drawPile = getDrawPile({ cardsData: data })

  console.log("getting game players")
  const room = await database.room.get({ roomId })
  const game = getGame(room)

  if (game) {
    await database.room.deleteGame({ roomId, gameId: game.id })
  }

  const rawPlayers = getPlayers(room)
  const randomOrderedPlayers = shuffle(rawPlayers)
  const players: IGamePlayer[] = randomOrderedPlayers.map((currPlayer) => ({
    ...currPlayer,
    winningPile: [],
    playPile: [],
  }))

  const newGame: IGameModel = {
    id: nanoid(),
    players,
    drawPile,
    wildCardPile: [],
    status: "started",
    currentPlayerId: randomOrderedPlayers[0].id,
  }

  console.log("adding game to db")
  await database.room.addGame({ roomId, game: newGame })

  console.log("sending event:", BackendWebsocketActions.GameUpdated)
  const message = players.map((player) =>
    ws.sendMessage<IGameUpdatedEvent>({
      connectionId: player.id,
      body: {
        action: BackendWebsocketActions.GameUpdated,
        currentGame: getSerializedCurrentGame({ game: newGame }),
      },
    }),
  )

  await Promise.all(message)

  return { statusCode: 200 }
}
