import React from "react"
import { Box } from "rebass"
import { Button } from "./components/button"
import { Card } from "./components/card"
import { theme } from "./theme"
import { CardSymbol } from "./types"

export const App: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: theme.colors.navy, height: 500 }}>
      <Button>HELLO</Button>
      <Card text="word" symbol={CardSymbol.STAR} side="front" />
    </Box>
  )
}
