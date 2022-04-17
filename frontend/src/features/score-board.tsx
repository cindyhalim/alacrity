import React from "react"
import { useDispatch } from "react-redux"
import { Box, Flex, Text } from "rebass"
import { Button } from "src/components"
import { actions } from "src/redux/slice"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"

export const ScoreBoard: React.FC = () => {
  const score = useAppSelector((state) => state.gameScore)
  const playerId = useAppSelector((state) => state.playerId)
  const dispatch = useDispatch()

  const getTitle = () => {
    const winner = score?.[0]
    if (winner?.score === 0) {
      return "GAME ENDED"
    }

    return `WINNER: ${winner?.name.toUpperCase()} 🎉`
  }

  const handleBackToRoom = () => {
    dispatch(actions.setGameScore(null))
  }

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
      }}
    >
      <Text
        sx={{
          fontSize: 60,
          fontFamily: theme.fonts.antonio,
        }}
      >
        {getTitle()}
      </Text>
      <Box
        sx={{
          marginTop: 40,
          marginBottom: 60,
        }}
      >
        {score?.map((playerScoreInfo, idx) => (
          <Flex
            key={idx}
            sx={{
              marginTop: idx ? 10 : 0,
              minWidth: "350px",
              justifyContent: "space-between",
              color: playerScoreInfo.id === playerId ? theme.colors.red : theme.colors.white,
            }}
          >
            <Text
              sx={{
                fontSize: 20,
                fontFamily: theme.fonts.antonio,
              }}
            >
              {playerScoreInfo.name.toUpperCase()}
            </Text>
            <Text
              sx={{
                fontSize: 20,
                fontFamily: theme.fonts.antonio,
              }}
            >
              {playerScoreInfo.score}
            </Text>
          </Flex>
        ))}
      </Box>
      <Button sx={{ fontSize: 20 }} onClick={handleBackToRoom}>
        BACK TO ROOM
      </Button>
    </Flex>
  )
}
