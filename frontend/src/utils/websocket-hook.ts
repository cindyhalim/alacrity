import { useDispatch } from "react-redux"
import { actions } from "src/redux/actions"
import {
  TFrontendWebsocketEvent,
  TBackendWebsocketEvent,
  BackendWebsocketActions,
} from "src/types"
import { config } from "./environment"
import useWebSocket from "react-use-websocket"

export const useWSConnection = () => {
  const dispatch = useDispatch()

  const { sendMessage } = useWebSocket(config.websocketUrl, {
    //if multiple components pass the same socketUrl to useWebSocket then only a single WebSocket will be created
    share: true,
    onMessage: (message) => {
      const data: TBackendWebsocketEvent = JSON.parse(message.data)
      switch (data.action) {
        case BackendWebsocketActions.PlayerIdSet:
          dispatch(actions.setPlayerId(data.playerId))
          break
        case BackendWebsocketActions.GameUpdated:
          dispatch(actions.updateGame(data.game))
          break
        case BackendWebsocketActions.RoomUpdated:
          dispatch(actions.updateRoom(data.room))
          break
      }
    },
    onOpen: () => console.log("connected"),
  })

  return {
    sendMessage: (event: TFrontendWebsocketEvent) =>
      sendMessage(JSON.stringify(event)),
  }
}
