import React from "react"
import { Flex, Image, SxStyleProp, Text } from "rebass"
import { theme } from "src/theme"
import backgroundImgSrc from "src/assets/background.png"

interface IBaseTitleScreen {
  sx?: SxStyleProp
}

export const BaseTitleScreen: React.FC<IBaseTitleScreen> = ({ children, sx }) => {
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
          ...sx,
        }}
      >
        {children}
      </Flex>
    </Flex>
  )
}
