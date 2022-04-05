import React from "react"
import { WaitingRoom, GameRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { LoadingTitleScreen } from "./components/loading-title-screen"
import { ErrorScreen } from "./features/error/error-screen"

export const App: React.FC = () => {
  const gameStatus = useAppSelector((state) => state?.currentGame?.status)
  const roomStatus = useAppSelector((state) => state.roomStatus)
  const playerId = useAppSelector((state) => state.playerId)

  if (roomStatus !== "ready") {
    return <ErrorScreen />
  }

  if (!playerId) {
    return <LoadingTitleScreen />
  }
  return gameStatus !== "started" ? <WaitingRoom /> : <GameRoom />
}
