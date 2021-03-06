import React, { useEffect, useRef } from "react"
import { BaseTitleScreen } from "./base-title-screen"
import loadingAnimation from "../assets/loading.json"
import lottie, { AnimationItem } from "lottie-web"
import { Box, Text } from "rebass"

interface ILoadingTitleScreen {
  text?: string
}

export const LoadingTitleScreen: React.FC<ILoadingTitleScreen> = ({ text }) => {
  const element = useRef<HTMLDivElement>(null)
  const lottieInstance = useRef<AnimationItem>()

  useEffect(() => {
    if (element.current) {
      lottieInstance.current = lottie.loadAnimation({
        animationData: loadingAnimation,
        container: element.current,
      })
      lottieInstance.current.setSpeed(3)
    }
  }, [])

  return (
    <BaseTitleScreen sx={{ justifyContent: "center" }}>
      <Box sx={{ width: 100, height: 100 }} ref={element}></Box>
      <Text sx={{ fontSize: 16 }}>{text}</Text>
    </BaseTitleScreen>
  )
}
