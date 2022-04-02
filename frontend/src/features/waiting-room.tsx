import React, { useState } from "react"
import { Flex, Text } from "rebass"
import { Button } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { GameDifficulty } from "alacrity-shared"
import { BaseTitleScreen } from "src/components/base-title-screen"

export const WaitingRoom: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>(
    GameDifficulty.MEDIUM,
  )
  const players = useAppSelector((state) => state.playerPool)
  return (
    <BaseTitleScreen>
      <Text
        sx={{
          fontFamily: theme.fonts.antonio,
          fontSize: 28,
          marginBottom: 20,
        }}
      >
        DIFFICULTY
      </Text>
      <Flex sx={{ marginBottom: 30 }}>
        {Object.values(GameDifficulty).map((difficulty, idx) => (
          <Button
            key={idx}
            active={selectedDifficulty === difficulty}
            sx={{ marginLeft: idx === 0 ? 0 : 20 }}
            onClick={() => setSelectedDifficulty(difficulty)}
          >
            {difficulty.replace("_", " ")}
          </Button>
        ))}
      </Flex>
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
          <Button key={idx} sx={{ marginLeft: idx === 0 ? 0 : 20, marginBottom: 20 }}>
            {player.name.toUpperCase()}
          </Button>
        ))}
      </Flex>
      <Flex sx={{ marginTop: 60, width: "100%" }}>
        <Button sx={{ flex: 1 }}>COPY LINK</Button>
        <Button sx={{ flex: 1, marginLeft: 20 }}>START NEW GAME</Button>
      </Flex>
    </BaseTitleScreen>
  )
}
