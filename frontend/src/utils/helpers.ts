import { useAppSelector } from "src/redux/utils"

export const getIsAdmin = () => !window.location.pathname.slice(1)

export const useGetMainPlayer = () => {
  const players = useAppSelector((state) => state.currentGame?.players || [])
  const playerId = useAppSelector((state) => state.playerId)
  const player = players.find((player) => player.id === playerId)

  return player
}
