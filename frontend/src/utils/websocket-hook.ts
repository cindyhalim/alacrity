import { useDispatch } from "react-redux"
import { actions } from "src/redux/slice"
import {
  TFrontendWebsocketEvent,
  TBackendWebsocketEvent,
  BackendWebsocketActions,
} from "alacrity-shared"
import { config } from "./environment"
import useWebSocket from "react-use-websocket"
import { useState } from "react"

export const useWSConnection = () => {
  const dispatch = useDispatch()
  const [isConnected, setIsConnected] = useState(false)

  const { sendMessage } = useWebSocket(config.websocketUrl, {
    //if multiple components pass the same socketUrl to useWebSocket then only a single WebSocket will be created
    share: true,
    onMessage: (message) => {
      const data: TBackendWebsocketEvent = JSON.parse(message.data)
      switch (data.action) {
        case BackendWebsocketActions.PlayerIdSet:
          dispatch(actions.setPlayerId(data.playerId))
          break
        case BackendWebsocketActions.RoomUpdated:
          dispatch(actions.updateRoom(data.room))
          break
      }
    },
    onOpen: () => {
      console.log("connected")
      setIsConnected(true)
    },
  })

  return {
    sendMessage: (event: TFrontendWebsocketEvent) => sendMessage(JSON.stringify(event)),
    isConnected,
  }
}
