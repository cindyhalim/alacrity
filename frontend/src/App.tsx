import React from "react"
import { WaitingRoom, GameRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { LoadingTitleScreen } from "./components/loading-title-screen"

export const App: React.FC = () => {
  const gameStatus = useAppSelector((state) => state?.currentGame?.status)
  const playerId = useAppSelector((state) => state.playerId)

  if (!playerId) {
    return <LoadingTitleScreen />
  }
  return gameStatus !== "started" ? <WaitingRoom /> : <GameRoom />
}
