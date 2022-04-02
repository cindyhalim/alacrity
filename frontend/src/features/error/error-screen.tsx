import React from "react"
import { BaseTitleScreen } from "src/components/base-title-screen"
import { Link, Text } from "rebass"
import { theme } from "src/theme"
import { useAppSelector } from "src/redux/utils"
import { TRoomStatus } from "src/redux/slice"

const roomStatusToErrorCopy: { [key in TRoomStatus]: string } = {
  admin_disconnected: "ROOM ENDED",
  not_found: "ROOM NOT FOUND",
  ready: "",
}

export const ErrorScreen: React.FC = () => {
  const roomStatus = useAppSelector((state) => state.roomStatus)
  return (
    <BaseTitleScreen
      sx={{
        height: 300,
        justifyContent: "center",
      }}
    >
      <Text
        sx={{
          fontFamily: theme.fonts.antonio,
          fontSize: 28,
          marginBottom: 20,
        }}
      >
        {roomStatusToErrorCopy[roomStatus]}
      </Text>
      <Link sx={{ color: "white", fontSize: 12 }} href={window.location.origin}>
        Click here to start a new room
      </Link>
    </BaseTitleScreen>
  )
}
