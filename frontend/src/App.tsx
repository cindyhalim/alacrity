import React, { useEffect } from "react"
import { WaitingRoom, GameRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { LoadingTitleScreen } from "./components/loading-title-screen"
import { ErrorScreen } from "./features/error/error-screen"
import { ScoreBoard } from "./features/score-board"
import { ErrorToast } from "./features/error/error-toast"
import { actions } from "./redux/slice"
import { useDispatch } from "react-redux"
import { useWindowSize } from "./utils/window-size"
import { MobileScreen } from "./components/mobile-screen"

export const App: React.FC = () => {
  const currentGame = useAppSelector((state) => state?.currentGame)
  const roomStatus = useAppSelector((state) => state.roomStatus)
  const playerId = useAppSelector((state) => state.playerId)
  const gameScore = useAppSelector((state) => state.gameScore)
  const showErrorToast = useAppSelector((state) => state.showErrorToast)
  const isGameLoading = useAppSelector((state) => state.isGameLoading)

  const dispatch = useDispatch()

  const { width } = useWindowSize()

  useEffect(() => {
    if (currentGame || showErrorToast || gameScore) {
      dispatch(actions.setIsGameLoading(false))
    }
  }, [currentGame, showErrorToast, gameScore, dispatch])

  if (width && width < 710) {
    return <MobileScreen />
  }

  if (roomStatus !== "ready") {
    return <ErrorScreen />
  }

  if (!playerId || isGameLoading) {
    return <LoadingTitleScreen />
  }

  if (gameScore && gameScore.length) {
    return <ScoreBoard />
  }

  return (
    <>
      <ErrorToast />
      {!currentGame ? <WaitingRoom /> : <GameRoom />}
    </>
  )
}
