import React from "react"
import { Box, Flex, Text } from "rebass"

import { CardEmptyState, Card, Button } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { useMainPlayer } from "src/utils/helpers"
import { PlayerBlock } from "./player-block"
import { CardSymbol } from "alacrity-shared"

export const GameRoom: React.FC = () => {
  const players = useAppSelector((state) => state.currentGame?.players || [])
  const currentPlayerId = useAppSelector((state) => state.currentGame?.currentPlayerId)
  const mainPlayer = useMainPlayer()

  const isCurrentPlayerTurn = currentPlayerId === mainPlayer?.id

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
        {players.map((player) => (
          <PlayerBlock
            key={player.id}
            player={player}
            isCurrentPlayerTurn={currentPlayerId === player.id}
          />
        ))}
      </Flex>
      <Flex sx={{ justifyContent: "center", alignItems: "center", margin: 87 }}>
        <CurrentTurnButton isCurrentPlayerTurn={isCurrentPlayerTurn} />
        <Card
          text={"DRAW PILE"}
          symbol={CardSymbol.DIAMOND}
          size={"medium"}
          side={"back"}
          containerSx={{ marginRight: 32 }}
        />
        <CardEmptyState size={"medium"} />
      </Flex>
    </Box>
  )
}

const CurrentTurnButton: React.FC<{ isCurrentPlayerTurn: boolean }> = ({ isCurrentPlayerTurn }) => (
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
)
