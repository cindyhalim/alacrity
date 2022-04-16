import { useDispatch } from "react-redux"
import { actions } from "src/redux/slice"
import {
  TFrontendWebsocketEvent,
  TBackendWebsocketEvent,
  BackendWebsocketActions,
  IAdminJoinedEvent,
  FrontendWebsocketActions,
  IPlayerJoinedEvent,
} from "alacrity-shared"
import { config } from "./environment"
import { randFood } from "@ngneat/falso"
import { useEffect, useRef, createContext, useContext } from "react"
import { useAppSelector } from "src/redux/utils"
import { getIsAdmin } from "./helpers"

type TWebsocketErrorEvent = {
  message: string
  connectionId: string
  requestId: string
}
const generateRandomId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  return new Array(6)
    .fill(0)
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join("")
}
const WSContext = createContext({
  sendMessage: (_event: TFrontendWebsocketEvent) => console.log("ws not initialized"),
})

export const useWSContext = () => useContext(WSContext)

export const WSContextProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const ws = useRef<null | WebSocket>(null)

  const roomId = useAppSelector((state) => state.roomId)

  useEffect(() => {
    dispatch(actions.setRoomId(window.location.pathname.slice(1) || generateRandomId()))
  }, [dispatch])

  useEffect(() => {
    const initialize = async () => {
      ws.current = new WebSocket(config.websocketUrl || "")
      ws.current.onmessage = (message) => {
        const data: TBackendWebsocketEvent = JSON.parse(message.data)
        const errorData: TWebsocketErrorEvent = JSON.parse(message.data)
        console.log("receieved message:", data)

        if (errorData?.message) {
          dispatch(actions.setShowErrorToast(true))
        }

        switch (data.action) {
          case BackendWebsocketActions.PlayerIdSet:
            dispatch(actions.setPlayerId(data.playerId))
            break
          case BackendWebsocketActions.GameUpdated:
            dispatch(actions.setGame(data.currentGame))
            break
          case BackendWebsocketActions.PlayerPoolUpdated:
            dispatch(actions.setPlayerPool(data.players))
            break
          case BackendWebsocketActions.RoomNotFound:
            dispatch(actions.setRoomStatus("not_found"))
            break
          case BackendWebsocketActions.AdminDisconnected:
            dispatch(actions.setRoomStatus("admin_disconnected"))
            break
          case BackendWebsocketActions.GameScoreUpdated:
            dispatch(actions.setGameScore(data.scores))
            break
        }
      }

      ws.current.onopen = () => {
        console.log("roomid", roomId)
        const username = randFood({ origin: "japan" })
        if (getIsAdmin()) {
          const adminJoinedEvent: IAdminJoinedEvent = {
            roomId,
            action: FrontendWebsocketActions.AdminJoined,
            username,
          }
          ws.current?.send(JSON.stringify(adminJoinedEvent))
        } else {
          const playerJoinedEvent: IPlayerJoinedEvent = {
            action: FrontendWebsocketActions.PlayerJoined,
            roomId,
            username,
          }
          ws.current?.send(JSON.stringify(playerJoinedEvent))
        }
      }
    }
    if (roomId) {
      initialize()
    }
  }, [dispatch, roomId])

  return (
    <WSContext.Provider
      value={{
        sendMessage: (event: TFrontendWebsocketEvent) => {
          console.log("sending message:", event)
          ws.current?.send(JSON.stringify(event))
        },
      }}
    >
      {children}
    </WSContext.Provider>
  )
}
