import React from "react"
import { Flex, Image, Text } from "rebass"
import { theme } from "src/theme"

export const MobileScreen: React.FC = () => {
  return (
    <Flex
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        sx={{ width: 375 }}
        src="https://alacrity-cards-dev.s3.us-east-2.amazonaws.com/alacrity-share.png"
      />
      <Text
        sx={{
          fontFamily: theme.fonts.antonio,
          textTransform: "uppercase",
          fontSize: 30,
          marginTop: 30,
        }}
      >
        Mobile view coming soon!
      </Text>
      <Text
        sx={{
          fontFamily: theme.fonts.antonio,
          fontSize: 18,
          marginTop: "5px",
        }}
      >
        In the meantime, view on your desktop
      </Text>
    </Flex>
  )
}
