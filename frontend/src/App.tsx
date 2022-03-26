import React from "react"
import { WaitingRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { Box } from "rebass"

export const App: React.FC = () => {
  const gameStatus = useAppSelector((state) => state.room?.game?.status)
  return gameStatus !== "started" ? <WaitingRoom /> : <Box>game screen</Box>
}
