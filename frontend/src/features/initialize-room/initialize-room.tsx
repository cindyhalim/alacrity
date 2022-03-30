import React, { useEffect, useState } from "react"
import { Flex, Image, Text } from "rebass"
import { Button } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import backgroundImgSrc from "src/assets/background.png"
import { BaseTitleScreen } from "src/components/base-title-screen"
import { useWSConnection } from "src/utils/websocket-hook"
import { FrontendWebsocketActions } from "alacrity-shared"
import { randFood } from "@ngneat/falso"

interface IInitializeRoomProps {}

const generateRandomId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  return new Array(6)
    .fill(0)
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join("")
}

export const InitializeRoom: React.FC<IInitializeRoomProps> = () => {
  const playerId = useAppSelector((state) => state.playerId)
  const { sendMessage, isConnected } = useWSConnection()

  useEffect(() => {
    if (playerId && isConnected) {
      sendMessage({
        action: FrontendWebsocketActions.RoomCreated,
        roomId: generateRandomId(),
        username: randFood(),
      })
    }
  }, [playerId, sendMessage, isConnected])

  return <BaseTitleScreen>LOADING</BaseTitleScreen>
}
