import React from "react"
import { Box, Flex } from "rebass"
import { CardEmptyState } from "src/components/card-empty-state"

import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { Card } from "../../components/card"
import { PlayerBlock } from "./player-block"
import { CardSymbol } from "alacrity-shared"

export const GameRoom: React.FC = () => {
  const players = useAppSelector((state) => state.room.players)
  const playerId = useAppSelector((state) => state.playerId)

  const opponentPlayers = players.filter((player) => player.id !== playerId)
  const player = players.find((player) => player.id === playerId)

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
          />
        ))}
      </Flex>
      <Flex sx={{ justifyContent: "center", marginTop: 87 }}>
        <Card
          text={"DRAW PILE"}
          symbol={CardSymbol.DIAMOND}
          size={"medium"}
          side={"back"}
          containerSx={{ marginRight: 32 }}
        />
        <CardEmptyState size={"medium"} />
      </Flex>
      <PlayerBlock player={player} isMe={true} />
    </Box>
  )
}
