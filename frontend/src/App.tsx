import React from "react"
import { WaitingRoom } from "./features"
import { useAppSelector } from "./redux/utils"
import { Box } from "rebass"
import { InitializeRoom } from "./features/initialize-room/initialize-room"

export const App: React.FC = () => {
  const roomId = useAppSelector((state) => state.room.id)
  const gameStatus = useAppSelector((state) => state.room?.game?.status)
  if (!roomId) {
    return <InitializeRoom />
  }
  return gameStatus !== "started" ? <WaitingRoom /> : <Box>game screen</Box>
}
