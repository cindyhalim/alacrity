import React, { useState } from "react"
import { Flex, Image, Text } from "rebass"
import { Button } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { GameDifficulty } from "src/types"
import backgroundImgSrc from "src/assets/background.png"

export const WaitingRoom: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>(
    GameDifficulty.MEDIUM
  )
  const players = useAppSelector((state) => state.room.players)
  return (
    <Flex
      sx={{
        backgroundColor: theme.colors.navy,
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        color: theme.colors.white,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Image
        src={backgroundImgSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Text
        sx={{
          fontSize: 100,
          fontFamily: theme.fonts.sancreek,
          marginBottom: 10,
        }}
      >
        alacrity
      </Text>
      <Flex
        sx={{
          flexDirection: "column",
          paddingY: 25,
          paddingX: 40,
          borderRadius: 15,
          backgroundColor: `${theme.colors.black}30`,
          width: 525,
          alignItems: "center",
          backdropFilter: "blur(5px)",
        }}
      >
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
            <Button sx={{ marginLeft: idx === 0 ? 0 : 20, marginBottom: 20 }}>
              {player.name.toUpperCase()}
            </Button>
          ))}
        </Flex>
        <Flex sx={{ marginTop: 60, width: "100%" }}>
          <Button sx={{ flex: 1 }}>COPY LINK</Button>
          <Button sx={{ flex: 1, marginLeft: 20 }}>START NEW GAME</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
