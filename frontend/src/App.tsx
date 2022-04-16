import React from "react"
import { WaitingRoom, GameRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { LoadingTitleScreen } from "./components/loading-title-screen"
import { ErrorScreen } from "./features/error/error-screen"
import { ScoreBoard } from "./features/score-board"

export const App: React.FC = () => {
  const currentGame = useAppSelector((state) => state?.currentGame)
  const roomStatus = useAppSelector((state) => state.roomStatus)
  const playerId = useAppSelector((state) => state.playerId)
  const gameScore = useAppSelector((state) => state.gameScore)

  if (roomStatus !== "ready") {
    return <ErrorScreen />
  }

  if (!playerId) {
    return <LoadingTitleScreen />
  }

  if (gameScore && gameScore.length) {
    return <ScoreBoard />
  }

  return !currentGame ? <WaitingRoom /> : <GameRoom />
}
