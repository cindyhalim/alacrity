import React, { useEffect } from "react"
import { WaitingRoom, GameRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { LoadingTitleScreen } from "./components/loading-title-screen"
import { ErrorScreen } from "./features/error/error-screen"
import { useDispatch } from "react-redux"
import { actions } from "./redux/slice"

export const App: React.FC = () => {
  const startNewGameStatus = useAppSelector((state) => state?.startNewGameStatus)
  const gameStatus = useAppSelector((state) => state?.currentGame?.status)
  const roomStatus = useAppSelector((state) => state.roomStatus)
  const playerId = useAppSelector((state) => state.playerId)

  const dispatch = useDispatch()

  useEffect(() => {
    if (gameStatus === "started") {
      dispatch(actions.setStartNewGameStatus("ready"))
    }
  }, [gameStatus, dispatch])

  if (roomStatus !== "ready" || startNewGameStatus === "error") {
    return <ErrorScreen />
  }

  if (!playerId) {
    return <LoadingTitleScreen />
  }

  if (startNewGameStatus === "loading") {
    return <LoadingTitleScreen text={"Creating game..."} />
  }

  return gameStatus !== "started" ? <WaitingRoom /> : <GameRoom />
}
