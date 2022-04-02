import { useDispatch } from "react-redux"
import { actions } from "src/redux/slice"
import {
  TFrontendWebsocketEvent,
  TBackendWebsocketEvent,
  BackendWebsocketActions,
  IAdminJoinedEvent,
  FrontendWebsocketActions,
} from "alacrity-shared"
import { config } from "./environment"
import { randFood } from "@ngneat/falso"
import { useEffect, useRef, createContext, useState, useContext } from "react"

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

  const isAdmin = !window.location.pathname.slice(1)
  const [roomId] = useState(window.location.pathname.slice(1) || generateRandomId())

  useEffect(() => {
    const initialize = async () => {
      ws.current = new WebSocket(config.websocketUrl || "")
      ws.current.onmessage = (message) => {
        const data: TBackendWebsocketEvent = JSON.parse(message.data)
        console.log("data", data)
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
        }
      }

      ws.current.onopen = (event) => {
        console.log("roomid", roomId)
        if (isAdmin) {
          const adminJoinedEvent: IAdminJoinedEvent = {
            roomId,
            action: FrontendWebsocketActions.AdminJoined,
            username: randFood({ origin: "japan" }),
          }
          ws.current?.send(JSON.stringify(adminJoinedEvent))
        }
      }
    }
    initialize()

    // eslint-disable-next-line
  }, [])

  return (
    <WSContext.Provider
      value={{
        sendMessage: (event: TFrontendWebsocketEvent) => ws.current?.send(JSON.stringify(event)),
      }}
    >
      {children}
    </WSContext.Provider>
  )
}
