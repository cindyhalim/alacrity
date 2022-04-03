import React from "react"
import { Box, Flex, Text } from "rebass"
import { CardEmptyState } from "src/components/card-empty-state"

import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { Card } from "../../components/card"
import { PlayerBlock } from "./player-block"
import { CardSymbol } from "alacrity-shared"
import { Button } from "src/components"

export const GameRoom: React.FC = () => {
  const players = useAppSelector((state) => state.currentGame?.players || [])
  const currentPlayerId = useAppSelector((state) => state.currentGame?.currentPlayerId)
  const playerId = useAppSelector((state) => state.playerId)

  const opponentPlayers = players.filter((player) => player.id !== playerId)
  const player = players.find((player) => player.id === playerId)

  const isCurrentPlayerTurn = currentPlayerId === player?.id

  return (
    <Box
      sx={{
        bg: theme.colors.lightBg,
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflowY: "hidden",
        paddingX: 10,
        paddingTop: 15,
      }}
    >
      <Flex
        justifyContent={"space-evenly"}
        sx={{
          width: "100%",
          minHeight: theme.styles.smallCard.containerCard.height,
        }}
      >
        {opponentPlayers.map((opponentPlayer) => (
          <PlayerBlock
            key={opponentPlayer.id}
            player={opponentPlayer}
            isMe={false}
            hasCurrentTurn={currentPlayerId === opponentPlayer.id}
          />
        ))}
      </Flex>

      <Flex sx={{ justifyContent: "center", alignItems: "center", marginTop: 87 }}>
        <Flex
          sx={{
            flexDirection: "column",
            minWidth: 167,
            maxHeight: 110,
            marginRight: 46,
          }}
        >
          {isCurrentPlayerTurn && (
            <>
              <Text
                sx={{
                  fontFamily: theme.fonts.antonio,
                  fontSize: 35,
                  textAlign: "center",
                  marginBottom: "7px",
                  color: theme.colors.red,
                }}
              >
                YOUR TURN!
              </Text>
              <Button type={"game"}>DRAW CARD</Button>
            </>
          )}
        </Flex>
        <Card
          text={"DRAW PILE"}
          symbol={CardSymbol.DIAMOND}
          size={"medium"}
          side={"back"}
          containerSx={{ marginRight: 32 }}
        />
        <CardEmptyState size={"medium"} />
      </Flex>
      <PlayerBlock player={player} isMe={true} hasCurrentTurn={isCurrentPlayerTurn} />
    </Box>
  )
}
