import React from "react"
import { Flex, Text } from "rebass"
import { Button } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { BaseTitleScreen } from "src/components/base-title-screen"
import { getIsAdmin } from "src/utils/helpers"

export const WaitingRoom: React.FC = () => {
  const players = useAppSelector((state) => state.playerPool)
  const roomId = useAppSelector((state) => state.roomId)
  const playerId = useAppSelector((state) => state.playerId)
  return (
    <BaseTitleScreen sx={{ justifyContent: "space-between" }}>
      <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
        <Text
          sx={{
            fontFamily: theme.fonts.antonio,
            fontSize: 28,
            marginBottom: 20,
          }}
        >
          PLAYERS
        </Text>
        <Flex sx={{ flexWrap: "wrap" }}>
          {players.map((player, idx) => (
            <Button
              active={player.id === playerId}
              key={idx}
              sx={{ marginLeft: idx === 0 ? 0 : 20, marginBottom: 20 }}
            >
              {player.name.toUpperCase()}
            </Button>
          ))}
        </Flex>
      </Flex>

      {getIsAdmin() && (
        <Flex sx={{ marginTop: 60, width: "100%" }}>
          <Button
            onClick={() => navigator.clipboard.writeText(window.location.href + roomId)}
            sx={{ flex: 1, fontSize: 20 }}
          >
            COPY LINK
          </Button>
          <Button disabled={players.length > 4} sx={{ flex: 1, marginLeft: 20, fontSize: 20 }}>
            START NEW GAME
          </Button>
        </Flex>
      )}
    </BaseTitleScreen>
  )
}
